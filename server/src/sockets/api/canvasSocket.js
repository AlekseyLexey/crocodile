const CANVAS_ROUTES = {
  DRAW: "draw",
  FILL: "fill",
  FINISH: "finish",
  CLEAR: "clear",
};

module.exports.canvasSocket = (io, socket) => {
  socket.on(CANVAS_ROUTES.DRAW, async ({ roomId, action, figure }) => {
    switch (action) {
      case CANVAS_ROUTES.DRAW:
        socket.to(roomId).emit(CANVAS_ROUTES.DRAW, {
          figure,
        });
        break;
      case CANVAS_ROUTES.FILL:
        socket.to(roomId).emit(CANVAS_ROUTES.FILL, {
          figure,
        });
        break;
      case CANVAS_ROUTES.FINISH:
        socket.to(roomId).emit(CANVAS_ROUTES.FINISH, {
          figure,
        });
        break;
      case CANVAS_ROUTES.CLEAR:
        socket.to(roomId).emit(CANVAS_ROUTES.CLEAR, {
          figure,
        });
        break;
    }
  });
};
