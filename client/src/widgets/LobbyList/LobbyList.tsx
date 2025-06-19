import { useEffect, useState } from "react";
import {
  Button,
  CLIENT_ROUTES,
  ROOM_STATUSES,
  useAppDispatch,
  useAppSelector,
} from "@/shared";
import { CreateGameModal } from "@/shared/ui/Modal/CreateGameModal";
import styles from "./LobbyList.module.scss";
import { getAllRoomThunk } from "@/entities/room/api/RoomApi";
import type { IRoom } from "@/entities/room";
import { useNavigate } from "react-router-dom";
import lionSvg from "@/assets/svg/animals/лев.svg";
import crabSvg from "@/assets/svg/animals/краб.svg";
import whaleSvg from "@/assets/svg/animals/кит.svg";

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
