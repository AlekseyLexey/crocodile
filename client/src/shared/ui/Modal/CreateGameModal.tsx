import { useState } from "react";
import { Button } from "@/shared";
import styles from "./CreateGameModal.module.scss";

interface CreateGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (roomName: string) => void;
}

export const CreateGameModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateGameModalProps) => {
  const [roomName, setRoomName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const resCreate = await onCreate(roomName);
    // const roomId = resCreate.payload?.data?.id;
    // const themeId = 1;

    // await $api.post("/theme-room", { roomId, themeId });
    // socket.emit(SOCKET_WORD_ROUTES.CHOOSE_THEME, {
    //   roomId,
    //   themeId,
    // });
    onCreate(roomName);

    setRoomName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Название комнаты</h2>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className={styles.roomInput}
            placeholder="Введите название комнаты"
            required
          />

          <div className={styles.buttonsContainer}>
            <Button
              type="button"
              onClick={onClose}
              buttonText="Отмена"
              className={styles.cancelButton}
            />
            <Button
              type="submit"
              buttonText="Создать игру"
              className={styles.createButton}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
