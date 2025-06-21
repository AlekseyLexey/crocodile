const RoomService = require("../../services/roomService");
const nextLeadHandler = require("./nextLeadHandler");
const { sendRoom } = require("./sendRoom");
const updateRoomsWithUserProfilePoints = require("./updateRoomsWithUserProfilePoints");
const { roomWords } = require("./wordStore");

const ROOM_STATUS = {
  PREPARE: "prepare",
  ACTIVE: "active",
  PAUSE: "pause",
  END: "end",
};

class GameController {
  static initTimerForRoom;
  static async active(io, socket, roomId) {
    const room = await RoomService.updateRoomById(roomId, {
      status: ROOM_STATUS.ACTIVE,
    });

    this.initTimerForRoom(io, socket, roomId, ROOM_STATUS.ACTIVE);

    await sendRoom(io, roomId, room);
    io.to(roomId).emit("message", `Раунд начался!`);
  }

  static async pause(io, socket, roomId) {
    const room = await RoomService.updateRoomById(roomId, {
      status: ROOM_STATUS.PAUSE,
    });
    if (room.type === "multi") {
      const roomMap = roomWords.get(roomId);

      const currentWord = roomMap.currentWord;
      if (!roomMap.unUsedWords.includes(currentWord)) {
        roomMap.unUsedWords.push(currentWord);
      }

      const nextLead = await nextLeadHandler(roomId);

      if (!nextLead) {
        const room = await updateRoomsWithUserProfilePoints(roomId);
        io.to(roomId).emit("endGame", { room });
        return;
      }
    }
    this.initTimerForRoom(io, socket, roomId, ROOM_STATUS.PAUSE);

    io.to(roomId).emit("message", `Смена раунда`);
    await sendRoom(io, roomId);
  }

  static initTimer(initTimerForRoom) {
    this.initTimerForRoom = initTimerForRoom;
  }
}

module.exports = GameController;
