import styles from "./Tools.module.scss";
import pencilIcon from "@/assets/svg/карандаш.svg";
import fillIcon from "@/assets/svg/заливка.svg";
import clearIcon from "@/assets/svg/удалить все.svg";
import { useCanvas } from "@/shared/hooks/useCanvas";
import { useSocket } from "@/app/store/hooks/useSocket";
import { $api, SOCKET_DRAW_ROUTES } from "@/shared";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { useCanvasContext } from "@/app/store/hooks/useCanvasContext";

export const Tools = () => {
  const { canvasRef } = useCanvasContext();
  const { socket } = useSocket();
  const { id } = useParams();

  const roomId: number = useMemo(() => {
    return Number(id);
  }, [id]);

  const { activeTool, changeTool, handleClearCanvas } = useCanvas(roomId);

  const handleToolChange = (tool: "pencil" | "fill" | "clear") => {
    changeTool(tool);
    if (tool === "clear") {
      socket.emit(SOCKET_DRAW_ROUTES.DRAW, {
        roomId,
        action: SOCKET_DRAW_ROUTES.CLEAR,
        figure: {},
      });
      handleClearCanvas();
      $api.put(`/picture/${roomId}`, {
        pictures: canvasRef.current.toDataURL(),
      });
    }
  };

  return (
    <div className={styles.tools}>
      <button
        className={`${styles.toolButton} ${
          activeTool === "pencil" ? styles.activeTool : ""
        }`}
        onClick={() => handleToolChange("pencil")}
      >
        <img src={pencilIcon} alt="Карандаш" className={styles.toolIcon} />
      </button>
      <button
        className={`${styles.toolButton} ${
          activeTool === "fill" ? styles.activeTool : ""
        }`}
        onClick={() => handleToolChange("fill")}
      >
        <img src={fillIcon} alt="Заливка" className={styles.toolIcon} />
      </button>
      <button
        className={`${styles.toolButton} ${
          activeTool === "clear" ? styles.activeTool : ""
        }`}
        onClick={() => handleToolChange("clear")}
      >
        <img src={clearIcon} alt="Очистить" className={styles.toolIcon} />
      </button>
    </div>
  );
};
