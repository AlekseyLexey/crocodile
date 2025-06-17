const { getRandomWordForRoom } = require('./wordStore');
const updateRoomsWithUserProfilePoints = require('./updateRoomsWithUserProfilePoints');

async function newWordSendler(io, roomId) {
  console.log('newWordSendler roomId ===> ', roomId);

  const word = getRandomWordForRoom(roomId);

  console.log('newWordSendler word ===> ', word);

  if (!word) {
    const room = await updateRoomsWithUserProfilePoints(roomId);

    io.to(roomId).emit('endGame', { room });
    // io.to(roomId).emit('newWord', 'Все слова отгаданы');
    return;
  }

  io.to(roomId).emit('newWord', { word });
}

module.exports = newWordSendler;
