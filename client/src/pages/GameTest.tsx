import { useEffect, useState } from "react";
import { CLIENT_ROUTES, useAppSelector } from "@/shared";
import { useSocket } from "@/app/store/hooks/useSocket";
import { useNavigate } from "react-router-dom";
import { ChatTest } from "./chatTest";
import { WordTest } from "./wordTest";

// const roomId = new Date().getMilliseconds();
const roomId = 1;

export const GameTest = () => {
  const [room, setRoom] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const { socket } = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("joinRoom", {
      user,
      roomId,
    });

    socket.on("joinedRoom", () => setIsJoined(true));

    socket.on("room", ({ room }) => {
      setRoom(room);
    });

    socket.on("message", (message) => {
      console.log(message);
    });

    socket.on("exit", (message) => {
      console.log(message);
    });

    
    return () => {
      socket.off("room");
      socket.off("joinedRoom");
      socket.off("message");
      socket.off("exit");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleExit = () => {
    socket.emit("exit", {
      user,
      roomId,
    });

    navigate(CLIENT_ROUTES.MAIN);
  };

  const handleStart = () => {
    socket.emit("startGame", {
      roomId,
    });
  };

  const handlePause = () => {
    socket.emit("pauseGame", {
      roomId,
    });
  };

  const btnStart =
    user?.id === room?.owner_id ? (
      <button onClick={handleStart}>Начать игру</button>
    ) : null;

  const pauseGame =
    user?.id === room?.owner_id ? (
      <button onClick={handlePause}>Смена раунда</button>
    ) : null;

  return (
    <div>
      {room &&
        room.roomUsers.map((roomUser) => (
          <div key={roomUser.id}>
            <h3>{roomUser.username}</h3>
            <div>{roomUser.UserRoom.point}</div>
            {roomUser.id === user.id ? btnStart : null}
            {roomUser.id === user.id ? pauseGame : null}
            {roomUser.id === user.id ? (
              <button onClick={handleExit}>Покинуть игру</button>
            ) : null}
          </div>
        ))}
      {isJoined && <ChatTest roomId={roomId} />}
      {isJoined && <WordTest roomId={roomId}/>}
    </div>
  );
};

// ?GameController
// ?Лобби === prepare
// ?Канвас === active
// ?Смена === pause
// ?Конец === end
