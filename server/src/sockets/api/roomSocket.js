const UserRoomService = require("../../services/userRoomService");
const { getRoom } = require("../helpers/getRoom");

module.exports.roomSocket = (io, socket) => {
  socket.on("joinRoom", async ({ user, roomId }) => {
    await UserRoomService.createUserRoom({
      userId: user.id,
      roomId,
    });

    socket.user = user;
    socket.join(roomId);
    // const sockets = await io.in(roomId).fetchSockets();
    // const users = sockets.map((socket) => socket.user);
    getRoom(io, roomId);
    socket.to(roomId).emit("message", `Игрок ${user.username} присоеденился`);
  });

  socket.on("exit", async ({ user, roomId }) => {
    await UserRoomService.deleteUserRoom({
      userId: user.id,
      roomId,
    });

    getRoom(io, roomId);
    socket.leave(roomId);
    socket.to(roomId).emit("message", `Игрок ${user.username} покинул игру`);
  });
};
