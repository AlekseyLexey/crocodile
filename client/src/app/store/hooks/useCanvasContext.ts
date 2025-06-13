import { useContext } from "react";
import CanvasContext from "../CanvasContex";

export const useCanvasContext = () => {
  const context = useContext(CanvasContext);
  return context;
};
