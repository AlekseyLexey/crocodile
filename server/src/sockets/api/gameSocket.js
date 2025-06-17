const RoomService = require('../../services/roomService');
const updateRoomsWithUserProfilePoints = require('../helpers/updateRoomsWithUserProfilePoints');
const { sendRoom } = require('../helpers/sendRoom');
const nextLeadHandler = require('../helpers/nextLeadHandler');

const GAME_ROUTES = {
  START: 'startGame',
  PAUSE: 'pauseGame',
  END: 'endGame',
};

const ROOM_STATUS = {
  PREPARE: 'prepare',
  ACTIVE: 'active',
  PAUSE: 'pause',
  END: 'end',
};

module.exports.gameSocket = (io, socket) => {
  socket.on(GAME_ROUTES.START, async ({ roomId }) => {
    const room = await RoomService.updateRoomById(roomId, {
      status: ROOM_STATUS.ACTIVE,
    });

    sendRoom(io, roomId, room);
    io.to(roomId).emit('message', `Игра Началась!`);
  });

  socket.on(GAME_ROUTES.PAUSE, async ({ roomId }) => {
    const room = await RoomService.updateRoomById(roomId, {
      status: ROOM_STATUS.PAUSE,
    });

    //мультирежим
    if (room.type === 'multi') {
      await nextLeadHandler(roomId);
    }
    //

    // sendRoom(io, roomId, room);
    //не будем пробрасывать, обновим в любом случае
    sendRoom(io, roomId);
    io.to(roomId).emit('message', `Смена раунда`);
  });

  socket.on(GAME_ROUTES.END, async ({ roomId }) => {
    // const room = await RoomService.updateRoomById(roomId, { status: 'end' });

    const room = await updateRoomsWithUserProfilePoints(roomId);

    sendRoom(io, roomId, room);
    io.to(roomId).emit('message', `Игра законченна`);
  });
};
