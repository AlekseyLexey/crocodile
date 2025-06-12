import React from "react";
import { useCanvas } from "@/shared/hooks/useCanvas";
import { useFloodFill } from "@/shared/hooks/useFloodFill";

interface CanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export const CanvasComponent: React.FC<CanvasProps> = ({ canvasRef }) => {
  const { currentColor, activeTool, isDrawing, saveCanvasState } =
    useCanvas(canvasRef);

  const { floodFill } = useFloodFill(canvasRef);

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

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    saveCanvasState();

    if (canvasRef.current) {
      const dataURL = canvasRef.current.toDataURL();
      console.log("Canvas dataURL:", dataURL);
    }
  };

  return (
  <canvas
    ref={canvasRef}
    onMouseDown={startDrawing}
    onMouseUp={stopDrawing}
    onMouseMove={draw}
    onMouseLeave={stopDrawing}
    style={{
      cursor: activeTool === "fill" ? "pointer" : "default",
    }}
  />
);
};
