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
      <button className={styles.logoutButton} {...props} onClick={onClick}>
        {buttonText}
      </button>
  );
};
