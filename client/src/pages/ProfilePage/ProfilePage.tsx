import { $api, Button, Input, SOCKET_ROOM_ROUTES } from '@/shared';
import styles from './ProfilePage.module.scss';
import { useCallback, useEffect, useState } from 'react';
import type { IActiveUserRoom } from '@/entities/room/model';

export const ProfilePage = () => {
  // const [showSection2, setShowSection2] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [avatars, setAvatars] = useState<string[]>([]);
  const [showSection2, setShowSection2] = useState(false);
  const [gamesToShow, setGamesToShow] = useState(5);

  const [finishedGames, setFinishedGames] = useState<IActiveUserRoom[]>([]);

  const userData = {
    username: 'NoHomo',
    avatar: ' ',
    lastGames: [
      
    ],
  };

  useEffect(() => {
    const getFinishedUserGames = async () => {
      const finishedGames = await $api.get('user-room/finished');

      setFinishedGames(finishedGames.data.data);
    };

    getFinishedUserGames();
  }, []);

  const sortedGames = [...userData.lastGames]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, gamesToShow);

  const openAvatarModal = () => {
    setIsAvatarModalOpen(true);
    // Здесь можно загрузить доступные аватарки, если они подгружаются с сервера
  };

  const closeAvatarModal = () => {
    setIsAvatarModalOpen(false);
  };

  const selectAvatar = (avatarUrl: string) => {
    // Здесь можно добавить логику сохранения выбранной аватарки
    closeAvatarModal();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 50) {
          setShowSection2(true);
        } else {
          setShowSection2(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formaterData = useCallback((stringData: string): string => {
    const date = new Date(stringData);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());

    return `${day}-${month}-${year}`;
  }, []);

  return (
    <div className={styles.profile}>
      {/* Форма аватара имени и паролей */}
      <div
        className={`${styles.section1} ${
          showSection2 ? styles.hideSection1 : ''
        }`}
      >
        <div className={styles.avatarWrapper}>
          <div className={styles.avatarContainer}>
            <img src={userData.avatar} className={styles.avatarImage} />
            <button
              onClick={openAvatarModal}
              className={styles.avatarChangeButton}
              aria-label="Change avatar"
            >
              +
            </button>
          </div>
        </div>

        {/* Пароли */}
        <div className={styles.nickname}>{userData.username}</div>
        <div className={styles.password}>
          <Input type="text" className={styles.input} labelText="Новое имя" />
          <Button
            type="submit"
            buttonText="Сохранить"
            className={styles.submitButton}
          />
        </div>
      </div>

      {/* Модальное окно выбора аватарки */}
      {isAvatarModalOpen && (
        <div className={styles.modalOverlay} onClick={closeAvatarModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={styles.modalTitle}>Выберите аватарку</h2>
            <div className={styles.avatarsGrid}>
              {/* Здесь будут отображаться доступные аватарки */}
              {avatars.map((avatar, index) => (
                <div
                  key={index}
                  className={styles.avatarOption}
                  onClick={() => selectAvatar(avatar)}
                >
                  <img src={avatar} alt={`Avatar ${index}`} />
                </div>
              ))}

              {/* Пример добавления новой аватарки */}
              <div className={styles.avatarOption}>
                <div className={styles.addAvatar}>+</div>
              </div>
            </div>
            <button
              onClick={closeAvatarModal}
              className={styles.modalCloseButton}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

      {/* Форма последних игр */}
      <div
        className={`${styles.section2} ${
          showSection2 ? styles.showSection2 : ''
        }`}
      >
        <h2 className={styles.sectionTitle}>Результаты прошлых игр</h2>
        <div className={styles.scrollContainer}>
          {finishedGames &&
            finishedGames.map((game) => (
              <div className={styles.gamesHistory} key={game.room.id}>
                <div className={styles.results}>
                  Очки: {game.point}
                  <div>Игра: {game.room.name}</div>
                  <span className={styles.gameDate}>
                    {formaterData(game.room.createdAt)}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
