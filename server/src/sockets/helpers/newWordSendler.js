const { getRandomWordForRoom } = require('./wordStore');
const RoomService = require('../../services/roomService');
const updateUserProfilePoints = require('../helpers/updateUserProfilePoints');

async function newWordSendler(io, roomId) {
  const word = getRandomWordForRoom(roomId);

  if (!word) {
    await RoomService.updateRoomById(roomId, { status: 'end' });
    const room = await RoomService.findRoomById(roomId);

    const updatedRoom = await updateUserProfilePoints(room);

    io.to(roomId).emit('endGame', { updatedRoom });
    // io.to(roomId).emit('newWord', 'Все слова отгаданы');
    return;
  }

  io.to(roomId).emit('newWord', word);
}

module.exports = newWordSendler;
