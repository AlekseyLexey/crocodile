import React from "react";
import styles from "./Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
}

export const Input = ({ labelText, ...props }: InputProps) => {
  return (
    <div className={styles.inputWrapper}>
      <label>
        {labelText}
        <input {...props} />
      </label>
    </div>
  );
};
