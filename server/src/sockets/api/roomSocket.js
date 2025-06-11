const UserRoomService = require("../../services/userRoomService");

module.exports.roomSocket = (io, socket) => {
  socket.on("joinRoom", async ({ user, roomId }) => {
    const { point } = await UserRoomService.createUserRoom({
      userId: user.id,
      roomId,
    });

    socket.user = { user, point };
    socket.join(roomId);

    const sockets = await io.in(roomId).fetchSockets();
    const users = sockets.map((socket) => socket.user);

    io.to(roomId).emit("userList", {
      users,
    });

    socket.to(roomId).emit("message", `Игрок ${user.username} присоеденился`);
  });
};
