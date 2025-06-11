require("dotenv").config();
const app = require("./app");
const { Server } = require("socket.io");
const initSocket = require("./initSocket");

const PORT = process.env.PORT || 3002;

const expressServer = app.listen(PORT, () => {
  console.log("Server Started on PORT:", PORT);
});

const io = new Server(expressServer, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected СОБАКА =+====================>`);

  socket.on("joinRoom", async ({ user, roomId }) => {
    socket.user = user;
    socket.join(roomId);

    const sockets = await io.in(roomId).fetchSockets();

    const users = sockets.map((socket) => socket.user);

    io.to(roomId).emit("userList", {
      users,
    });

    socket.to(roomId).emit("message", `Игрок ${user.name} присоеденился`);
  });
});

// initSocket(io);
