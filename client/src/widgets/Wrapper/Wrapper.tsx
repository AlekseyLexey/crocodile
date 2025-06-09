import styles from "./Wrapper.module.scss";

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
