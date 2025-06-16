const RoomService = require("../../services/roomService");

module.exports.sendRoom = async (io, roomId, room = null) => {
  if (!room) {
    room = await RoomService.findRoomById(roomId);
  }

  io.to(roomId).emit("room", {
    room,
  });
  return;
};
