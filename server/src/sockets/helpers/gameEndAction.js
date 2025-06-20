const { sendRoom } = require("./sendRoom");
const { clearTimer } = require("./timerStore");
const updateRoomsWithUserProfilePoints = require("./updateRoomsWithUserProfilePoints");

module.exports.gameEndAction = async (io, socket, roomId) => {
  const room = await updateRoomsWithUserProfilePoints(roomId);
  clearTimer(roomId);

  sendRoom(io, roomId, room);
  socket.leave(roomId);
  io.to(roomId).emit("message", `Игра законченна`);
};
