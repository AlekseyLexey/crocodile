const RoomService = require('../../services/roomService');

module.exports.gameSocket = (io, socket) => {
  socket.on('startGame', async ({ roomId }) => {
    const room = await RoomService.updateRoomById(roomId, { status: 'active' });

    io.to(roomId).emit('room', {
      room,
    });

    io.to(roomId).emit('message', `Игра Началась!`);
  });

  socket.on('pauseGame', async ({ roomId }) => {
    const room = await RoomService.updateRoomById(roomId, { status: 'pause' });

    io.to(roomId).emit('room', {
      room,
    });

    io.to(roomId).emit('message', `Смена раунда`);
  });

  socket.on("endGame", async ({ roomId }) => {
    const room = await RoomService.updateRoomById(roomId, { status: "end" });

    io.to(roomId).emit("room", {
      room,
    });

    io.to(roomId).emit("message", `Игра законченна`);
  });
};
