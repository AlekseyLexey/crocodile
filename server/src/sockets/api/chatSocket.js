const isCorrectWord = require('../helpers/isCorrectWord')
const UserRoomService = require('../../services/userRoomService')

module.exports.chatSocket = (io, socket) => {
	socket.on('sendMessage', async ({ message, roomId}) => {
		console.log('Сообщение', message, 'in room:', roomId, 'от ', socket.user);
		

		io.to(roomId).emit('newMessage', { message, sender: socket.user })
		
		//вынести в хелпер типо addPoints

		const checker = isCorrectWord(message, roomId);

		if (checker) {
			console.log(`${socket.user.username} угадал слово!!!!!!!!!`);
			
			const quessUser = await UserRoomService.findUserRoomByIds(socket.user.id, roomId);
			console.log(`${quessUser.user_id} угадал слово quessUser!!`);
			await UserRoomService.updatePoint({
				userId: socket.user.id,
				roomId,
				point: quessUser.point + 1
			})
			io.to(roomId).emit('correctWord', {user: socket.user.username, message})
		}

		//после угадвания новое слово пока не летит и у второго слово не показывает
		
	})

}