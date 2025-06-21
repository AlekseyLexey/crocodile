const RoomService = require("../../services/roomService");
const GameController = require("./gameController");

const timerStore = new Map();

const initTimerForRoom = (io, socket, roomId, status, inintTime) => {
  clearTimer(roomId);
  GameController.initTimer(initTimerForRoom);

  let time;
  switch (status) {
    case "active":
      time = 15000;
      break;
    case "pause":
      time = 8000;
      break;
    default:
      return;
  }

  if (inintTime) {
    time = inintTime;
  }

  io.to(roomId).emit("timer", { time });

  const timer = setInterval(async () => {
    const currentData = timerStore.get(roomId);
    if (!currentData) return;

    currentData.time -= 1000;

    io.to(roomId).emit("timer", { time: currentData.time });

    if (currentData.time <= 0) {
      const actulaleRoom = await RoomService.findRoomById(roomId);
      if (actulaleRoom.status === "end") {
        io.to(roomId).emit("timer", { time: 0 });
        clearTimer(roomId);
        return;
      }

      switch (status) {
        case "active":
          await GameController.pause(io, socket, roomId, status);
          break;
        case "pause":
          await GameController.active(io, socket, roomId, status);
          break;
        default:
          io.to(roomId).emit("timer", { time: 0 });
          clearTimer(roomId);
          return;
      }
    }
  }, 1000);

  timerStore.set(roomId, {
    timer,
    time,
    status,
  });
};

const getCurrentTime = (roomId) => {
  const data = timerStore.get(roomId);
  return data?.time || null;
};

const getCurrentStatus = (roomId) => {
  const data = timerStore.get(roomId);
  return data?.status || null;
};

const clearTimer = (roomId) => {
  const data = timerStore.get(roomId);
  if (data?.timer) {
    clearInterval(data.timer);
  }
  timerStore.delete(roomId);
};

module.exports = {
  initTimerForRoom,
  getCurrentTime,
  getCurrentStatus,
  clearTimer,
};
