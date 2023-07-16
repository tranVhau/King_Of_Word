const { Questions } = require("../models");

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

  const onGameStart = async (payload) => {
    // re-join the room
    socket.join(payload.roomID);
    //prepare random questions for the room
    const roomIdx = rooms.findIndex((room) => room.roomID == payload.roomID);
    if (roomIdx != -1) {
      const room = rooms[roomIdx];
      countDown(4, room);
      room.curr_question = 0;
      room.game_status = "Idle";
      room.questionPackage = null;
      room.breakTimeInterval = null;
      room.answerTimeInterval = null;

      if (!room.questionPackage) {
        await Questions.aggregate([{ $sample: { size: 5 } }]).then(
          (questionPackage) => {
            room.questionPackage = questionPackage;
          }
        );
      }

      console.log("generate room ", room);
    }
  };

  // return question for players, start count-down
  const onNextQuestion = (payload) => {
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
      } else {
        // handle total score and end game
        console.log("end");
        io.to(roomName).emit("end_game", {});
      }
      answerTime(3, room);
      // room.players.forEach((element, index) => {
      //   console.log(index, "-", element.socketID);
      // });
      // console.log("myID", socket.id);
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
      const playerRecordObj = {
        question: room.curr_question,
        answer: payload.answer,
        duration: payload.duration,
      };
      player.scoreRecord.push(playerRecordObj);
      player.ready = true;
      // turn to 'break-time': when all player have answer or time-out
      const isAllReady = room.players.every((player) => player.ready == true);
      if (isAllReady) {
        room.curr_question += 1;
        room.players.forEach((player) => (player.ready = false));
        setImmediate(() => {
          io.to(roomName).emit("round:result", { answer: "answer" });
        });
        breakTime(4, room);
      }
      // room.players.forEach((element, index) => {
      //   console.log(index, "-", element.socketID);
      // });
      // console.log("myID", socket.id);
    }
  };

  //caculate the result
  const onGameEnd = () => {};
  socket.on("game:start", onGameStart);
  socket.on("game:next", onNextQuestion);
  socket.on("round:answer", onAnswer);
  socket.on("game:end", onGameEnd);
};
