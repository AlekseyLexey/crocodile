function initSocket(io) {
  io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected СОБАКА =+====================>`);

    socket.on("joinRoom", ({ user, roomId }) => {
      socket.user = user;
      socket.join(roomId);

      io.to(roomId).emit("userList", {
        users: io
          .in(roomId)
          .fetchSockets()
          .map((socket) => socket.user),
      });

      socket.to(roomId).emit("message", `Игрок ${user.name} присоеденился`);
    });
  });
}

module.exports = initSocket;
