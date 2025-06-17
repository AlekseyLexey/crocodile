const UserRoomService = require('../../services/userRoomService');

async function nextLeadHandler(roomId) {
  const currentLead = await UserRoomService.findLeadOfRoom(roomId);

  if (currentLead) {
    await UserRoomService.changeLeadStatus({
      userId: currentLead.user_id,
      roomId,
      leadStatus: false,
      wasLeadStatus: true,
    });
  }

  const nextLead = await UserRoomService.findNextLeadOfRoom(roomId);

  if (nextLead) {
    await UserRoomService.changeLeadStatus({
      userId: nextLead.user_id,
      roomId,
      leadStatus: true,
    });
  }

  return nextLead;
}

module.exports = nextLeadHandler;
