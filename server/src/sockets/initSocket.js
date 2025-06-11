const { roomSocket } = require("./api/roomSocket");
const { RoomService } = require("../services/roomService");

function initSocket(io) {
  io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected СОБАКА =+====================>`);

    roomSocket(io, socket);
  });
}

module.exports = initSocket;
