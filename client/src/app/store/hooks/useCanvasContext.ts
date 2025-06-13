import { useContext } from "react";
import CanvasContext from "../CanvasContex";
import type { CanvasContextType } from "../CanvasContex";

export const useCanvasContext = (): CanvasContextType => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error("useCanvasContext must be used within a CanvasProvider");
  }
  return context;
};