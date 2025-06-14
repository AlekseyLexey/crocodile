import { Button } from "@/shared";
import styles from "./Preparation.module.scss";
import { useSocket } from "@/app/store/hooks/useSocket";

// const roomId = new Date().getMilliseconds();
const roomId = 1;

interface IPreparationProps {
  isOwner: boolean;
}

export const Preparation: React.FC<IPreparationProps> = ({ isOwner }) => {
  const { socket } = useSocket();

  const handleStartGame = () => {
    socket.emit("startGame", {
      roomId,
    });
  };

  return (
    <div className={styles.preparation}>
      <h1 className={styles.title}>Приготовьтесь к игре!</h1>
      {isOwner && (
        <>
          <p className={styles.description}>
            Когда будете готовы, нажмите кнопку ниже
          </p>
          <Button
            onClick={handleStartGame}
            buttonText="Начать игру"
            className={styles.startButton}
          />
        </>
      )}
    </div>
  );
};
