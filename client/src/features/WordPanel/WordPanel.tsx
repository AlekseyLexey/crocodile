import styles from "./WordPanel.module.scss";
import { useSocket } from "@/app/store/hooks/useSocket";
import { SOCKET_WORD_ROUTES } from "@/shared";
import { memo, useEffect, useMemo, useState } from "react";
import { setRoom } from "@/entities/room";
import { useParams } from "react-router-dom";
import { useAlert } from "@/shared/hooks/useAlert";


export const WordPanel = memo(({ isOwner }: { isOwner: boolean }) => {
  const { showAlert } = useAlert();
  const { socket } = useSocket();
  const [word, setWord] = useState<string>();
  const [isCorrectWord, setIsCorrectWord] = useState<boolean>(false);
  const { id } = useParams();

  const roomId: number = useMemo(() => {
    return Number(id);
  }, [id]);

  useEffect(() => {
    if (!roomId || !isOwner) return;

    socket.emit(SOCKET_WORD_ROUTES.CHOOSE_THEME, {
      roomId,
    });
  }, [socket, roomId, isOwner ]);

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
      showAlert(`${user} угадал слово: ${message}!`);
    });

    return () => {
      socket.off(SOCKET_WORD_ROUTES.CORRECT_WORD);
      socket.off(SOCKET_WORD_ROUTES.GET_WORD);
    };
  }, [socket, roomId, isCorrectWord , showAlert ]);

  return (
    <>
      <div className={`${styles.gameArea} ${isOwner ? "" : styles.hidden}`}>
        <p>{word}</p>
      </div>
    </>
  );
});
