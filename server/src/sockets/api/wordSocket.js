const { initWordsForRoom } = require('../helpers/wordStore');
const newWordSendler = require('../helpers/newWordSendler');

module.exports.wordSocket = (io, socket) => {
  // socket.on('chooseTheme', async ({ roomId, themeId }) => {
  //   console.log('wordSocket themeId ===> ', themeId);
  //   console.log('wordSocket roomId ===> ', roomId);

  //   await initWordsForRoom(roomId, themeId);

  //   await newWordSendler(io, roomId);
  // });

  //пробуем без темы, подтянем ее прямо при инициализации
  socket.on('chooseTheme', async ({ roomId }) => {
    // console.log('wordSocket themeId ===> ', themeId);

    await initWordsForRoom(roomId);

    await newWordSendler(io, roomId);
  });
};
