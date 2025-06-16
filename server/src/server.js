require("dotenv").config();
const app = require("./app");
const { Server } = require("socket.io");
const initSocket = require("./sockets/initSocket");

const PORT = process.env.PORT || 3002;

const expressServer = app.listen(PORT, () => {
  console.log("Server Started on PORT:", PORT);
});

const io = new Server(expressServer, {
  cors: {
    origin: ["http://localhost:5173", "https://crocdraw.ru"],
  },
});

initSocket(io);
