import { Button } from "@/shared";
import styles from "./GamePage.module.scss";
export const GamePage = () => {
    return (
        <>
            <Button buttonText="Выйти из игры" className={styles.exitButton}/>
            <div className={styles.container}>
                <div className={styles.colorsPanel}>цвета</div>
                <div className={styles.gameArea}>слово</div>
                <div className={styles.timer}>таймер</div>
                <div className={styles.tools}>инструмент</div>
                <div className={styles.sidebar}>пользователи</div>
                <div className={styles.chat}>чат</div>
            </div>
        </>
    )
}