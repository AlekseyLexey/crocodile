const timerStore = new Map();

const initTimerForRoom = (io, roomId, status) => {
  clearTimer(roomId);

  let time;
  switch (status) {
    case "active":
      time = 20000;
      break;
    case "pause":
      time = 7000;
      break;
    default:
      return;
  }

  io.to(roomId).emit("timer", { time });

  const timer = setInterval(() => {
    const currentData = timerStore.get(roomId);
    if (!currentData) return;

    currentData.time -= 1000;

    io.to(roomId).emit("timer", { time: currentData.time });

    if (currentData.time <= 0) {
      clearTimer(roomId);
      io.to(roomId).emit("timer", { time: null });
      return;
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
  clearTimer,
};
