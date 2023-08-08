const mongoose = require("mongoose");
const { Questions, Accounts } = require("../models");

module.exports = (io, socket, rooms) => {
  //count down time
  const countDown = (second, room) => {
    const roomName = room.roomID;
    const countDown = setInterval(() => {
      second--;
      io.to(roomName).emit("room:count_down", second);
      if (second == 0) {
        room.game_status = "Pending";
        clearInterval(countDown);
      }
    }, 1000);
  };
  //answer time and actions
  const answerTime = (seconds, room) => {
    if (room.answerTimeInterval) {
      clearInterval(room.answerTimeInterval); // Clear any existing interval
    }
    const roomName = room.roomID;
    room.answerTimeInterval = setInterval(() => {
      seconds--;
      io.to(roomName).emit("room:answer_time", seconds);
      if (seconds === 0) {
        room.game_status = "Break";
        clearInterval(room.answerTimeInterval);
      }
    }, 1000);
  };

  //break time and actions
  const breakTime = (seconds, room) => {
    if (room.breakTimeInterval) {
      clearInterval(room.breakTimeInterval); // Clear any existing interval
    }
    const roomName = room.roomID;
    room.breakTimeInterval = setInterval(() => {
      seconds--;
      io.to(roomName).emit("room:break_time", seconds);
      if (seconds === 0) {
        room.game_status = "Pending";
        clearInterval(room.breakTimeInterval);
      }
    }, 1000);
  };

  // handle caculate and return live score each round
  // and total score in the end of the game

  const caculateResult = (room) => {
    room.answerRecord = [];
    room.players.forEach((player) => {
      room.answerRecord.push(player.scoreRecord);
    });

    for (let i = 0; i < room.answerRecord[0].length; i++) {
      const player1Record = room.answerRecord[0][i];
      const player2Record = room.answerRecord[1][i];
      player1Record.scored = 0;
      player2Record.scored = 0;

      //if player1 have correct answer
      if (player1Record.correctAnswer == player1Record.answer) {
        player1Record.scored += 5;
        // if 2 players have correct answer
        if (player2Record.correctAnswer == player2Record.answer) {
          if (player1Record.duration < player2Record.duration) {
            player1Record.scored += 3;
          }
        } else {
          player1Record.scored += 3;
        }
      }

      if (player2Record.correctAnswer == player2Record.answer) {
        player2Record.scored += 5;
        if (player2Record.correctAnswer == player1Record.answer) {
          if (player2Record.duration < player1Record.duration) {
            player2Record.scored += 3;
          }
        } else {
          player2Record.scored += 3;
        }
      }
    }

    return [room.answerRecord[0].at(-1), room.answerRecord[1].at(-1)];
  };

  const coinTransaction = async (record) => {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      const summaryRecord = [
        {
          player: record[0][0].player,
          score:
            record[0]?.reduce(
              (accumulator, value) => accumulator + value.scored,
              0
            ) -
            record[1]?.reduce(
              (accumulator, value) => accumulator + value.scored,
              0
            ),
        },
        {
          player: record[1][0].player,
          score:
            record[1]?.reduce(
              (accumulator, value) => accumulator + value.scored,
              0
            ) -
            record[0]?.reduce(
              (accumulator, value) => accumulator + value.scored,
              0
            ),
        },
      ];
      summaryRecord.forEach(async (record) => {
        await Accounts.findOneAndUpdate(
          { email: record.player },
          { $inc: { balance: record.score } }
        );
      });
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
    }
  };

  const onGameStart = async (payload) => {
    // re-join the room
    socket.join(payload.roomID);
    //prepare random questions for the room
    const roomIdx = rooms.findIndex((room) => room.roomID == payload.roomID);
    if (roomIdx != -1) {
      const room = rooms[roomIdx];
      if (!room.questionPackage) {
        await Questions.aggregate([
          { $sample: { size: Number(process.env.QUESTIONS_PER_GAME) } },
        ]).then((questionPackage) => {
          room.questionPackage = questionPackage;
        });
      }
    }
    room.players.forEach((player) => {
      if (player.playerID == payload.playerID) player.socketID = socket.id;
    });

    countDown(process.env.DURATION_OF_BREAK_TIME, room);
  };

  // return question for players, start count-down
  const onNextQuestion = async (payload) => {
    const roomIdx = rooms.findIndex((room) => room.roomID == payload.roomID);
    if (roomIdx != -1) {
      const room = rooms[roomIdx];
      const roomName = room.roomID;

      const nextQuestion = room.questionPackage[room.curr_question];
      if (
        room.game_status == "Pending" &&
        typeof nextQuestion !== "undefined"
      ) {
        const { correctIdx, ...question } = nextQuestion;
        question.no = room.curr_question;
        //receive answer and add userRecord each user
        io.to(roomName).emit("game:get_question", question);
        answerTime(process.env.DURATION_OF_ANSWER_TIME, room);
      } else {
        // handle total score and end game
        clearInterval(room.answerTimeInterval);
        clearInterval(room.breakTimeInterval);
        // coin transaction
        if (room.game_status != "Idle") {
          await coinTransaction(room.answerRecord);
        }
        room.game_status = "Idle";
        io.to(roomName).emit("game:finish", room.answerRecord);
      }
    }
  };

  // receive answers, handle record answers
  const onAnswer = (payload) => {
    const roomIdx = rooms.findIndex((room) => room.roomID == payload.roomID);
    if (roomIdx != -1) {
      const room = rooms[roomIdx];
      const roomName = room.roomID;
      const player = room.players.find(
        (player) => player.socketID == socket.id
      );

      if (player) {
        const playerRecordObj = {
          question_id: payload.question_id,
          player: player.playerID,
          question: room.curr_question,
          answer: payload?.answer,
          correctAnswer: room.questionPackage[room.curr_question]?.correctIdx,
          duration: payload?.duration,
        };

        player.scoreRecord.push(playerRecordObj);
        player.ready = true;
      }
      // turn to 'break-time': when all player have answer or time-out
      const isAllReady = room.players.every((player) => player.ready == true);
      if (isAllReady && room.game_status == "Break") {
        room.curr_question += 1;
        // setImmediate(() => {
        const result = caculateResult(room);
        io.to(roomName).emit("round:result", result);
        // });

        room.players.forEach((player) => (player.ready = false));
        breakTime(4, room);
      }
    }
  };

  //caculate the result
  // const onGameEnd = () => {};
  socket.on("game:start", onGameStart);
  socket.on("game:next", onNextQuestion);
  socket.on("round:answer", onAnswer);
  // socket.on("game:end", onGameEnd);
};
