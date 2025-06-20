import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./GamePage.module.scss";
import { useSocket } from "@/app/store/hooks/useSocket";
import { ChangeOfRound, Finish, Preparation } from "@/widgets";
import { CanvasComponent, Tools, Chat, WordPanel } from "@/features";
import { setRoom, type IRoomUser } from "@/entities/room";
import { setColor } from "@/entities/canvas/slice/canvasSlice";
import { setTime } from "@/entities/room/slice/RoomSlice";
import { SOCKET_ROOM_ROUTES, SOCKET_STATUS_ROUTES } from "@/shared";
import {
  Button,
  ColorsPanel,
  CLIENT_ROUTES,
  useAppDispatch,
  useAppSelector,
  SOCKET_DRAW_ROUTES,
  ROOM_STATUSES,
} from "@/shared";
import { useBackground } from "@/app/store/BackgroundContext";
import crocodileSvg from "@/assets/svg/animals/крокодил.svg";
import raccoonSvg from "@/assets/svg/animals/енот.svg";
import { io } from "socket.io-client";

const socket = io("ws://localhost:3000");

export const GamePage = () => {
  const { room, time } = useAppSelector((state) => state.room);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { setBackground } = useBackground();

  const [lead, setLead] = useState<number | null>(null);

  const roomId: number = useMemo(() => {
    return Number(id);
  }, [id]);

  if (!user) {
    navigate(CLIENT_ROUTES.SIGN_IN);
  }
  // const { socket, setSocket } = useSocket();

  const isLead = useMemo(() => user?.id === lead, [user?.id, lead]);

  useEffect(() => {
    // setSocket(io("ws://localhost:3000"));

    return () => {
      socket.emit(SOCKET_ROOM_ROUTES.EXIT_ROOM, {
        user,
        roomId,
      });
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket || !roomId) return;
    setBackground("river");

    socket.emit(SOCKET_ROOM_ROUTES.JOIN_ROOM, {
      user,
      roomId,
    });

    socket.on(SOCKET_DRAW_ROUTES.COLOR, ({ color }) => {
      dispatch(setColor(color));
    });

    socket.on("disconnect", () => {
      alert("ВЫ ВЫЛЕТИ");
    });

    socket.on(SOCKET_ROOM_ROUTES.ROOM, ({ room }) => {
      dispatch(setRoom(room));

      const leader = room.roomUsers.filter(
        (user: IRoomUser) => user.UserRoom.is_lead
      );

      setLead(leader[0].id);
    });

    socket.on("message", (message: string) => {
      console.log(message);
    });

    socket.on(SOCKET_STATUS_ROUTES.END, ({ room }) => {
      dispatch(setRoom(room));
    });

    return () => {
      socket.off(SOCKET_ROOM_ROUTES.JOIN_ROOM);
      socket.off(SOCKET_ROOM_ROUTES.ROOM);
      socket.off("message");
      socket.off(SOCKET_STATUS_ROUTES.END);
      socket.off(SOCKET_DRAW_ROUTES.COLOR);
      socket.off("disconnect");
      setBackground("forest");
    };
  }, [dispatch, user, socket, roomId, setBackground]);

  useEffect(() => {
    let endGameTimer: NodeJS.Timeout;

    socket.on("alertDisconnect", ({ disconnetedUser }) => {
      if (disconnetedUser.id === lead) {
        if (room?.type === "mono") {
          alert(
            `${disconnetedUser.username} вылетел ВЕДУЩИЙ! Игра закончится через 30 сек`
          );
          endGameTimer = setTimeout(() => {
            socket.emit(SOCKET_STATUS_ROUTES.END, {
              roomId,
            });
          }, 10000);
        }
        if (room?.type === "multi") {
          alert(
            `${disconnetedUser.username} вылетел ВЕДУЩИЙ! Переходим к следующему раунду`
          );
          socket.emit(SOCKET_STATUS_ROUTES.PAUSE, {
            roomId,
          });
        }
        return;
      }
      alert(`${disconnetedUser.username} отключился`);
    });

    return () => {
      socket.off("alertDisconnect");
      clearTimeout(endGameTimer);
    };
  }, [dispatch, user, socket, roomId, lead, room?.type]);

  useEffect(() => {
    if (!socket || !roomId) return;
    socket.on("timer", ({ time }) => {
      if (time === null) {
        if (isLead && room?.status !== ROOM_STATUSES.PREPARE) {
          if (room?.status === ROOM_STATUSES.ACTIVE) {
            socket.emit(SOCKET_STATUS_ROUTES.PAUSE, { roomId });
          }
          if (room?.status === ROOM_STATUSES.PAUSE) {
            socket.emit(SOCKET_STATUS_ROUTES.START, { roomId });
          }
          return;
        }
        dispatch(setTime(null));
        return;
      }

      const seconds = Math.round(time / 1000);
      dispatch(setTime(seconds));
    });

    if (room?.status === ROOM_STATUSES.END) {
      const timer = setTimeout(() => {
        navigate(CLIENT_ROUTES.LOBBY_LIST);
      }, 5000);

      return () => clearTimeout(timer);
    }

    return () => {
      socket.off("timer");
    };
  }, [dispatch, user, socket, roomId, navigate, room?.status, isLead]);

  if (!socket) {
    return <h1>ЗАГРУЗКА</h1>;
  }

  const handleChangeGame = () => {
    socket.emit(SOCKET_STATUS_ROUTES.PAUSE, {
      roomId,
    });
  };

  const handleEndGame = () => {
    socket.emit(SOCKET_STATUS_ROUTES.END, {
      roomId,
    });
  };

  const handleExit = () => {
    socket.emit(SOCKET_ROOM_ROUTES.EXIT_ROOM, {
      user,
      roomId,
    });

    dispatch(setRoom(null));
    navigate(CLIENT_ROUTES.MAIN);
  };

  return (
    <div className={styles.game}>
      <img
        src={crocodileSvg}
        alt="Крокодил"
        className={styles.crocodileDesktop}
      />
      <img src={raccoonSvg} alt="Енот" className={styles.raccoonDesktop} />
      <div className={styles.container}>
        {room?.status === ROOM_STATUSES.PREPARE && (
          <Preparation isOwner={isLead} socket={socket} />
        )}
        {room?.status === ROOM_STATUSES.ACTIVE && (
          <>
            {isLead && <ColorsPanel socket={socket} />}
            {room && <WordPanel isOwner={isLead} socket={socket} />}
            <div className={styles.canvas}>
              <CanvasComponent isOwner={isLead} socket={socket} />
            </div>
            <div className={styles.timer}>{time} сек</div>
            {isLead && <Tools socket={socket} />}
          </>
        )}
        {room?.status === ROOM_STATUSES.PAUSE && (
          <ChangeOfRound socket={socket} />
        )}
        {room?.status === ROOM_STATUSES.END && <Finish />}
        <div className={styles.sidebar}>
          {room?.roomUsers.map((user) => (
            <div key={user.id} className={styles.userCard}>
              <div className={styles.userAvatar} />
              <div className={styles.userName}>{user.username}</div>
              <div className={styles.userScore}>{user.UserRoom.point}</div>
            </div>
          ))}
        </div>
        {room && <Chat socket={socket} />}
      </div>
      <div className={styles.controls}>
        {isLead && room?.status === ROOM_STATUSES.ACTIVE && (
          <>
            <Button
              buttonText="Завершить игру"
              onClick={handleEndGame}
              className={styles.gameButton}
            />
            <Button
              buttonText="Завершить раунд"
              onClick={handleChangeGame}
              className={styles.gameButton}
            />
          </>
        )}
        <Button
          onClick={handleExit}
          buttonText="Выйти из игры"
          className={styles.gameButton}
        />
      </div>
    </div>
  );
};
