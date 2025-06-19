import React, { useEffect, useMemo } from "react";
import { useSocket } from "@/app/store/hooks/useSocket";
import { useCanvasContext } from "@/app/store/hooks/useCanvasContext";
import { SOCKET_DRAW_ROUTES, useFloodFill, useCanvas } from "@/shared";
import { useParams } from "react-router-dom";
import { getCursorPosition } from "./helpers/getCursorPosition";

interface CanvasProps {
  isOwner: boolean;
}

export const CanvasComponent: React.FC<CanvasProps> = ({ isOwner }) => {
  const { socket } = useSocket();
  const { canvasRef } = useCanvasContext();
  const {
    currentColor,
    activeTool,
    isDrawing,
    saveCanvasState,
    handleClearCanvas,
  } = useCanvas();
  const { id } = useParams();

  const roomId: number = useMemo(() => {
    return Number(id);
  }, [id]);

  const { floodFill } = useFloodFill();

  useEffect(() => {
    socket.on(SOCKET_DRAW_ROUTES.DRAW, ({ figure }) => {
      drawing(figure.x, figure.y);
    });
    socket.on(SOCKET_DRAW_ROUTES.FILL, ({ figure }) => {
      floodFill(figure.x, figure.y, figure.currentColor);
    });
    socket.on(SOCKET_DRAW_ROUTES.FINISH, () => {
      const ctx = canvasRef.current.getContext("2d");
      ctx!.beginPath();
    });
    socket.on(SOCKET_DRAW_ROUTES.CLEAR, () => {
      handleClearCanvas();
    });

    return () => {
      socket.off(SOCKET_DRAW_ROUTES.DRAW);
      socket.off(SOCKET_DRAW_ROUTES.FILL);
      socket.off(SOCKET_DRAW_ROUTES.FINISH);
      socket.off(SOCKET_DRAW_ROUTES.CLEAR);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCursorPosition(e, canvasRef);

    if (activeTool === SOCKET_DRAW_ROUTES.PENCIL) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = currentColor;
      isDrawing.current = true;
    } else if (activeTool === SOCKET_DRAW_ROUTES.FILL) {
      socket.emit(SOCKET_DRAW_ROUTES.DRAW, {
        roomId,
        action: SOCKET_DRAW_ROUTES.FILL,
        figure: {
          x,
          y,
          currentColor,
        },
      });
      floodFill(x, y, currentColor);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (
      !isDrawing.current ||
      !canvasRef.current ||
      activeTool !== SOCKET_DRAW_ROUTES.PENCIL
    )
      return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCursorPosition(e, canvasRef);

    socket.emit(SOCKET_DRAW_ROUTES.DRAW, {
      roomId,
      action: SOCKET_DRAW_ROUTES.DRAW,
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
    socket.emit(SOCKET_DRAW_ROUTES.DRAW, {
      roomId,
      action: SOCKET_DRAW_ROUTES.FINISH,
      figure: {},
    });
    saveCanvasState();
  };

  function drawing(x: number, y: number): void {
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
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
        cursor: activeTool === SOCKET_DRAW_ROUTES.FILL ? "pointer" : "default",
        ...(isOwner ? {} : { pointerEvents: "none" }),
        backgroundColor: "#FFF5F5",
      }}
    />
  );
};
