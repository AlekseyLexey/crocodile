import { Button, SOCKET_STATUS_ROUTES, useAppSelector } from "@/shared";
import styles from "./ChangeOfRound.module.scss";
import { useMemo } from "react";
import { useSocket } from "@/app/store/hooks/useSocket";
import { useParams } from "react-router-dom";

export const ChangeOfRound = () => {
  const { room, time } = useAppSelector((state) => state.room);
  const { socket } = useSocket();
  const { id } = useParams();

  const roomId: number = useMemo(() => {
    return Number(id);
  }, [id]);

  const handleChangeGame = () => {
    socket.emit(SOCKET_STATUS_ROUTES.START, {
      roomId,
    });
  };

  return (
    <div className={styles.changeOfRound}>
      <h2 className={styles.title}>Раунд завершён</h2>
      
      <div className={styles.resultsTable}>
        <div className={styles.tableHeader}>
          <span>Место</span>
          <span>Игрок</span>
          <span>Очки</span>
        </div>

        {room?.roomUsers
          .toSorted((a, b) => b.UserRoom.point - a.UserRoom.point)
          .map((player, index) => (
            <div key={player.id} className={styles.playerRow}>
              <span className={styles.position}>{index + 1}</span>
              <span className={styles.username}>{player.username}</span>
              <span className={styles.score}>{player.UserRoom.point}</span>
            </div>
          ))}
      </div>
      
      <h3 className={styles.subtitle}>До нового раунда: {time} сек</h3>
      
      <Button 
        buttonText="Начать следующий раунд" 
        onClick={handleChangeGame} 
        className={styles.actionButton}
      />
    </div>
  );
};
