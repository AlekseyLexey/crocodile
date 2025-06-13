import React, { useEffect } from "react";
import { useCanvas } from "@/shared/hooks/useCanvas";
import { useFloodFill } from "@/shared/hooks/useFloodFill";
import { useSocket } from "@/app/store/hooks/useSocket";
import { useCanvasContext } from "@/app/store/hooks/useCanvasContext";

// const roomId = new Date().getMilliseconds();
const roomId = 1;

export const CanvasComponent: React.FC = () => {
  const { socket } = useSocket();
  const { canvasRef } = useCanvasContext();
  const { currentColor, activeTool, isDrawing, saveCanvasState } = useCanvas();

  const { floodFill } = useFloodFill();

  useEffect(() => {
    socket.on("draw", ({ figure }) => {
      drawing(figure.x, figure.y);
    });
    socket.on("finish", () => {
      console.log("finish");

      const ctx = canvasRef.current.getContext("2d");
      ctx.beginPath();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (activeTool === "pencil") {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = currentColor;
      isDrawing.current = true;
    } else if (activeTool === "fill") {
      floodFill(x, y, currentColor);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || !canvasRef.current || activeTool !== "pencil")
      return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    socket.emit("draw", {
      roomId,
      action: "draw",
      figure: {
        x,
        y,
      },
    });

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    socket.emit("draw", {
      roomId,
      action: "finish",
      figure: {},
    });
    saveCanvasState();
  };

  function drawing(x: number, y: number): void {
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseUp={stopDrawing}
      onMouseMove={draw}
      onMouseLeave={stopDrawing}
      style={{
        borderRadius: "12px",
        cursor: activeTool === "fill" ? "pointer" : "default",
      }}
    />
  );
};
