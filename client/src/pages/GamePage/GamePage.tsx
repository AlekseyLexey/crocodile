import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./GamePage.module.scss";
import { useSocket } from "@/app/store/hooks/useSocket";
import { ChangeOfRound, Finish, Preparation } from "@/widgets";
import { CanvasComponent, Tools, Chat, WordPanel } from "@/features";
import { setRoom } from "@/entities/room";
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

export const GamePage = () => {
  const { room, time } = useAppSelector((state) => state.room);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const roomId: number = useMemo(() => {
    return Number(id);
  }, [id]);

  if (!user) {
    navigate(CLIENT_ROUTES.SIGN_IN);
  }
  const { socket } = useSocket();

  useEffect(() => {
    if (!roomId) return;
    socket.emit(SOCKET_ROOM_ROUTES.JOIN_ROOM, {
      user,
      roomId,
    });

    socket.on(SOCKET_DRAW_ROUTES.COLOR, ({ color }) => {
      dispatch(setColor(color));
    });

    socket.on(SOCKET_ROOM_ROUTES.ROOM, ({ room }) => {
      dispatch(setRoom(room));
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
    };
  }, [dispatch, user, socket, roomId]);

  useEffect(() => {
    socket.on("timer", ({ time }) => {
      if (time === null) {
        if (room?.status === ROOM_STATUSES.ACTIVE) {
          socket.emit(SOCKET_STATUS_ROUTES.PAUSE, { roomId });
        }
        if (room?.status === ROOM_STATUSES.PAUSE) {
          socket.emit(SOCKET_STATUS_ROUTES.START, { roomId });
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
  }, [dispatch, user, socket, roomId, navigate, room?.status]);

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

  const isOwner = useMemo(
    () => user?.id === room?.owner_id,
    [user?.id, room?.owner_id]
  );

  return (
    <div className={styles.game}>
      <div className={styles.container}>
        <Button
          onClick={handleExit}
          buttonText="Выйти из игры"
          className={styles.exitButton}
        />
        {room?.status === ROOM_STATUSES.PREPARE && (
          <Preparation isOwner={isOwner} />
        )}
        {room?.status === ROOM_STATUSES.ACTIVE && (
          <>
            {isOwner && <ColorsPanel />}
            {room && <WordPanel isOwner={isOwner} />}
            <div className={styles.canvas}>
              <CanvasComponent isOwner={isOwner} />
            </div>
            <div className={styles.timer}>{time} сек</div>
            {isOwner && <Tools />}
            {isOwner && (
              <Button buttonText="Завершить игру" onClick={handleEndGame} />
            )}
            {isOwner && (
              <Button buttonText="Завершить раунд" onClick={handleChangeGame} />
            )}
          </>
        )}
        {room?.status === ROOM_STATUSES.PAUSE && <ChangeOfRound />}
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
        {room && <Chat />}
      </div>
    </div>
  );
};
