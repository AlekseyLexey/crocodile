import styles from '@/pages/GamePage/GamePage.module.scss';
import vectorIcon from '@/assets/svg/Vector.svg';
import { useAppSelector } from '@/shared/hooks/useReduxHooks';
import { useEffect, useState } from 'react';
import type { IUser } from '@/entities/user';
import { useSocket } from '@/app/store/hooks/useSocket';
import { ChatMessage } from '../ChatMessage/ChatMessage';

// interface ChatProps {
//   roomName: string;
// }

export interface IMessage {
  message: string;
  sender: IUser;
}

export const Chat = () => {
  const { room } = useAppSelector((state) => state.room);
  const roomId = room?.id
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { socket } = useSocket();
  const { user } = useAppSelector((state) => state.user);
  const [inputMessage, setInputMessage] = useState<string>('');

  useEffect(() => {
    socket.on('newMessage', ({ message, sender }: IMessage) => {
      setMessages((prev) => [...prev, { message, sender }]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, [socket, roomId]);

  const onSendMessageHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      socket.emit('sendMessage', {
        message: inputMessage.trim(),
        user,
        roomId,
      });
      setInputMessage('');
    }
  };

  return (
    <div className={styles.chat}>
      <div className={styles.roomName}>
        <p>{room?.name}</p>
      </div>

      <div className={styles.messagesContainer}>
        {/* <div className={`${styles.message} ${styles.otherMessage}`}>
          Это сообщение от другого игрока
        </div>
        <div className={`${styles.message} ${styles.userMessage}`}>
          А это ваше сообщение, которое может быть длиннее
        </div>
        <div className={`${styles.message} ${styles.otherMessage}`}>
          Короткое
        </div>
        <div className={`${styles.message} ${styles.userMessage}`}>
          Очень длинное сообщение, которое должно переноситься на новую строку,
          если не помещается в максимальную ширину
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
        ))} */}
        {messages.map((message, index) => {
          return (
            <ChatMessage msg={message} key={`${index}_${message.sender.id}`} />
          );
        })}
      </div>

      <form onSubmit={onSendMessageHandler} className={styles.inputContainer}>
        <input
          className={styles.chatInput}
          placeholder="Введите сообщение..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button className={styles.sendButton} type="submit">
          <img src={vectorIcon} alt="Отправить" className={styles.toolIcon} />
        </button>
      </form>
    </div>
  );
};
