import { useState } from "react";
import { AlertContext } from "../context/AlertContext";
import { CrocodileAlert } from "../components/ui/CrocodileAlert";
import type { AlertState, AlertType } from "../types/alertTypes";

interface AlertProviderProps {
  children: React.ReactNode;
}

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alerts, setAlerts] = useState<AlertState[]>([]);

  const showAlert = (message: string, type: AlertType = "success") => {
    const id = Date.now().toString();
    setAlerts(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== id));
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <div className="alerts-container">
        {alerts.map((alert) => (
          <CrocodileAlert
            key={alert.id}
            message={alert.message}
            type={alert.type}
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
};