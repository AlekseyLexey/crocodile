import styles from './WordPanel.module.scss';
import { useSocket } from '@/app/store/hooks/useSocket';
import { SOCKET_WORD_ROUTES } from '@/shared';
import { useEffect, useMemo, useState } from 'react';
import { setRoom } from '@/entities/room';
import { useParams } from 'react-router-dom';

export const WordPanel = ({ isOwner }: { isOwner: boolean }) => {
  const { socket } = useSocket();
  const [word, setWord] = useState<string>();
  const [isCorrectWord, setIsCorrectWord] = useState<boolean>(false);
  const { id } = useParams();

  const roomId: number = useMemo(() => {
    return Number(id);
  }, [id]);

  useEffect(() => {
    if (!roomId || !isOwner) return;

    //оставим это событие только овнеру
    socket.emit(SOCKET_WORD_ROUTES.CHOOSE_THEME, {
      roomId,
      // themeId: 1,
    });
  }, [socket, roomId, isOwner]);

  useEffect(() => {
    const newWordHandler = ({ word }: { word: string }) => {
      setWord(word);
      setIsCorrectWord(false);
    };

    socket.on(SOCKET_WORD_ROUTES.NEW_WORD, newWordHandler);

    return () => {
      socket.off(SOCKET_WORD_ROUTES.NEW_WORD, newWordHandler);
    };
  }, [socket]);

  useEffect(() => {
    socket.on(SOCKET_WORD_ROUTES.CORRECT_WORD, ({ user, message, room }) => {
      setIsCorrectWord(true);
      setRoom(room);
      alert(`${user} угадал слово: ${message}!`);
    });

    return () => {
      socket.off(SOCKET_WORD_ROUTES.CORRECT_WORD);
      socket.off(SOCKET_WORD_ROUTES.GET_WORD);
    };
  }, [socket, roomId, isCorrectWord]);

  return (
    <>
      <div className={`${styles.gameArea} ${isOwner ? '' : styles.hidden}`}>
        <p>{word}</p>
      </div>
    </>
  );
};
