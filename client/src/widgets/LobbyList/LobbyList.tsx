import { useEffect, useState } from "react";
import {
  $api,
  Button,
  CLIENT_ROUTES,
  SOCKET_LOBBIES,
  useAppDispatch,
  useAppSelector,
} from "@/shared";
import { CreateGameModal } from "@/shared/ui/Modal/CreateGameModal";
import styles from "./LobbyList.module.scss";
import { getAllRoomThunk } from "@/entities/room/api/RoomApi";
import { createRoom, updateRoom, type IRoom } from "@/entities/room";
import { useNavigate } from "react-router-dom";
import { useBackground } from "@/app/store/BackgroundContext";
import lionSvg from "@/assets/svg/animals/лев.svg";
import crabSvg from "@/assets/svg/animals/краб.svg";
import whaleSvg from "@/assets/svg/animals/кит.svg";
import type { IActiveUserRoom } from "@/entities/room/model";
import { useSocket } from "@/app/store/hooks/useSocket";


export const LobbyList = () => {
  const { socket } = useSocket();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { rooms } = useAppSelector((state) => state.room);
  const navigate = useNavigate();
  const { setBackground } = useBackground();

  const [activeUserRooms, setActiveUserRooms] = useState<IActiveUserRoom[]>([]);
  const [gameTypeFilter, setGameTypeFilter] = useState<string>("all");

  useEffect(() => {
    const res = dispatch(getAllRoomThunk());
    setBackground("river");

    if (getAllRoomThunk.rejected.match(res)) {
      alert(res.payload?.message);
      return;
    }

    return () => setBackground("forest");
  }, [dispatch, setBackground]);

  useEffect(() => {
    const getUserActiveRooms = async () => {
      try {
        const { data } = await $api.get("/user-room/active");
        setActiveUserRooms(data?.data || []);
      } catch (error) {
        console.error("Failed to fetch active rooms:", error);
        setActiveUserRooms([]);
      }
    };

    getUserActiveRooms();

    const handleGetActiveRoom = (rooms: IActiveUserRoom[]) => {
      setActiveUserRooms(rooms);
    };

    const handleCreateRoom = (room: IRoom) => {
      dispatch(createRoom(room));
    };

    const handleUpdateRoom = (room: IRoom) => {
      dispatch(updateRoom(room));
    };

    socket.on(SOCKET_LOBBIES.GET_ACTIVE, handleGetActiveRoom);
    socket.on(SOCKET_LOBBIES.CREATE, handleCreateRoom);
    socket.on(SOCKET_LOBBIES.UPDATE, handleUpdateRoom);

    return () => {
      socket.off(SOCKET_LOBBIES.CREATE, handleCreateRoom);
      socket.off(SOCKET_LOBBIES.UPDATE, handleUpdateRoom);
      socket.off(SOCKET_LOBBIES.GET_ACTIVE, handleGetActiveRoom);
    };
  }, [dispatch, socket]);

  const handleJoinGame = (id: number) => {
    navigate(`${CLIENT_ROUTES.GAME}/${id}`);
  };

  const filteredRooms = rooms.filter((room) => {
    return gameTypeFilter === "all" || room.type === gameTypeFilter;
  });

  const filteredActiveRooms = activeUserRooms.filter((userRoom) => {
    return gameTypeFilter === "all" || userRoom.room.type === gameTypeFilter;
  });

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

          {/* Фильтры */}
          <div className={styles.filtersContainer}>
            <select
              value={gameTypeFilter}
              onChange={(e) => setGameTypeFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">Все режимы</option>
              <option value="mono">Моно</option>
              <option value="multi">Мульти</option>
            </select>
          </div>

          <div className={styles.lobbiesContainer}>
            {filteredActiveRooms.length > 0 && (
              <h2 className={styles.sectionTitle}>Ваши активные игры</h2>
            )}
            {filteredActiveRooms.map((userRoom: IActiveUserRoom) => {
              return (
                <div
                  key={`${userRoom.room.id}_active`}
                  className={styles.lobbyCard}
                >
                  <span className={styles.lobbyName}>
                    {userRoom.room.name}
                  </span>
                  <div className={styles.lobbyName}>продолжить</div>
                  <Button
                    onClick={() => handleJoinGame(userRoom.room.id)}
                    buttonText="войти"
                    className={styles.joinButton}
                  />
                </div>
              );
            })}

            {filteredRooms.length > 0 && (
              <h2 className={styles.sectionTitle}>Доступные комнаты</h2>
            )}
            {filteredRooms.map((room: IRoom) => {
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