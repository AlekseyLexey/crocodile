import { Button } from "@/shared/ui/Button/Button";
import styles from "./GamePage.module.scss";
import { CanvasComponent } from "@/shared/ui/Canvas/Canvas";
import { Tools } from "@/shared/ui/Tools/Tools";
import { ColorsPanel } from "@/shared/ui/ColorsPanel/ColorsPanel";
import { Chat } from "@/shared/ui/Chat/Chat";

export const GamePage = () => {
  const users = [
    { id: "1", username: "Игрок1", score: 150 },
    { id: "2", username: "Игрок2", score: 120 },
    { id: "3", username: "Игрок3", score: 90 },
    { id: "4", username: "Игрок4", score: 80 },
    { id: "5", username: "Игрок5", score: 70 },
    { id: "6", username: "Игрок6", score: 60 },
    { id: "7", username: "Игрок7", score: 50 },
    { id: "8", username: "Игрок8", score: 40 },
  ];

  return (
    <div className={styles.game}>
      <div className={styles.container}>
        <Button buttonText="Выйти из игры" className={styles.exitButton} />
        <ColorsPanel />
        <div className={styles.gameArea}>
          <p>яблоко</p>
        </div>
        <div className={styles.canvas}>
          <CanvasComponent />
        </div>
        <div className={styles.timer}>00:30</div>
        <Tools />
        <div className={styles.sidebar}>
          {users.map((user) => (
            <div key={user.id} className={styles.userCard}>
              <div className={styles.userAvatar} />
              <div className={styles.userName}>{user.username}</div>
              <div className={styles.userScore}>{user.score}</div>
            </div>
          ))}
        </div>
        <Chat roomName="Название комнаты" />
      </div>
    </div>
  );
};
