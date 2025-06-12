const WordService = require('../../services/wordService')
const { initWordsForRoom,
	clearRoomWords,
	getCurrentWord,
	getRandomWordForRoom
} = require('../helpers/wordStore')

module.exports.wordSocket = (io, socket) => {

	socket.on('chooseTheme', async ({ roomId, themeId }) => {
		await initWordsForRoom(roomId, themeId);
		// console.log('roomWords===>', roomWords);
		const word = await getRandomWordForRoom(roomId);
		console.log('ТЕКУЩЕЕ СЛОВО', word);
		
		io.to(roomId).emit('newWord', word);
		
	})

	socket.on('getWord', async ({roomId}) => {
		const word = await getRandomWordForRoom(roomId);
		console.log('ТЕКУЩЕЕ СЛОВО', word);
		
		io.to(roomId).emit('newWord', word);
	})
}