const WordService = require('../../services/wordService')
const { initWordsForRoom,
	clearRoomWords,
	getCurrentWord,
	getRandomWordForRoom
} = require('../helpers/wordStore')
const newWordSendler = require('../helpers/newWordSendler')

module.exports.wordSocket = (io, socket) => {

	socket.on('chooseTheme', async ({ roomId, themeId }) => {
		await initWordsForRoom(roomId, themeId);

		// const word = await getRandomWordForRoom(roomId);
		// console.log('ТЕКУЩЕЕ СЛОВО', word);
		
		// io.to(roomId).emit('newWord', word);
		newWordSendler(io, roomId);
		
	})

	// socket.on('getWord', async ({roomId}) => {
	// 	const word = await getRandomWordForRoom(roomId);
	// 	console.log('ТЕКУЩЕЕ СЛОВО', word);
		
	// 	io.to(roomId).emit('newWord', word);
	// })
}