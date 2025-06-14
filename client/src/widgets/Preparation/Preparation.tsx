import { Button } from "@/shared";
import styles from "./Preparation.module.scss";
import { useSocket } from "@/app/store/hooks/useSocket";
import { useParams } from "react-router-dom";
import { SOCKET_STATUS_ROUTES } from "@/shared";

interface IPreparationProps {
  isOwner: boolean;
}

export const Preparation: React.FC<IPreparationProps> = ({ isOwner }) => {
  const { socket } = useSocket();
  const { id: roomId } = useParams();

  const handleStartGame = () => {
    socket.emit(SOCKET_STATUS_ROUTES.START, {
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
