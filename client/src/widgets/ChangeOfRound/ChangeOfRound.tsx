import {
  Button,
  SOCKET_STATUS_ROUTES,
  useAppDispatch,
  useAppSelector,
} from "@/shared";
import styles from "../Finish/Finish.module.scss";
import { useEffect, useMemo } from "react";
import { useSocket } from "@/app/store/hooks/useSocket";
import { setTime } from "@/entities/room/slice/RoomSlice";
import { useParams } from "react-router-dom";

export const ChangeOfRound = () => {
  const { room, time } = useAppSelector((state) => state.room);
  const dispatch = useAppDispatch();
  const { socket } = useSocket();
  const { id } = useParams();

  const roomId: number = useMemo(() => {
    return Number(id);
  }, [id]);

  useEffect(() => {
    socket.on("timer", ({ time }) => {
      if (time === null) {
        socket.emit(SOCKET_STATUS_ROUTES.START, { roomId });
        dispatch(setTime(null));
        return;
      }

      const seconds = Math.round(time / 1000);
      console.log("time", seconds);

      dispatch(setTime(seconds));
    });

    return () => {
      socket.off("timer");
    };
  }, [dispatch, socket, roomId]);

  const handleChangeGame = () => {
    socket.emit(SOCKET_STATUS_ROUTES.START, {
      roomId,
    });
  };

  return (
    <div>
      <h2>Раунд завершенн</h2>
      <div className={styles.resultsTable}>
        <div className={styles.tableHeader}>
          <span>Место </span>
          <span>Игрок </span>
          <span>Очки </span>
        </div>

        {room?.roomUsers
          .toSorted((a, b) => b.UserRoom.point - a.UserRoom.point)
          .map((player, index) => (
            <div key={player.id} className={styles.playerRow}>
              <span className={styles.position}>{index + 1}</span>
              <span className={styles.username}>{player.username}</span>
              <span className={styles.score}>{player.UserRoom.point}</span>
            </div>
          ))}
      </div>
      <h3>Таймер: {time} сек</h3>
      <Button buttonText="Завершить раунд" onClick={handleChangeGame} />
    </div>
  );
};
