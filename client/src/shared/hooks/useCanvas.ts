import { useCallback, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useReduxHooks";
import {
  selectCanvas,
  saveCanvas,
  setTool,
  clearCanvas,
} from "@/entities/canvas/slice/canvasSlice";
import { useCanvasContext } from "@/app/store/hooks/useCanvasContext";

type ToolType = "pencil" | "fill" | "clear";

export const useCanvas = () => {
  const { canvasRef } = useCanvasContext();
  const dispatch = useAppDispatch();
  const { currentColor, activeTool, dimensions } = useAppSelector(selectCanvas);
  const isDrawing = useRef(false);

  useEffect(() => {
    if (!canvasRef?.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (
    canvas.width !== dimensions.width ||
    canvas.height !== dimensions.height
  ) {
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 3;
    ctx.strokeStyle = currentColor;
    ctx.fillStyle = currentColor;
  }, [dimensions, currentColor, canvasRef]);

  const saveCanvasState = useCallback(() => {
    if (!canvasRef?.current) return;
    const dataURL = canvasRef.current.toDataURL();
    dispatch(saveCanvas(dataURL));
  }, [dispatch, canvasRef]);

  const handleClearCanvas = useCallback(() => {
    if (!canvasRef?.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    ctx.fillStyle = "#FFF5F5";
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);
    dispatch(clearCanvas());
    dispatch(setTool("pencil"));
  }, [dispatch, dimensions, canvasRef]);

  const changeTool = useCallback(
    (tool: ToolType) => {
      dispatch(setTool(tool));
    },
    [dispatch]
  );

  return {
    currentColor,
    activeTool,
    isDrawing,
    saveCanvasState,
    handleClearCanvas,
    changeTool,
    dimensions,
  };
};
