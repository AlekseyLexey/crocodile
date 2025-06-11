import styles from "@/pages/GamePage/GamePage.module.scss";
import vectorIcon from "@/assets/svg/Vector.svg";

interface ChatProps {
  roomName: string;
}

export const Chat = ({ roomName }: ChatProps) => {
  return (
    <div className={styles.chat}>
      <div className={styles.roomName}>
        <p>{roomName}</p>
      </div>

      <div className={styles.messagesContainer}>
        <div className={`${styles.message} ${styles.otherMessage}`}>
          Это сообщение от другого игрока
        </div>
        <div className={`${styles.message} ${styles.userMessage}`}>
          А это ваше сообщение, которое может быть длиннее
        </div>
        <div className={`${styles.message} ${styles.otherMessage}`}>
          Короткое
        </div>
        <div className={`${styles.message} ${styles.userMessage}`}>
          Очень длинное сообщение, которое должно переноситься на новую строку, если не помещается в максимальную ширину
        </div>
        
        {Array.from({ length: 10 }).map((_, i) => (
          <div 
            key={i} 
            className={`${styles.message} ${
              i % 2 ? styles.userMessage : styles.otherMessage
            }`}
          >
            Сообщение {i + 1} для демонстрации прокрутки
          </div>
        ))}
      </div>

      <div className={styles.inputContainer}>
        <input
          className={styles.chatInput}
          placeholder="Введите сообщение..."
        />
        <button className={styles.sendButton}>
          <img
            src={vectorIcon}
            alt="Отправить"
            className={styles.toolIcon}
          />
        </button>
      </div>
    </div>
  );
};