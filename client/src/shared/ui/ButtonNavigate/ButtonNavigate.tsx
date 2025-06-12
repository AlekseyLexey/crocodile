import type { FC } from "react";
import styles from "./ButtonNavigate.module.scss";

interface ButtonNavigateProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText: string;
  onClick(): void;
}

export const ButtonNavigate: FC<ButtonNavigateProps> = ({
  buttonText,
  onClick,
  ...props
}) => {
  return (
    <div className={styles.logoutContainer} onClick={onClick}>
      <button className={styles.logoutButton} {...props}>
        {buttonText}
      </button>
    </div>
  );
};
