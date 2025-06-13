const { initWordsForRoom } = require("../helpers/wordStore");
const newWordSendler = require("../helpers/newWordSendler");

module.exports.wordSocket = (io, socket) => {
  socket.on("chooseTheme", async ({ roomId, themeId }) => {
    await initWordsForRoom(roomId, themeId);

    newWordSendler(io, roomId);
  });
};
