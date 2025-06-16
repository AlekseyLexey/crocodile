const { updateUserService } = require("../../services/userService");
const RoomService = require("../../services/roomService");

const updateRoomsWithUserProfilePoints = async (roomId) => {
  try {
    const room = await RoomService.updateRoomById(roomId, { status: "end" });
    const arrayUsersOfRoom = room.roomUsers;
    for (const user of arrayUsersOfRoom) {
      await updateUserService(user.id, {
        point: user.point + user.UserRoom.point,
      });
    }
    const updatedRoom = await RoomService.findRoomById(roomId);

    return updatedRoom;
  } catch (err) {
    console.error("Error while updating user's point", err);
    return null;
  }
};

module.exports = updateRoomsWithUserProfilePoints;
