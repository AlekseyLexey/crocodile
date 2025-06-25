import { useState } from "react";
import styles from "../../../pages/ProfilePage/ProfilePage.module.scss";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

interface ChangeNameProps {
  currentUsername: string;
  onUpdate: (newUsername: string) => Promise<void>;
  isLoading: boolean;
}

export const ChangeName = ({
  currentUsername,
  onUpdate,
  isLoading,
}: ChangeNameProps) => {
  const [newUsername, setNewUsername] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim()) return;
    await onUpdate(newUsername);
    setNewUsername("");
  };

  return (
    <>
      <div className={styles.nickname}>{currentUsername}</div>
      <div className={styles.password}>
        <Input
          type="text"
          className={styles.input}
          labelText="Новое имя"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          placeholder="Введите новое имя"
        />
        <Button
          type="submit"
          buttonText={isLoading ? "Сохранение..." : "Сохранить"}
          className={styles.submitButton}
          onClick={handleSubmit}
          disabled={isLoading || !newUsername.trim()}
        />
      </div>
    </>
  );
};
