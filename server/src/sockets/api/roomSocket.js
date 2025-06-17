const UserRoomService = require("../../services/userRoomService");
const { sendRoom } = require("../helpers/sendRoom");

module.exports.roomSocket = (io, socket) => {
  socket.on("joinRoom", async ({ user, roomId }) => {
    if (!user) {
      socket.leave(roomId);
      return;
    }
    await UserRoomService.createUserRoom({
      userId: user.id,
      roomId,
    });

    socket.user = user;
    socket.join(roomId);

    sendRoom(io, roomId);
    socket.to(roomId).emit("message", `Игрок ${user.username} присоеденился`);
  });

  socket.on("exitRoom", async ({ user, roomId }) => {
    await UserRoomService.deleteUserRoom({
      userId: user.id,
      roomId,
    });

    sendRoom(io, roomId);
    socket.leave(roomId);
    socket.to(roomId).emit("message", `Игрок ${user.username} покинул игру`);
  });
};
