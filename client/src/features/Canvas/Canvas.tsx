import React, { useEffect, useMemo, useLayoutEffect } from "react";
import { useSocket } from "@/app/store/hooks/useSocket";
import { useCanvasContext } from "@/app/store/hooks/useCanvasContext";
import { SOCKET_DRAW_ROUTES, useFloodFill, useCanvas, $api } from "@/shared";
import { useParams } from "react-router-dom";
import { getCursorPosition } from "./helpers/getCursorPosition";
import { useAppDispatch } from "@/shared/hooks/useReduxHooks";
import { setDimensions } from "@/entities/canvas/slice/canvasSlice";

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
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    const updateCanvasSize = () => {
      if (!canvasRef.current?.parentElement) return;

      const { width, height } =
        canvasRef.current.parentElement.getBoundingClientRect();
      dispatch(
        setDimensions({
          width: Math.floor(width),
          height: Math.floor(height),
        })
      );
    };

    updateCanvasSize();
    const resizeObserver = new ResizeObserver(updateCanvasSize);
    if (canvasRef.current?.parentElement) {
      resizeObserver.observe(canvasRef.current.parentElement);
    }

    return () => resizeObserver.disconnect();
  }, [dispatch, canvasRef]);

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

    $api.get(`/picture/${roomId}`).then(({ data }) => {
      const img = new Image();
      img.src = data.data;

      img.onload = () => {
        canvasRef.current.getContext("2d")?.drawImage(img, 0, 0);
      };
    });

    return () => {
      socket.off(SOCKET_DRAW_ROUTES.DRAW);
      socket.off(SOCKET_DRAW_ROUTES.FILL);
      socket.off(SOCKET_DRAW_ROUTES.FINISH);
      socket.off(SOCKET_DRAW_ROUTES.CLEAR);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    isDrawing.current = true;

    const { x, y } = getCursorPosition(e, canvasRef);

    if (activeTool === SOCKET_DRAW_ROUTES.PENCIL) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = currentColor;
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

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
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

    $api.put(`/picture/${roomId}`, { pictures: canvasRef.current.toDataURL() });
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
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
      style={{
        borderRadius: "12px",
        cursor: activeTool === SOCKET_DRAW_ROUTES.FILL ? "pointer" : "default",
        ...(isOwner ? {} : { pointerEvents: "none" }),
        backgroundColor: "#FFF5F5",
        touchAction: "none",
      }}
    />
  );
};
