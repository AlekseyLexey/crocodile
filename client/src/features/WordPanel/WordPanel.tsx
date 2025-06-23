import styles from "./WordPanel.module.scss";
import { useSocket } from "@/app/store/hooks/useSocket";
import { SOCKET_WORD_ROUTES } from "@/shared";
import { useEffect, useMemo, type FC } from "react";
import { setRoom } from "@/entities/room";
import { useParams } from "react-router-dom";
import { useAlert } from "@/shared/hooks/useAlert";

interface IWordPanelProps {
  isOwner: boolean;
  word: string;
}

export const WordPanel: FC<IWordPanelProps> = ({ isOwner, word }) => {
  const { showAlert } = useAlert();
  const { socket } = useSocket();

  const { id } = useParams();

  const roomId: number = useMemo(() => {
    return Number(id);
  }, [id]);

  useEffect(() => {
    socket.on(SOCKET_WORD_ROUTES.CORRECT_WORD, ({ user, message, room }) => {
      setRoom(room);
      showAlert(`${user} угадал слово: ${message}!`);
    });

    return () => {
      socket.off(SOCKET_WORD_ROUTES.CORRECT_WORD);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, roomId]);

  return (
    <>
      <div className={`${styles.gameArea} ${isOwner ? "" : styles.hidden}`}>
        <p>{word}</p>
      </div>
    </>
  );
};
