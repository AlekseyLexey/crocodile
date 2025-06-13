const isCorrectWord = require('../helpers/isCorrectWord');
const UserRoomService = require('../../services/userRoomService');
const { initWordsForRoom,
	clearRoomWords,
	getCurrentWord,
	getRandomWordForRoom
} = require('../helpers/wordStore')

const newWordSendler = require('../helpers/newWordSendler')
const correctWordHandler = require('../helpers/correctWordHandler')

module.exports.chatSocket = (io, socket) => {
	socket.on('sendMessage', async ({ message, roomId}) => {
		console.log('Сообщение', message, 'in room:', roomId, 'от ', socket.user);
		

		io.to(roomId).emit('newMessage', { message, sender: socket.user })
	

		const checker = isCorrectWord(message, roomId);

		if (checker) {
			console.log(`${socket.user.username} угадал слово!!!!!!!!!`);
			
			correctWordHandler(io, socket, roomId, message);

				newWordSendler(io, roomId);
		}

		
	})

}