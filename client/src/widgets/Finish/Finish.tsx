import type { IRoomUser } from "@/entities/room";
import { Button, CLIENT_ROUTES } from "@/shared";
import { useNavigate } from "react-router-dom"
import styles from "./GameOverScreen.module.scss";


export const Finish = () => {
    const navigate = useNavigate();

    const players: IRoomUser[] = [
        
    ];


    const handleReturnToLobby = () => {
        navigate(CLIENT_ROUTES.LOBBY_LIST);
    };

    return (
        <div className={styles.gameOverScreen}>
            <div className={styles.container}>
                <h2 className={styles.title}>Игра завершена!</h2>

                <div className={styles.resultsTable}>
                    <div className={styles.tableHeader}>
                        <span>Место</span>
                        <span>Игрок</span>
                        <span>Очки</span>
                    </div>

                    {players 
                    .sort((a,b) => b.score - a.score)
                    .map((player, index) => (
                        <div key={player.id} className={styles.playerRow}>
                            <span className={styles.position}>{index + 1}</span>
                            <span className={styles.username}>{player.username}</span>
                            <span className={styles.score}>{player.score}</span>
                        </div>
                    ))}
            </div>
            <Button 
            onClick={handleReturnToLobby}
            buttonText="Вернуться в лобби"
            className={styles.returnButton}
            />
        </div>
        </div>
    );
};
