// src/shared/components/ui/CrocodileAlert.tsx
import { useEffect, useState } from "react";
import styles from "./CrocodileAlert.module.scss";
import  type { AlertType } from "../../types/alertTypes";

interface CrocodileAlertProps {
  message: string;
  duration?: number;
  type?: AlertType;
}

export const CrocodileAlert = ({
  message,
  duration = 4000,
  type = "success",
}: CrocodileAlertProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!isVisible || !message) return null;

  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      <div className={styles.content}>
        <div className={styles.icon}>🐊</div>
        <span className={styles.text}>{message}</span>
      </div>
    </div>
  );
};