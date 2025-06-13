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
    }
  });
};

const broadcast = (ws, msgObject) => {
  aWss.clients.forEach((client) => {
    if (client.id === msgObject.id) {
      client.send(JSON.stringify(msgObject));
    }
  });
};
