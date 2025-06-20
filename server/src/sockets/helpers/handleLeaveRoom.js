const RoomService = require("../../services/roomService");
const UserRoomService = require("../../services/userRoomService");
const GameController = require("./gameController");
const { gameEndAction } = require("./gameEndAction");
const { sendRoom } = require("./sendRoom");

module.exports.handleLeaveRoom = async (io, socket) => {
  if (!socket.roomId) return;
  const userId = socket.user.id;
  const roomId = socket.roomId;

  const user = await UserRoomService.findLeadOfRoom({
    roomId,
  });

  if (!user) return;

  const userServise = await UserRoomService.updateUserOnlineStatus({
    userId,
    roomId,
    status: false,
  });

  if (!userServise) return;

  const room = await RoomService.findRoomById(roomId);

  let isLead = user.user_id === userId;

  if (isLead) {
    if (room.type === "mono") {
      setTimeout(() => {
        gameEndAction(io, socket, roomId);
      }, 5000);

      socket.to(roomId).emit("messageDisconnect", {
        message: `Ведущий: ${socket.user.username} отключился. Игра будет завершенна через 5 сек`,
      });
    }

    if (room.type === "multi") {
      if (room.status === "prepare" || room.status === "end") return;

      socket.to(roomId).emit("messageDisconnect", {
        message: `Ведущий: ${socket.user.username} отключился. Смена раунда через 3 сек`,
      });

      setTimeout(() => {
        GameController.pause(io, socket, roomId);
      }, 3000);
    }
  } else {
    socket.to(roomId).emit("messageDisconnect", {
      message: `Пользователь: ${socket.user.username} отключился.`,
    });
  }

  sendRoom(io, roomId, room);
  socket.roomId = null;
};
