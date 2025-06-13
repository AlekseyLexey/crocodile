const UserRoomService = require('../../services/userRoomService');
const { getRoom } = require('../helpers/getRoom');

module.exports.roomSocket = (io, socket) => {
  socket.on('joinRoom', async ({ user, roomId }) => {
    await UserRoomService.createUserRoom({
      userId: user.id,
      roomId,
    });
    //тестим подтверждение факта подключения для синхронизации событий
    socket.emit('joinedRoom', { roomId });

    const sockets = await io.in(roomId).fetchSockets();
    console.log(
      'Сокеты в комнате',
      roomId,
      sockets.map((s) => s.id)
    );

    socket.user = user;
    socket.join(roomId);
    console.log('socket.user ===>', socket.user);

    // const sockets = await io.in(roomId).fetchSockets();
    // const users = sockets.map((socket) => socket.user);
    getRoom(io, roomId);
    socket.to(roomId).emit('message', `Игрок ${user.username} присоеденился`);
  });

  socket.on('exit', async ({ user, roomId }) => {
    await UserRoomService.deleteUserRoom({
      userId: user.id,
      roomId,
    });

    getRoom(io, roomId);
    socket.leave(roomId);
    socket.to(roomId).emit('message', `Игрок ${user.username} покинул игру`);
  });
};
