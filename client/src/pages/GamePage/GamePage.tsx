import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/Button/Button";
import styles from "./GamePage.module.scss";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useReduxHooks";
import { CanvasComponent } from "@/shared/ui/Canvas/Canvas";
import { Tools } from "@/shared/ui/Tools/Tools";
import { ColorsPanel } from "@/shared/ui/ColorsPanel/ColorsPanel";
import { Chat } from "@/shared/ui/Chat/Chat";
import { useSocket } from "@/app/store/hooks/useSocket";
import { setRoom } from "@/entities/room";
import { useNavigate } from "react-router-dom";
import { CLIENT_ROUTES } from "@/shared";

// const roomId = new Date().getMilliseconds();
const roomId = 1;

export const GamePage = () => {
  const { room } = useAppSelector((state) => state.room);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { socket } = useSocket();
  const [isJoined, setIsJoined] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("joinRoom", {
      user,
      roomId,
    });

    socket.on("joinedRoom", () => setIsJoined(true));

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

  const handleExit = () => {
    socket.emit("exit", {
      user,
      roomId,
    });

    dispatch(setRoom(null));
    navigate(CLIENT_ROUTES.MAIN);
  };

  return (
    <div className={styles.game}>
      <div className={styles.container}>
        <Button
          onClick={handleExit}
          buttonText="Выйти из игры"
          className={styles.exitButton}
        />
        <ColorsPanel />
        <div className={styles.gameArea}>
          <p>яблоко</p>
        </div>
        <div className={styles.canvas}>
          <CanvasComponent />
        </div>
        <div className={styles.timer}>00:30</div>
        <Tools />
        <div className={styles.sidebar}>
          {room?.roomUsers.map((user) => (
            <div key={user.id} className={styles.userCard}>
              <div className={styles.userAvatar} />
              <div className={styles.userName}>{user.username}</div>
              <div className={styles.userScore}>{user.point}</div>
            </div>
          ))}
        </div>
        <Chat roomName="Название комнаты" />
      </div>
    </div>
  );
};
