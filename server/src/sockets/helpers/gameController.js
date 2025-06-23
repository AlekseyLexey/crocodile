const RoomService = require("../../services/roomService");
const UserRoomService = require("../../services/userRoomService");
const { LOBBIES_ROUTES } = require("../api/lobbiesSocket");
const newWordSendler = require("./newWordSendler");
const nextLeadHandler = require("./nextLeadHandler");
const { sendRoom } = require("./sendRoom");
const TimerStore = require("./timerStore");
const updateRoomsWithUserProfilePoints = require("./updateRoomsWithUserProfilePoints");
const { roomWords, clearRoomWords, initWordsForRoom } = require("./wordStore");

const ROOM_STATUS = {
  PREPARE: "prepare",
  ACTIVE: "active",
  PAUSE: "pause",
  END: "end",
};

const setGameActive = async (io, socket, roomId) => {
  const room = await RoomService.updateRoomById(roomId, {
    status: ROOM_STATUS.ACTIVE,
  });

  await initWordsForRoom(roomId);
  await newWordSendler(io, roomId, socket);

  TimerStore.initTimerForRoom(io, socket, roomId, ROOM_STATUS.ACTIVE);

  await sendRoom(io, roomId, room);
  io.to(roomId).emit("message", `Раунд начался!`);
};

const setGamePause = async (io, socket, roomId) => {
  const room = await RoomService.updateRoomById(roomId, {
    status: ROOM_STATUS.PAUSE,
  });
  await RoomService.updateRoomById(roomId, { pictures: "" });
  if (room.type === "multi") {
    const roomMap = roomWords.get(roomId);

    const currentWord = roomMap.currentWord;
    if (!roomMap.unUsedWords.includes(currentWord)) {
      roomMap.unUsedWords.push(currentWord);
    }

    const nextLead = await nextLeadHandler(roomId);

    if (!nextLead) {
      await gameEndAction(io, socket, roomId);
      return;
    }
  }
  TimerStore.initTimerForRoom(io, socket, roomId, ROOM_STATUS.PAUSE);

  io.to(roomId).emit("message", `Смена раунда`);
  await sendRoom(io, roomId);
};

const gameEndAction = async (io, socket, roomId) => {
  const room = await updateRoomsWithUserProfilePoints(roomId);
  const activeRooms = await UserRoomService.findUserActiveRooms(socket.user.id);
  io.emit(LOBBIES_ROUTES.GET_ACTIVE, activeRooms ? activeRooms : []);

  TimerStore.clearTimer(room.id);
  const { leaveUserAttemptsStore } = require("./handleLeaveRoom");
  leaveUserAttemptsStore?.delete(roomId + socket.user.id);

  clearRoomWords(room.id);

  await sendRoom(io, roomId, room);

  io.to(roomId).emit("message", `Игра законченна`);
  socket.leave(roomId);
  socket.roomId = null;
};

module.exports = { setGameActive, setGamePause, gameEndAction };
