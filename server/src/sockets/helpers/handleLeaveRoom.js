const RoomService = require("../../services/roomService");
const UserRoomService = require("../../services/userRoomService");
const GameController = require("./gameController");
const { gameEndAction } = require("./gameEndAction");
const { sendRoom } = require("./sendRoom");

const leaveTimerStore = new Map();
const MAX_DISCONNECT_ATTEMPTS = 3;
const RECONNECT_TIMEOUT = 5000;

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
  const room = await RoomService.findRoomById(roomId);

  if (!isLead) {
    socket.to(roomId).emit("messageDisconnect", {
      message: `Пользователь ${socket.user.username} отключился.`,
    });
    return;
  }

  const data = leaveTimerStore.get(roomId);
  const disconnectCount = (data?.disconnectCount || 0) + 1;

  if (data?.timer) {
    clearTimeout(data.timer);
  }

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
    leaveTimerStore.delete(roomId);
    socket.to(roomId).emit("messageDisconnect", {
      message: `Ведущий ${socket.user.username} отключился (${disconnectCount}/${MAX_DISCONNECT_ATTEMPTS}). ${messageTypeLastAttempt}`,
    });
    return;
  }

  const timer = setTimeout(() => {
    executeDisconnectAction(io, socket, room);
    leaveTimerStore.delete(roomId);
  }, RECONNECT_TIMEOUT);

  leaveTimerStore.set(roomId, { timer, disconnectCount });

  socket.to(roomId).emit("messageDisconnect", {
    message: `Ведущий ${socket.user.username} отключился (${disconnectCount}/${MAX_DISCONNECT_ATTEMPTS}). ${messageType}`,
  });
};

const executeDisconnectAction = (io, socket, room) => {
  if (room.type === "mono" || ["prepare", "end"].includes(room.status)) {
    gameEndAction(io, socket, room.id);
  } else {
    GameController.pause(io, socket, room.id);
  }
};

module.exports = {
  leaveTimerStore,
  handleLeaveRoom,
  checkLeadOfRoom,
  changeLeadRoom,
};
