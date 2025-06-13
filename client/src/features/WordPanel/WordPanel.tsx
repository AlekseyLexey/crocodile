import styles from "./WordPanel.module.scss";
import { useSocket } from "@/app/store/hooks/useSocket";
import { useAppSelector } from "@/shared";
import { useEffect, useState } from "react";

export const WordPanel = ({ isOwner }: { isOwner: boolean }) => {
  const { socket } = useSocket();
  const roomId = useAppSelector((state) => state.room.room?.id);
  const [word, setWord] = useState<string>();
  const [isCorrectWord, setIsCorrectWord] = useState<boolean>(false);

  useEffect(() => {
    //тестово пока тема всегда 1, потом это событие по факту лучше в создание румы?
    //эту шляпу нужно переместить на кнопку создания комнаты, пока тут для теста - обновляет слово, что нам не нужно!!!
    socket.emit("chooseTheme", { roomId, themeId: 1 });

    socket.on("newWord", (randomWord) => {
      setWord(randomWord);
      setIsCorrectWord(false);
    });

    return () => {
      socket.off("newWord");
    };
  }, [socket, roomId]);

  useEffect(() => {
    socket.on("correctWord", ({ user, message }) => {
      setIsCorrectWord(true);
      alert(`${user} угадал слово: ${message}!`);
    });

    return () => {
      socket.off("correctWord");
      socket.off("getWord");
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
