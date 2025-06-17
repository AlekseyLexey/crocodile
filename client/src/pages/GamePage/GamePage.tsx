import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './GamePage.module.scss';
import {
  Button,
  ColorsPanel,
  CLIENT_ROUTES,
  useAppDispatch,
  useAppSelector,
  SOCKET_DRAW_ROUTES,
  ROOM_STATUSES,
} from "@/shared";
import { CanvasComponent, Tools, Chat, WordPanel } from "@/features";
import { Finish, Preparation } from "@/widgets";
import { useSocket } from "@/app/store/hooks/useSocket";
import { setRoom } from "@/entities/room";
import { SOCKET_ROOM_ROUTES, SOCKET_STATUS_ROUTES } from "@/shared";
import { setColor } from "@/entities/canvas/slice/canvasSlice";

export const GamePage = () => {
  const { room } = useAppSelector((state) => state.room);
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();

  const roomId: number = useMemo(() => {
    return Number(id);
  }, [id]);

  if (!user) {
    navigate(CLIENT_ROUTES.SIGN_IN);
  }
  const dispatch = useAppDispatch();
  const { socket } = useSocket();

  useEffect(() => {
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

    socket.on('message', (message: string) => {
      console.log(message);
    });

    socket.on(SOCKET_STATUS_ROUTES.END, ({ room }) => {
      dispatch(setRoom(room));
    });

    return () => {
      socket.off(SOCKET_ROOM_ROUTES.JOIN_ROOM);
      socket.off(SOCKET_ROOM_ROUTES.ROOM);
      socket.off('message');
      socket.off(SOCKET_STATUS_ROUTES.END);
      socket.off(SOCKET_DRAW_ROUTES.COLOR);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (room?.status === ROOM_STATUSES.END) {
      const timer = setTimeout(() => {
        navigate(CLIENT_ROUTES.LOBBY_LIST);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [navigate, room?.status]);

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

  const isOwner = user?.id === room?.owner_id;

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
            <div className={styles.timer}>00:30</div>
            {isOwner && <Tools />}
            {isOwner && (
              <Button buttonText="Завершить игру" onClick={handleEndGame} />
            )}
          </>
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
        {room && <Chat />}
      </div>
    </div>
  );
};
