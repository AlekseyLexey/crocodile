import { createContext } from "react";
import type { RefObject } from "react";

export type CanvasContextType = {
  canvasRef: RefObject<HTMLCanvasElement>;
};

const CanvasContext = createContext<CanvasContextType | null>(null);

export default CanvasContext;
