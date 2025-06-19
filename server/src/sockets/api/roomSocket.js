const UserRoomService = require("../../services/userRoomService");
const { sendRoom } = require("../helpers/sendRoom");
const RoomService = require("../../services/roomService");
const { getCurrentTime } = require("../helpers/timerStore");

module.exports.roomSocket = (io, socket) => {
  socket.on("joinRoom", async ({ user, roomId }) => {
    if (!user) {
      socket.leave(roomId);
      return;
    }

    const room = await RoomService.findRoomById(roomId);
    const isLead = room.owner_id === user.id;

    const candidateUserRoom = await UserRoomService.findUserRoomByIds(
      user.id,
      roomId
    );

    if (!candidateUserRoom) {
      await UserRoomService.createUserRoom({
        userId: user.id,
        roomId,
        is_lead: isLead,
      });
    }

    socket.user = user;
    socket.roomId = roomId;
    socket.join(roomId);

    await sendRoom(io, roomId);
    io.to(roomId).emit("timer", { time: getCurrentTime(roomId) });
    socket.to(roomId).emit("message", `Игрок ${user.username} присоеденился`);
  });

  socket.on("exitRoom", async ({ user, roomId }) => {
    await UserRoomService.deleteUserRoom({
      userId: user.id,
      roomId,
    });

    sendRoom(io, roomId);
    socket.leave(roomId);
    socket.to(roomId).emit("message", `Игрок ${user.username} покинул игру`);
  });
};
