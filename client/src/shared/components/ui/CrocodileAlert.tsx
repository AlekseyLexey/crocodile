import { useEffect, useState } from "react";
import styles from "./CrocodileAlert.module.scss";
import type { AlertType } from "../../types/alertTypes";

interface CrocodileAlertProps {
  message: string;
  type?: AlertType;
}

export const CrocodileAlert = ({
  message,
  type = "success",
}: CrocodileAlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      <div className={styles.content}>
        <div className={styles.icon}>🐊</div>
        <span className={styles.text}>{message}</span>
      </div>
    </div>
  );
};