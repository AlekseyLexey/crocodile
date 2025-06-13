import { Button } from "@/shared/ui/Button/Button";
import styles from "./GamePage.module.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useReduxHooks";
import { CanvasComponent } from "@/shared/ui/Canvas/Canvas";
import {
  selectCanvas,
  setTool,
  clearCanvas,
} from "@/entities/canvas/slice/canvasSlice";
import { Tools } from "@/shared/ui/Tools/Tools";
import { ColorsPanel } from "@/shared/ui/ColorsPanel/ColorsPanel";
import { Chat } from "@/shared/ui/Chat/Chat";
import { useSocket } from "@/app/store/hooks/useSocket";
import { setRoom } from "@/entities/room";
import { useNavigate } from "react-router-dom";
import { CLIENT_ROUTES } from "@/shared";
import { WordPanel } from "@/shared/ui/WordPanel/WordPanel";

// const roomId = new Date().getMilliseconds();
const roomId = 1;

export const GamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useAppDispatch();
  const { room } = useAppSelector((state) => state.room);
  const { activeTool, dimensions } = useAppSelector(selectCanvas);
  const { socket } = useSocket();
  const { user } = useAppSelector((state) => state.user);
  // const [isJoined, setIsJoined] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("joinRoom", {
      user,
      roomId,
    });

    // socket.on("joinedRoom", () => setIsJoined(true));

    socket.on("room", ({ room }) => {
      dispatch(setRoom(room));
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

  console.log('room', room);
  

  const handleExit = () => {
    socket.emit("exit", {
      user,
      roomId,
    });

    dispatch(setRoom(null));
    navigate(CLIENT_ROUTES.MAIN);
  };

  const handleClear = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    ctx.fillStyle = "#FFF5F5";
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);
    dispatch(clearCanvas());
    dispatch(setTool("pencil"));
  };

  const handleToolChange = (tool: "pencil" | "fill" | "clear") => {
    dispatch(setTool(tool));
    if (tool === "clear") {
      handleClear();
    }
  };

  const isOwner = user?.id === room?.owner_id;
  

  return (
    <div className={styles.game}>
      <div className={styles.container}>
        <Button
          onClick={handleExit}
          buttonText="Выйти из игры"
          className={styles.exitButton}
        />
        {isOwner && <ColorsPanel />}
        {room && <WordPanel isOwner={isOwner}/>}
        <div className={styles.canvas}>
          <CanvasComponent canvasRef={canvasRef} isOwner={isOwner}/>
        </div>
        <div className={styles.timer}>00:30</div>
        {isOwner && <Tools activeTool={activeTool} handleToolChange={handleToolChange} />}
        <div className={styles.sidebar}>
          {room?.roomUsers.map((user) => (
            <div key={user.id} className={styles.userCard}>
              <div className={styles.userAvatar} />
              <div className={styles.userName}>{user.username}</div>
              <div className={styles.userScore}>{user.UserRoom.point}</div>
            </div>
          ))}
        </div>
        {room && <Chat />}
      </div>
    </div>
  );
};
