const { getRandomWordForRoom } = require('./wordStore');
const RoomService = require('../../services/roomService');
const updateRoomsWithUserProfilePoints = require('./updateRoomsWithUserProfilePoints');

async function newWordSendler(io, roomId) {
  const word = getRandomWordForRoom(roomId);

  if (!word) {
    const updatedRoom = await updateRoomsWithUserProfilePoints(roomId);

    io.to(roomId).emit('endGame', { updatedRoom });
    // io.to(roomId).emit('newWord', 'Все слова отгаданы');
    return;
  }

  io.to(roomId).emit('newWord', word);
}

module.exports = newWordSendler;
