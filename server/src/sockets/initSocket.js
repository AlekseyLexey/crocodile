const { roomSocket } = require("./api/roomSocket");
const { gameSocket } = require("./api/gameSocket");
const { chatSocket } = require("./api/chatSocket");
const { canvasSocket } = require("./api/canvasSocket");
const { colorSocket } = require("./api/colorSocket");
const { handleLeaveRoom } = require("./helpers/handleLeaveRoom");

function initSocket(io) {
  io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected`);

    gameSocket(io, socket);
    roomSocket(io, socket);
    chatSocket(io, socket);
    canvasSocket(io, socket);
    colorSocket(io, socket);
    socket.on("disconnect", async () => {
      await handleLeaveRoom(io, socket);
    });
  });
}

module.exports = initSocket;
