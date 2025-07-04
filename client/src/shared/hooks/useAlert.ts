
import { useContext } from "react";
import { AlertContext } from "../context/AlertContext";
import  type { AlertContextType } from "../types/alertTypes";

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};