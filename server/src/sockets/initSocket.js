const { roomSocket } = require("./api/roomSocket");
const { gameSocket } = require("./api/gameSocket");

function initSocket(io) {
  io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected`);

    gameSocket(io, socket);
    roomSocket(io, socket);
  });
}

module.exports = initSocket;
