const { getRandomWordForRoom } = require('./wordStore');
const RoomService = require('../../services/roomService');

async function newWordSendler(io, roomId) {
  const word = getRandomWordForRoom(roomId);
  

  if (!word) {
    await RoomService.updateRoomById(roomId, { status: 'end' });
    const room = await RoomService.findRoomById(roomId);
    io.to(roomId).emit('endGame', { room });
    io.to(roomId).emit('newWord', 'Все слова отгаданы');
    return;
  }

  io.to(roomId).emit('newWord', word);
}

module.exports = newWordSendler;
