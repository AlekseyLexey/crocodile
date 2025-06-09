import type { FC } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText: string;
}

export const Button: FC<ButtonProps> = ({
  buttonText,
  className,
  ...props
}) => {
  return (
    <button className={`${styles.button} ${className}`} {...props}>
      {buttonText}
    </button>
  );
};
