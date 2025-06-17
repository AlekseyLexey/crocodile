import styles from "@/pages/GamePage/GamePage.module.scss";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useReduxHooks";
import { selectCanvas, setColor } from "@/entities/canvas/slice/canvasSlice";
import { useSocket } from "@/app/store/hooks/useSocket";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

export const ColorsPanel = () => {
  const dispatch = useAppDispatch();
  const { currentColor } = useAppSelector(selectCanvas);
  const { socket } = useSocket();
  const { id } = useParams();

  const roomId: number = useMemo(() => {
    return Number(id);
  }, [id]);

  const colorPairs = [
    ["#FF0000", "#FF6200"],
    ["#0EA700", "#FFD900"],
    ["#FF007B", "#ffffff"],
    ["#0004FF", "#00D9FF"],
    ["#613528", "#000000"],
  ];

  const handleSetColor = (color: string): void => {
    socket.emit("color", {
      roomId,
      color,
    });
    dispatch(setColor(color));
  };

  return (
    <div className={styles.colorsPanel}>
      {colorPairs.map((pair, index) => (
        <div key={index} className={styles.colorRow}>
          <div className={styles.colorPair}>
            {pair.map((color) => (
              <div
                key={color}
                className={`${styles.color} ${
                  currentColor === color ? styles.selected : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleSetColor(color)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
