const { v4: uuidv4 } = require("uuid");
const { Mutex } = require("async-mutex");

// Handle connection of user when connect/reconnect/create room/finding room...
const mutex = new Mutex();
module.exports = (io, socket, rooms) => {
  //count down
  const countDown = (second, roomName) => {
    const countDown = setInterval(() => {
      second--;
      io.in(roomName).emit("room:count_down", second);
      if (second == 0) {
        clearInterval(countDown);
      }
    }, 1000);
  };

  //create room
  const create = (payload) => {
    // find the empty room and return the index
    const roomIdx = rooms.findIndex(
      (room) => room.isFull == false && room.inMatch == false
    );
    // if available room, join the room, else create new room
    if (roomIdx != -1) {
      const room = rooms[roomIdx];
      const isJoined = room.players.some(
        (player) => player.playerID === payload.player
      );

      if (!isJoined) {
        room.players.push({
          socketID: socket.id,
          playerID: payload.player,
          name: payload.name,
          photo: payload.photo,
          ready: false,
          scoreRecord: [],
          score: 0,
        });
        const roomName = room.roomID;
        if (room.players.length == 2) {
          room.isFull = true;
          room.inMatch = false;
          countDown(4, roomName);
        } else {
          room.isFull = false;
        }
        socket.join(roomName);

        io.in(roomName).emit("room:get", room);

        // io.emit("room:get", { room: 123 });
      }
    } else {
      const isInRoom = rooms.some((room) =>
        room.players.some((player) => player.playerID == payload.player)
      );
      if (!isInRoom) {
        room = {
          roomID: uuidv4(),
          players: [
            {
              socketID: socket.id,
              playerID: payload.player,
              name: payload.name,
              photo: payload.photo,
              scoreRecord: [],
              ready: false,
              score: 0,
            },
          ],
          isFull: false,
          inMatch: false,
          curr_question: 0,
          game_status: "Idle",
          questionPackage: null,
          answerRecord: [],
          breakTimeInterval: null,
          answerTimeInterval: null,
        };
        rooms.push(room);
        const roomName = room.roomID;
        socket.join(roomName);
      } else {
        // rejoin the room
        const roomName = room.roomID;
        socket.join(roomName);
      }
    }

    const roomName = room.roomID;
    io.in(roomName).emit("room:get", room);
    // console.log(room);
    // console.log("find", room.players);
  };

  // leaveRoom is just leave the room, not disconnect in this case
  const leaveRoom = async (payload, getInfo) => {
    if (payload.roomID && payload.playerID) {
      const roomIdx = rooms.findIndex((room) => room.roomID == payload.roomID);
      const room = rooms[roomIdx];

      if (roomIdx != -1 && room.inMatch == false) {
        //delete the room if you are the last in the room
        const isJoined = room.players.some(
          (player) => player.playerID === payload.playerID
        );

        if (room.players.length == 1 && isJoined) {
          const release = await mutex.acquire();
          try {
            rooms.splice(roomIdx, 1);
            console.log(`room ${room.roomID} deleted`);
          } finally {
            release();
          }
        } else {
          room.players = room.players.filter(
            (player) => player.playerID != payload.playerID
          );
          room.isFull = false;
        }
        const roomName = room.roomID;
        // if (getInfo == true) io.in(roomName).emit("room:get", room);
        try {
          io.in(roomName).emit("room:get", room);
        } catch (error) {}
        socket.leave(roomName);
        console.log(rooms);
      }
    }
  };

  const disconnect = async () => {
    // disconnect and delete from its room
    for (const roomID of socket.rooms) {
      if (roomID !== socket.id) {
        const roomIdx = rooms.findIndex((room) => room.roomID == roomID);
        if (roomIdx != -1) {
          const currRoom = rooms[roomIdx];
          const player = currRoom.players.find(
            (player) => player.socketID == socket.id
          );
          io.to(roomID).emit("room:leave_alert", "opponent left the room");
          leaveRoom({ roomID: roomID, playerID: player?.playerID }, false);
          console.log(player?.playerID, "disconnected");
        }
      }
    }
  };

  socket.on("room:create", create);
  socket.on("room:leave", leaveRoom);
  socket.on("disconnecting", disconnect);
};
