
import { useBackground } from "@/app/store/BackgroundContext";
import styles from "./Wrapper.module.scss";

interface WrapperProps {
  children: React.ReactNode;
  isAuthPage?: boolean;
}

export const Wrapper = ({ children, isAuthPage = false }: WrapperProps) => {
  const { background } = useBackground();
  
  return (
    <div className={`${styles.wrapper} ${styles[background]} ${isAuthPage ? styles.authPage : ''}`}>
      {children}
    </div>
  );
};