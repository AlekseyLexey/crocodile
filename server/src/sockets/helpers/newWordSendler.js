const { getRandomWordForRoom } = require('./wordStore');

function newWordSendler(io, roomId) {
  const word = getRandomWordForRoom(roomId);
  io.to(roomId).emit('newWord', word);
}

module.exports = newWordSendler;