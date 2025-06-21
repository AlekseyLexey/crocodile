const { leaveTimerStore } = require("./handleLeaveRoom");
const { sendRoom } = require("./sendRoom");
const { clearTimer } = require("./timerStore");
const updateRoomsWithUserProfilePoints = require("./updateRoomsWithUserProfilePoints");
const { clearRoomWords } = require("./wordStore");

module.exports.gameEndAction = async (io, socket, roomId) => {
  const room = await updateRoomsWithUserProfilePoints(roomId);
  clearTimer(roomId);
  clearRoomWords(roomId);
  leaveTimerStore?.delete(roomId);

  await sendRoom(io, roomId, room);
  socket.leave(roomId);
  io.to(roomId).emit("message", `Игра законченна`);
};
