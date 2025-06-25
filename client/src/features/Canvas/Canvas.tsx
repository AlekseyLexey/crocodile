import React, { useEffect, useMemo, useLayoutEffect } from "react";
import { useSocket } from "@/app/store/hooks/useSocket";
import { useCanvasContext } from "@/app/store/hooks/useCanvasContext";
import { SOCKET_DRAW_ROUTES, useFloodFill, useCanvas, $api } from "@/shared";
import { useParams } from "react-router-dom";
import { getCursorPosition } from "./helpers/getCursorPosition";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useReduxHooks";
import {
  clearCanvas,
  setDimensions,
  setTool,
} from "@/entities/canvas/slice/canvasSlice";

interface CanvasProps {
  isOwner: boolean;
}

export const CanvasComponent: React.FC<CanvasProps> = ({ isOwner }) => {
  const { socket } = useSocket();
  const { canvasRef } = useCanvasContext();
  const { id } = useParams();
  const { baseSize, dimensions } = useAppSelector((state) => state.canvas);

  const roomId: number = useMemo(() => {
    return Number(id);
  }, [id]);
  const { currentColor, activeTool, isDrawing, saveCanvasState } =
    useCanvas(roomId);

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
    $api.get(`/picture/${roomId}`).then(({ data }) => {
      const img = new Image();
      img.src = data.data;

      img.onload = () => {
        canvasRef.current
          .getContext("2d")
          ?.drawImage(img, 0, 0, dimensions.width, dimensions.height);
      };
    });

    return () => resizeObserver.disconnect();
  }, [
    roomId,
    dispatch,
    canvasRef,
    canvasRef?.current?.parentElement?.clientWidth,
    canvasRef?.current?.parentElement?.clientHeight,
    dimensions.width,
    dimensions.height,
  ]);

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
      handleClearCanvasComponent();
    });

    return () => {
      socket.off(SOCKET_DRAW_ROUTES.DRAW);
      socket.off(SOCKET_DRAW_ROUTES.FILL);
      socket.off(SOCKET_DRAW_ROUTES.FINISH);
      socket.off(SOCKET_DRAW_ROUTES.CLEAR);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dimensions.width, dimensions.height]);

  const handleClearCanvasComponent = () => {
    if (!canvasRef?.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);
    const dataURL = canvasRef.current.toDataURL();
    $api.put(`/picture/${roomId}`, { pictures: dataURL });
    dispatch(clearCanvas());
    dispatch(setTool("pencil"));
  };

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

    const { dx, dy } = transformToBaseXY(x, y);

    socket.emit(SOCKET_DRAW_ROUTES.DRAW, {
      roomId,
      action: SOCKET_DRAW_ROUTES.DRAW,
      figure: {
        x: dx,
        y: dy,
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
    const { dx, dy } = getActualXY(x, y);
    ctx.lineTo(dx, dy);
    ctx.stroke();
  }

  function getActualXY(x: number, y: number) {
    const koefX = dimensions.width / baseSize.width;
    const koefY = dimensions.height / baseSize.height;

    const dx = x * koefX;
    const dy = y * koefY;

    return { dx, dy };
  }

  function transformToBaseXY(x: number, y: number) {
    const koefX = dimensions.width / baseSize.width;
    const koefY = dimensions.height / baseSize.height;

    const dx = x / koefX;
    const dy = y / koefY;

    return { dx, dy };
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
        touchAction: "none",
      }}
    />
  );
};
