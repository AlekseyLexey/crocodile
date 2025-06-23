const RoomService = require("../../services/roomService");
const UserRoomService = require("../../services/userRoomService");
const { setGamePause, gameEndAction } = require("./gameController");
const { sendRoom } = require("./sendRoom");
const TimerStore = require("./TimerStore");

const leaveUserAttemptsStore = new Map();
const MAX_DISCONNECT_ATTEMPTS = 999;
const RECONNECT_TIMEOUT = 10000;

const handleLeaveRoom = async (io, socket) => {
  if (!socket.roomId) return;
  const userId = socket.user.id;
  const roomId = socket.roomId;

  await UserRoomService.updateUserOnlineStatus({
    userId,
    roomId,
    status: false,
  });

  await changeLeadRoom(io, socket, userId, roomId);
  await sendRoom(io, roomId);

  socket.leave(roomId);
  socket.roomId = null;
};

const checkLeadOfRoom = async (userId, roomId) => {
  const user = await UserRoomService.findLeadOfRoom({
    roomId,
  });

  if (!user) return null;

  return user.user_id === userId;
};

const changeLeadRoom = async (io, socket, userId, roomId) => {
  const isLead = await checkLeadOfRoom(userId, roomId);
  if (!isLead) {
    socket.to(roomId).emit("messageDisconnect", {
      message: `Пользователь ${socket.user.username} отключился.`,
    });
    return;
  }

  const room = await RoomService.findRoomById(roomId);

  if (room.status === "end") return;

  const data = leaveUserAttemptsStore.get(roomId + userId);
  const disconnectCount = (data?.disconnectCount || 0) + 1;
  let time = RECONNECT_TIMEOUT;

  const pauseStatus = TimerStore.getCurrentStatus(roomId);
  const pauseTime = TimerStore.getCurrentTime(roomId);

  TimerStore.clearTimer(roomId);

  const timer = setInterval(async () => {
    const currentData = TimerStore.getTimerStore(roomId);
    if (!currentData) return;

    currentData.time -= 1000;

    io.to(roomId).emit("timer", { time: currentData.time });

    if (currentData.time <= 0) {
      io.to(roomId).emit("timer", { time: 0 });
      const actulaleRoom = await RoomService.findRoomById(roomId);
      if (!["prepare", "end"].includes(actulaleRoom.status)) {
        executeDisconnectAction(io, socket, room);
        return;
      }
    }
  }, 1000);

  leaveUserAttemptsStore.set(roomId + userId, {
    disconnectCount,
  });

  TimerStore.setTimerStore(roomId, {
    timer,
    time,
    pauseStatus,
    pauseTime,
  });

  const messageType =
    room.type === "mono" || ["prepare", "end"].includes(room.status)
      ? `Игра будет завершена через ${RECONNECT_TIMEOUT / 1000} сек...`
      : `Смена раунда через ${RECONNECT_TIMEOUT / 1000} сек...`;

  const messageTypeLastAttempt =
    room.type === "mono" || ["prepare", "end"].includes(room.status)
      ? `Игра будет завершена.`
      : `Смена раунда.`;

  if (disconnectCount >= MAX_DISCONNECT_ATTEMPTS) {
    executeDisconnectAction(io, socket, room);
    socket.to(roomId).emit("messageDisconnect", {
      message: `Ведущий ${socket.user.username} отключился (${disconnectCount}/${MAX_DISCONNECT_ATTEMPTS}). ${messageTypeLastAttempt}`,
    });
    return;
  }

  socket.to(roomId).emit("messageDisconnect", {
    message: `Ведущий ${socket.user.username} отключился (${disconnectCount}/${MAX_DISCONNECT_ATTEMPTS}). ${messageType}`,
  });
};

const executeDisconnectAction = (io, socket, room) => {
  if (room.type === "mono" || ["prepare", "end"].includes(room.status)) {
    gameEndAction(io, socket, room.id);
  } else {
    setGamePause(io, socket, room.id);
  }
};

module.exports = {
  leaveUserAttemptsStore,
  handleLeaveRoom,
  checkLeadOfRoom,
  changeLeadRoom,
};
