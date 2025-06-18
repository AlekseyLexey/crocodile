const { getRandomWordForRoom } = require('./wordStore');
const updateRoomsWithUserProfilePoints = require('./updateRoomsWithUserProfilePoints');

async function newWordSendler(io, roomId) {
  const word = getRandomWordForRoom(roomId);

  if (!word) {
    const room = await updateRoomsWithUserProfilePoints(roomId);

    io.to(roomId).emit('endGame', { room });
    return;
  }

  io.to(roomId).emit('newWord', { word });
}

module.exports = newWordSendler;
