import { Button } from "@/shared/ui/Button/Button";
import styles from "./GamePage.module.scss";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useReduxHooks";
import { CanvasComponent } from "@/shared/ui/Canvas/Canvas";
import {
  selectCanvas,
  setColor,
  setTool,
  clearCanvas,
} from "@/entities/canvas/slice/canvasSlice";
import { Tools } from "@/shared/ui/Tools/Tools";

export const GamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useAppDispatch();
  const { currentColor, activeTool, dimensions } = useAppSelector(selectCanvas);

  const colorPairs = [
    ["#FF0000", "#FF6200"],
    ["#0EA700", "#FFD900"],
    ["#FF007B", "#B700FF"],
    ["#0004FF", "#00D9FF"],
    ["#613528", "#000000"],
  ];

  const handleClear = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    ctx.fillStyle = "#FFF5F5";
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);
    dispatch(clearCanvas());
    dispatch(setTool("pencil"));
  };

  const handleToolChange = (tool: "pencil" | "fill" | "clear") => {
    dispatch(setTool(tool));
    if (tool === "clear") {
      handleClear();
    }
  };

  return (
    <div className={styles.game}>
      <div className={styles.container}>
        <Button buttonText="Выйти из игры" className={styles.exitButton} />

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
                    onClick={() => dispatch(setColor(color))}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.gameArea}></div>
        <div className={styles.canvas}>
          <CanvasComponent canvasRef={canvasRef} />
        </div>
        <div className={styles.timer}>00:30</div>
        <Tools activeTool={activeTool} handleToolChange={handleToolChange} />
        <div className={styles.sidebar}></div>
        <div className={styles.chat}></div>
      </div>
    </div>
  );
};
