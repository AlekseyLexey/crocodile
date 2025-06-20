import { Button, CLIENT_ROUTES, useAppSelector } from "@/shared";
import { useNavigate } from "react-router-dom";
import styles from "./Finish.module.scss";

export const Finish = () => {
  const navigate = useNavigate();
  const { room } = useAppSelector((state) => state.room);

  const handleReturnToLobby = () => {
    navigate(CLIENT_ROUTES.LOBBY_LIST);
  };

  return (
    <div className={styles.finish}>
      <h2 className={styles.title}>Игра завершена!</h2>
      
      <div className={styles.resultsContainer}>
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
      </div>
      
      <Button 
        onClick={handleReturnToLobby}
        buttonText="Вернуться в лобби"
        className={styles.returnButton}
      />
    </div>
  );
};
