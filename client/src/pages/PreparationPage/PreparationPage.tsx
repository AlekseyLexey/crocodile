import { Button, CLIENT_ROUTES } from "@/shared";
import { useNavigate } from "react-router-dom";
import styles from "./PreparationPage.module.scss";

export const PreparationPage = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate(CLIENT_ROUTES.GAME);
  };

  return (
    <div className={styles.preparation}>
      <div className={styles.content}>
        <h1 className={styles.title}>Приготовьтесь к игре!</h1>
        <p className={styles.description}>Когда будете готовы, нажмите кнопку ниже</p>
        
        <Button
          onClick={handleStartGame}
          buttonText="Начать игру"
          className={styles.startButton}
        />
      </div>
    </div>
  );
};
