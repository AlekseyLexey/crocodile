module.exports.colorSocket = (io, socket) => {
  socket.on("color", async ({ roomId, color }) => {
    io.to(roomId).emit("color", {
      color,
    });
  });
};
