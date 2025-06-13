module.exports.canvasSocket = (io, socket) => {
  socket.on("draw", async ({ roomId, action, figure }) => {
    switch (action) {
      case "draw":
        io.to(roomId).emit("draw", {
          figure,
        });
        break;
      case "finish":
        io.to(roomId).emit("finish", {
          figure,
        });
        break;
      case "clear":
        io.to(roomId).emit("clear", {
          figure,
        });
        break;
    }
  });
};
