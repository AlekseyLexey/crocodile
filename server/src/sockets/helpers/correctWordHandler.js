const UserRoomService = require('../../services/userRoomService');
const RoomService = require('../../services/roomService');

async function correctWordHandler(io, socket, roomId, message) {
  const quessUser = await UserRoomService.findUserRoomByIds(
    socket.user.id,
    roomId
  );
  const leadUser = await UserRoomService.findLeadOfRoom({ roomId });

  const leadUserRoom = await UserRoomService.findUserRoomByIds(
    leadUser.user_id,
    roomId
  );

  await UserRoomService.updatePoint({
    userId: leadUser.user_id,
    roomId,
    point: leadUserRoom.point + 1,
  });

  await UserRoomService.updatePoint({
    userId: socket.user.id,
    roomId,
    point: quessUser.point + 3,
  });
  const room = await RoomService.findRoomById(roomId);
  io.to(roomId).emit('correctWord', { user: socket.user.username, message });
  io.to(roomId).emit('room', {
    room,
  });
  io.to(roomId).emit('clear', {
    figure: {},
  });
}

module.exports = correctWordHandler;
