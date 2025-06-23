const { gameEndAction, setGameActive } = require("../helpers/gameController");

const GAME_ROUTES = {
  START: "startGame",
  PAUSE: "pauseGame",
  END: "endGame",
};

module.exports.gameSocket = (io, socket) => {
  socket.on(GAME_ROUTES.START, async ({ roomId }) => {
    setGameActive(io, socket, roomId);
  });

  socket.on(GAME_ROUTES.END, async ({ roomId }) => {
    gameEndAction(io, socket, roomId);
  });
};
