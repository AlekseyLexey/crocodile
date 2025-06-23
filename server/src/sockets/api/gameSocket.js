const RoomService = require("../../services/roomService");
const { gameEndAction } = require("../helpers/gameController");
const { sendRoom } = require("../helpers/sendRoom");
const TimerStore = require("../helpers/TimerStore");

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

    TimerStore.initTimerForRoom(io, socket, roomId, ROOM_STATUS.ACTIVE);

    sendRoom(io, roomId, room);
    io.to(roomId).emit("message", `Раунд начался!`);
  });

  socket.on(GAME_ROUTES.END, async ({ roomId }) => {
    gameEndAction(io, socket, roomId);
  });
};
