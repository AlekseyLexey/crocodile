import { useBackground } from "@/app/store/BackgroundContext";
import styles from "./Wrapper.module.scss";

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { background } = useBackground();
  
  return (
    <div className={`${styles.wrapper} ${styles[background]}`}>
      {children}
    </div>
  );
};