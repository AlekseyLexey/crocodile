const COLOR_ROUTES = {
  COLOR: "color",
};

module.exports.colorSocket = (io, socket) => {
  socket.on(COLOR_ROUTES.COLOR, async ({ roomId, color }) => {
    io.to(roomId).emit(COLOR_ROUTES.COLOR, {
      color,
    });
  });
};
