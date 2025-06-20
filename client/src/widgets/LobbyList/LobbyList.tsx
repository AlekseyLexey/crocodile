import { useEffect, useState } from 'react';
import {
  $api,
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
import { useBackground } from '@/app/store/BackgroundContext';
import lionSvg from '@/assets/svg/animals/лев.svg';
import crabSvg from '@/assets/svg/animals/краб.svg';
import whaleSvg from '@/assets/svg/animals/кит.svg';
import type { IActiveUserRoom, IRoomForUser } from '@/entities/room/model';

export const LobbyList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { rooms } = useAppSelector((state) => state.room);
  const navigate = useNavigate();
  const { setBackground } = useBackground();

  const [activeUserRooms, setActiveUserRooms] = useState<IActiveUserRoom[]>([]);

  useEffect(() => {
    const res = dispatch(getAllRoomThunk());
    setBackground('river');

    if (getAllRoomThunk.rejected.match(res)) {
      alert(res.payload?.message);
      return;
    }

    return () => setBackground('forest');
  }, [dispatch, setBackground]);

  useEffect(() => {
    const getUserActiveRooms = async () => {
      const userActiveRooms = await $api.get('/user-room/active');
      console.log('userActiveRooms', userActiveRooms);
      

      if (!userActiveRooms) {
        setActiveUserRooms([]);
      }

      setActiveUserRooms(userActiveRooms?.data?.data);
      console.log('activeUserRooms ==>', activeUserRooms);
      
    };

    getUserActiveRooms();
  }, []);

  const handleJoinGame = (id: number) => {
    navigate(`${CLIENT_ROUTES.GAME}/${id}`);
  };

  return (
    <>
      <div className={styles.pageContainer}>
        {/* Десктопные животные */}
        <img src={lionSvg} alt="Лев" className={styles.lionDesktop} />
        <img src={crabSvg} alt="Краб" className={styles.crabDesktop} />
        <img src={whaleSvg} alt="Кит" className={styles.whaleDesktop} />

        {/* Мобильное животное */}
        <img src={lionSvg} alt="Лев" className={styles.lionMobile} />

        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>Доступные игры</h1>

          <div className={styles.lobbiesContainer}>
            {activeUserRooms && activeUserRooms.map((userRoom: IActiveUserRoom) => {
              return (
                <div
                  key={`${userRoom.room.id}_active`}
                  className={styles.lobbyCard}
                >
                  <span className={styles.lobbyName}>{userRoom.room.name}</span>
                  <div className={styles.lobbyName}>продолжить</div>
                  <Button
                    onClick={() => handleJoinGame(userRoom.room.id)}
                    buttonText="войти"
                    className={styles.joinButton}
                  />
                </div>
              );
            })}
            {rooms.map((room: IRoom) => {
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
