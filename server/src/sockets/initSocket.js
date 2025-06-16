const { roomSocket } = require('./api/roomSocket');
const { gameSocket } = require('./api/gameSocket');
const { chatSocket } = require('./api/chatSocket');
const { wordSocket } = require('./api/wordSocket');
const { canvasSocket } = require('./api/canvasSocket');

function initSocket(io) {
  io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);

    gameSocket(io, socket);
    roomSocket(io, socket);
    chatSocket(io, socket);
    wordSocket(io, socket);
    canvasSocket(io, socket);
  });
}

module.exports = initSocket;
