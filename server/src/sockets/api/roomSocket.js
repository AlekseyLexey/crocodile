const UserRoomService = require('../../services/userRoomService');
const { sendRoom } = require('../helpers/sendRoom');
const RoomService = require('../../services/roomService');
const {
  handleLeaveRoom,
  checkLeadOfRoom,
} = require('../helpers/handleLeaveRoom');
const TimerStore = require('../helpers/timerStore');
const { getCurrentWord } = require('../helpers/wordStore');

module.exports.roomSocket = (io, socket) => {
  socket.on('joinRoom', async ({ user, roomId }) => {
    if (!user) {
      socket.leave(roomId);
      return;
    }

    socket.user = user;
    socket.roomId = roomId;
    socket.join(roomId);

    const room = await RoomService.findRoomById(roomId);

    const candidateUserRoom = await UserRoomService.findUserRoomByIds(
      user.id,
      roomId
    );

    if (!candidateUserRoom) {
      const isLead = room.owner_id === user.id;

      await UserRoomService.createUserRoom({
        userId: user.id,
        roomId,
        is_lead: isLead,
      });
    } else {
      const isLead = await checkLeadOfRoom(user.id, roomId);

      if (isLead) {
        const currentWord = getCurrentWord(roomId);
        socket.emit('getWord', { word: currentWord ? currentWord : '' });
        const data = TimerStore.getTimerStore(roomId);

        socket.to(roomId).emit('messageReconnect', {
          message: `Ведущий ${user.username} вернулся! Игра продолжается.`,
        });

        TimerStore.initTimerForRoom(
          io,
          socket,
          roomId,
          data.pauseStatus,
          data.pauseTime
        );
      }
    }

    await UserRoomService.updateUserOnlineStatus({
      userId: user.id,
      roomId,
      is_online: true,
    });

    await sendRoom(io, roomId);
    io.to(roomId).emit('timer', { time: TimerStore.getCurrentTime(roomId) });
    socket.to(roomId).emit('message', `Игрок ${user.username} присоеденился`);
  });

  socket.on('exitRoom', async ({ user, roomId }) => {
    await handleLeaveRoom(io, socket);

    await UserRoomService.deleteUserRoom({
      userId: user.id,
      roomId,
    });

    sendRoom(io, roomId);
    socket.to(roomId).emit('message', `Игрок ${user.username} покинул игру`);
  });

  socket.on('leaveRoom', async () => {
    await handleLeaveRoom(io, socket);
  });
};
