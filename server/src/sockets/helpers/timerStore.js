class TimerStore {
  constructor() {
    this.store = new Map();
  }

  initTimerForRoom(io, socket, roomId, status, initialTime) {
    this.clearTimer(roomId);

    let time;
    switch (status) {
      case "active":
        time = 7715000;
        break;
      case "pause":
        time = 8000;
        break;
      default:
        return;
    }

    if (initialTime) {
      time = initialTime;
    }

    io.to(roomId).emit("timer", { time });

    const timer = setInterval(async () => {
      const currentData = this.store.get(roomId);
      if (!currentData) return;

      currentData.time -= 1000;
      io.to(roomId).emit("timer", { time: currentData.time });

      if (currentData.time <= 0) {
        const RoomService = require("../../services/roomService");
        const actualRoom = await RoomService.findRoomById(roomId);

        if (actualRoom.status === "end") {
          io.to(roomId).emit("timer", { time: 0 });
          this.clearTimer(roomId);
          return;
        }

        const { setGamePause, setGameActive } = require("./gameController");
        switch (status) {
          case "active":
            await setGamePause(io, socket, roomId, status);
            break;
          case "pause":
            await setGameActive(io, socket, roomId, status);
            break;
          default:
            io.to(roomId).emit("timer", { time: 0 });
            clearTimer(roomId);
            return;
        }
      }
    }, 1000);

    this.setTimerStore(roomId, { timer, time, status });
  }

  getTimerStore(roomId) {
    return this.store.get(roomId);
  }

  setTimerStore(roomId, data) {
    this.store.set(roomId, data);
    return this.getTimerStore(roomId);
  }

  clearTimer(roomId) {
    const data = this.getTimerStore(roomId);
    if (data?.timer) {
      clearInterval(data.timer);
    }
    this.store.delete(roomId);
  }

  getCurrentTime(roomId) {
    const data = this.getTimerStore(roomId);
    return data?.time || null;
  }

  getCurrentStatus(roomId) {
    const data = this.getTimerStore(roomId);
    return data?.status || null;
  }
}

module.exports = new TimerStore();
