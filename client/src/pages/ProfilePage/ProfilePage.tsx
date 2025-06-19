import { Button, Input } from "@/shared";
import styles from "./ProfilePage.module.scss";
import { useEffect, useState } from "react";

export const ProfilePage = () => {

  // const [showSection2, setShowSection2] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [avatars, setAvatars] = useState<string[]>([]);


  const [showSection2, setShowSection2] = useState(false);
  const userData = {
    username: "NoHomo",
    avatar: " ",
    lastGames: [
      { id: 1, score: 10},
      { id: 2, score: 8},
      { id: 3, score: 12},
      { id: 3, score: 12},
      { id: 3, score: 12},
  { id: 3, score: 12},
  { id: 3, score: 12},
  { id: 3, score: 12},
    ],
  };

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


  return (
    <div className={styles.profile}>
      {/* Форма аватара имени и паролей */}
      <div className={`${styles.section1} ${showSection2 ? styles.hideSection1 : ''}`}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatarContainer}>
            <img src={userData.avatar}  className={styles.avatarImage}/>
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
            <Input type="text"  className={styles.input} labelText="Новое имя" />
            <Button type="submit" buttonText="Сохранить" className={styles.submitButton} /> 
        </div>
      </div>

      {/* Модальное окно выбора аватарки */}
      {isAvatarModalOpen && (
        <div className={styles.modalOverlay} onClick={closeAvatarModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
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
      <div className={`${styles.section2} ${showSection2 ? styles.showSection2 : ''}`}>
        <h2 className={styles.sectionTitle}>Результаты прошлых игр</h2>
        <div className={styles.scrollContainer}>
            
          {userData.lastGames.map((game) => (
            <div className={styles.gamesHistory} key={game.id}>
              <div className={styles.results}> Очки: {game.score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
