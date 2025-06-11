const RoomService = require("../../services/roomService");

module.exports.getRoom = async (io, roomId) => {
  const room = await RoomService.findRoomById(roomId);

  io.to(roomId).emit("room", {
    room,
  });
};
