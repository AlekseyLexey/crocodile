import { useRef } from "react";
import type { RefObject } from "react";
import CanvasContext, { type CanvasContextType } from "./CanvasContex";

export function CanvasProvider({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const value: CanvasContextType = {
    canvasRef: canvasRef as RefObject<HTMLCanvasElement>,
  };

  return (
    <CanvasContext.Provider value={value}>
      {children}
    </CanvasContext.Provider>
  );
}