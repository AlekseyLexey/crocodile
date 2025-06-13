import styles from "./Tools.module.scss";
import pencilIcon from "@/assets/svg/карандаш.svg";
import fillIcon from "@/assets/svg/заливка.svg";
import clearIcon from "@/assets/svg/удалить все.svg";
import { useCanvas } from "@/shared/hooks/useCanvas";

export const Tools = () => {
  const { activeTool, changeTool, handleClearCanvas } = useCanvas();

  const handleToolChange = (tool: "pencil" | "fill" | "clear") => {
    changeTool(tool);
    if (tool === "clear") {
      handleClearCanvas();
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