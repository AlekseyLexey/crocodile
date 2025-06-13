const UserRoomService = require('../../services/userRoomService')

async function correctWordHandler(io, socket, roomId, message) {
	const quessUser = await UserRoomService.findUserRoomByIds(socket.user.id, roomId);
			console.log(`${quessUser.user_id} угадал слово quessUser!!`);
			await UserRoomService.updatePoint({
				userId: socket.user.id,
				roomId,
				point: quessUser.point + 1
			})
			io.to(roomId).emit('correctWord', { user: socket.user.username, message });
}

module.exports = correctWordHandler;