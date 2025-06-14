import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GamePage.module.scss';
import {
  Button,
  ColorsPanel,
  CLIENT_ROUTES,
  useAppDispatch,
  useAppSelector,
} from '@/shared';
import { CanvasComponent, Tools, Chat, WordPanel } from '@/features';
import { useSocket } from '@/app/store/hooks/useSocket';
import { setRoom } from '@/entities/room';

// const roomId = new Date().getMilliseconds();
const roomId = 1;

export const GamePage = () => {
  const { room } = useAppSelector((state) => state.room);
  const { user } = useAppSelector((state) => state.user);
  // const [isJoined, setIsJoined] = useState(false);
  const dispatch = useAppDispatch();
  const { socket } = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit('joinRoom', {
      user,
      roomId,
    });

    socket.on('room', ({ room }) => {
      dispatch(setRoom(room));
    });

    socket.on('message', (message) => {
      console.log(message);
    });

    //не вижу на серваке эмита такого
    socket.on('exit', (message) => {
      console.log(message);
    });

    socket.on('endGame', ({ room }) => {
      alert('Игра окончена!!!');
      dispatch(setRoom(room));
    });

    return () => {
      socket.off('room');
      socket.off('joinedRoom');
      socket.off('message');
      socket.off('exit');
      socket.off('endGame');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleExit = () => {
    socket.emit('exitRoom', {
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
        {isOwner && <ColorsPanel />}
        {room && <WordPanel isOwner={isOwner} />}
        <div className={styles.canvas}>
          <CanvasComponent isOwner={isOwner} />
        </div>
        <div className={styles.timer}>00:30</div>
        {isOwner && <Tools />}
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
