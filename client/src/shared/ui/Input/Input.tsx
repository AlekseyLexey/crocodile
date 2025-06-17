import React from "react";
import styles from "./Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  error?: string;
}

export const Input = ({ labelText, error, ...props }: InputProps) => {
  return (
    <div className={styles.inputWrapper}>
      <label>
        {labelText}
        <input {...props} />
        {error && <span className={styles.error}>{error}</span>}
      </label>
    </div>
  );
};