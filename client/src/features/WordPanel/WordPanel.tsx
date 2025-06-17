import styles from "./WordPanel.module.scss";

interface IWordPanelProps {
  isOwner: boolean;
  word: string;
}

export const WordPanel: React.FC<IWordPanelProps> = ({ isOwner, word }) => {
  console.log("fired");

  return (
    <>
      <div className={`${styles.gameArea} ${isOwner ? "" : styles.hidden}`}>
        <p>{word}</p>
      </div>
    </>
  );
};
