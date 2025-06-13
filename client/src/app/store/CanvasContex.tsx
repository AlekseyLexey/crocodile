import { createContext } from "react";

type CanvasContextType = {
  canvasRef: HTMLCanvasElement;
};

const CanvasContext = createContext<CanvasContextType | null>(null);

export default CanvasContext;
