
import { createContext } from "react";
import  type { AlertContextType } from "../types/alertTypes";

export const AlertContext = createContext<AlertContextType | undefined>(undefined);