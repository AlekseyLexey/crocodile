import { useState } from 'react';
import { $api, Button, CLIENT_ROUTES } from '@/shared';
import styles from './CreateGameModal.module.scss';
import { ThemesSelect } from '@/features/Select/ThemesSelect';
import { useAppDispatch } from '@/shared';
import { createRoomThunk, getAllRoomThunk } from '@/entities/room/api/RoomApi';
import { useNavigate } from 'react-router-dom';

interface CreateGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateGameModal = ({ isOpen, onClose }: CreateGameModalProps) => {
  const [roomName, setRoomName] = useState<string>('');
  const [theme, setTheme] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const createRoom = async () => {
    const resCreate = await dispatch(createRoomThunk({ name: roomName }));

    if (createRoomThunk.rejected.match(resCreate)) {
      alert(resCreate.payload?.message);
      return null;
    }

    const roomId = resCreate.payload?.data?.id;

    const themeId = theme === 'all' ? null : Number(theme);

    await $api.post('/theme-room', { themeId, roomId });

    return roomId;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const roomId = await createRoom();
    if (!roomId) return;

    const res = await dispatch(getAllRoomThunk());

    if (getAllRoomThunk.rejected.match(res)) {
      alert(res.payload?.message);
      return;
    }

    navigate(`${CLIENT_ROUTES.GAME}/${roomId}`);

    setRoomName('');
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
          <ThemesSelect setTheme={setTheme} />

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
