import { useEffect, useState } from 'react';
import {
  Button,
  CLIENT_ROUTES,
  ROOM_STATUSES,
  useAppDispatch,
  useAppSelector,
} from '@/shared';
import { CreateGameModal } from '@/shared/ui/Modal/CreateGameModal';
import styles from './LobbyList.module.scss';
import { getAllRoomThunk } from '@/entities/room/api/RoomApi';
import type { IRoom } from '@/entities/room';
import { useNavigate } from 'react-router-dom';

export const LobbyList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { rooms } = useAppSelector((state) => state.room);
  const navigate = useNavigate();

  useEffect(() => {
    const res = dispatch(getAllRoomThunk());

    if (getAllRoomThunk.rejected.match(res)) {
      alert(res.payload?.message);
      return;
    }
  }, [dispatch]);

  if (!rooms.length) {
    return <h2>Лобби пока что нет...</h2>;
  }

  const handleJoinGame = (id: number) => {
    navigate(`${CLIENT_ROUTES.GAME}/${id}`);
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>Доступные игры</h1>

          <div className={styles.lobbiesContainer}>
            {rooms.map((room: IRoom) => {
              if (room.status === ROOM_STATUSES.PREPARE) {
                return (
                  <div key={room.id} className={styles.lobbyCard}>
                    <span className={styles.lobbyName}>{room.name}</span>
                    <Button
                      onClick={() => handleJoinGame(room.id)}
                      buttonText="войти"
                      className={styles.joinButton}
                    />
                  </div>
                );
              }
            })}
          </div>

          <div className={styles.createButtonWrapper}>
            <Button
              onClick={() => setIsModalOpen(true)}
              buttonText="Создать игру"
              className={styles.createButton}
            />
          </div>
        </div>
      </div>

      <CreateGameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
