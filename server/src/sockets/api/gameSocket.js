const RoomService = require("../../services/roomService");
const updateRoomsWithUserProfilePoints = require("../helpers/updateRoomsWithUserProfilePoints");
const { sendRoom } = require("../helpers/sendRoom");
const { initTimerForRoom } = require("../helpers/timerStore");

const GAME_ROUTES = {
  START: "startGame",
  PAUSE: "pauseGame",
  END: "endGame",
};

const ROOM_STATUS = {
  PREPARE: "prepare",
  ACTIVE: "active",
  PAUSE: "pause",
  END: "end",
};

module.exports.gameSocket = (io, socket) => {
  socket.on(GAME_ROUTES.START, async ({ roomId }) => {
    const room = await RoomService.updateRoomById(roomId, {
      status: ROOM_STATUS.ACTIVE,
    });

    initTimerForRoom(io, roomId, ROOM_STATUS.ACTIVE);

    sendRoom(io, roomId, room);
    io.to(roomId).emit("message", `Раунд начался!`);
  });

  socket.on(GAME_ROUTES.PAUSE, async ({ roomId }) => {
    const room = await RoomService.updateRoomById(roomId, {
      status: ROOM_STATUS.PAUSE,
    });

    initTimerForRoom(io, roomId, ROOM_STATUS.PAUSE);

    sendRoom(io, roomId, room);
    io.to(roomId).emit("message", `Смена раунда`);
  });

  socket.on(GAME_ROUTES.END, async ({ roomId }) => {
    // const room = await RoomService.updateRoomById(roomId, { status: 'end' });

    const room = await updateRoomsWithUserProfilePoints(roomId);

    sendRoom(io, roomId, room);
    io.to(roomId).emit("message", `Игра законченна`);
  });
};
