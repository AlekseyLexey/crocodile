const RoomService = require("../../services/roomService");

const LOBBIES_ROUTES = {
  CREATE: "createLobbies",
  UPDATE: "updateLobbies",
  GET_ACTIVE: "getActiveLobbies",
};

const lobbiesSocket = (io, socket) => {
  socket.on(LOBBIES_ROUTES.CREATE, async ({ id }) => {
    const room = await RoomService.findRoomById(id);
    io.emit(LOBBIES_ROUTES.CREATE, room);
  });
};

module.exports = {
  LOBBIES_ROUTES,
  lobbiesSocket,
};
