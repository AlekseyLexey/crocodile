import styles from "./WordPanel.module.scss";
import { useSocket } from "@/app/store/hooks/useSocket";
import { SOCKET_WORD_ROUTES } from "@/shared";
import { useEffect, useState } from "react";
import { setRoom } from "@/entities/room";
import { useParams } from "react-router-dom";

export const WordPanel = ({ isOwner }: { isOwner: boolean }) => {
  const { socket } = useSocket();
  const [word, setWord] = useState<string>();
  const [isCorrectWord, setIsCorrectWord] = useState<boolean>(false);
  const { id: roomId } = useParams();

  useEffect(() => {
    //тестово пока тема всегда 1, потом это событие по факту лучше в создание румы?
    //эту шляпу нужно переместить на кнопку создания комнаты, пока тут для теста - обновляет слово, что нам не нужно!!!
    socket.emit(SOCKET_WORD_ROUTES.CHOOSE_THEME, { roomId, themeId: 1 });

    socket.on(SOCKET_WORD_ROUTES.NEW_WORD, (randomWord) => {
      setWord(randomWord);
      setIsCorrectWord(false);
    });

    return () => {
      socket.off(SOCKET_WORD_ROUTES.NEW_WORD);
    };
  }, [socket, roomId]);

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
      <div className={`${styles.gameArea} ${isOwner ? "" : styles.hidden}`}>
        <p>{word}</p>
      </div>
    </>
  );
};
