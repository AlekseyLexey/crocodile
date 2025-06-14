import styles from '@/pages/GamePage/GamePage.module.scss';
import vectorIcon from '@/assets/svg/Vector.svg';
import { useAppSelector, SOCKET_CHAT_ROUTES } from '@/shared';
import React, { useEffect, useState } from 'react';
import type { IUser } from '@/entities/user';
import { useSocket } from '@/app/store/hooks/useSocket';
import { ChatMessage } from '../../shared/ui/ChatMessage/ChatMessage';

export interface IMessage {
  message: string;
  sender: IUser;
}

export const Chat = () => {
  const { room } = useAppSelector((state) => state.room);
  const roomId = room?.id;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { socket } = useSocket();
  const { user } = useAppSelector((state) => state.user);
  const [inputMessage, setInputMessage] = useState<string>('');

  useEffect(() => {
    socket.on(
      SOCKET_CHAT_ROUTES.NEW_MESSAGE,
      ({ message, sender }: IMessage) => {
        setMessages((prev) => [...prev, { message, sender }]);
      }
    );

    return () => {
      socket.off(SOCKET_CHAT_ROUTES.NEW_MESSAGE);
    };
  }, [socket, roomId]);

  const onSendMessageHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      socket.emit(SOCKET_CHAT_ROUTES.SEND_MESSAGE, {
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
