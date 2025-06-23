const RoomService = require("../../services/roomService");
const { gameEndAction, setGameActive } = require("../helpers/gameController");
const { LOBBIES_ROUTES } = require("./lobbiesSocket");

const GAME_ROUTES = {
  START: "startGame",
  PAUSE: "pauseGame",
  END: "endGame",
};

module.exports.gameSocket = (io, socket) => {
  socket.on(GAME_ROUTES.START, async ({ roomId }) => {
    await setGameActive(io, socket, roomId);

    RoomService.findRoomById(roomId).then((room) =>
      io.emit(LOBBIES_ROUTES.UPDATE, room)
    );
  });

  socket.on(GAME_ROUTES.END, async ({ roomId }) => {
    await gameEndAction(io, socket, roomId);
  });
};
