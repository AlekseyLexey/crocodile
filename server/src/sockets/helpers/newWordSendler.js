const { getRandomWordForRoom } = require("./wordStore");

async function newWordSendler(io, roomId, socket) {
  const word = getRandomWordForRoom(roomId);

  if (!word) {
    const { gameEndAction } = require("./gameController");
    await gameEndAction(io, socket, roomId);
    return;
  }

  io.to(roomId).emit("newWord", { word });
}

module.exports = newWordSendler;
