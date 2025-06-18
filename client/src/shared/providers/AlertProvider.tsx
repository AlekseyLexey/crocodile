
import { useState } from "react";
import { AlertContext } from "../context/AlertContext";
import { CrocodileAlert } from "../components/ui/CrocodileAlert";
import {type  AlertState,  type AlertType } from "../types/alertTypes";

interface AlertProviderProps {
  children: React.ReactNode;
}

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alert, setAlert] = useState<AlertState | null>(null);

  const showAlert = (message: string, type: AlertType = "success") => {
    setAlert({ message, type });
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <CrocodileAlert
          message={alert.message}
          type={alert.type}
          duration={3000}
        />
      )}
    </AlertContext.Provider>
  );
};