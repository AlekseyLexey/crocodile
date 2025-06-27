const isCorrectWord = require("../helpers/isCorrectWord");
const newWordSendler = require("../helpers/newWordSendler");
const correctWordHandler = require("../helpers/correctWordHandler");
const UserRoomService = require("../../services/userRoomService");

module.exports.chatSocket = (io, socket) => {
  socket.on("sendMessage", async ({ message, roomId }) => {
    io.to(roomId).emit("newMessage", { message, sender: socket.user });

    const leadRoom = await UserRoomService.findLeadOfRoom({ roomId });

    if (leadRoom.user_id === socket.user.id || leadRoom === null) {
      return;
    }

    const checker = isCorrectWord(message, roomId);

    if (checker) {
      await correctWordHandler(io, socket, roomId, message);

      await newWordSendler(io, roomId, socket);
    }
  });
};
