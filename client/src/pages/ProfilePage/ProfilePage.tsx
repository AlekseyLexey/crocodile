import { Button, Input } from "@/shared";
import styles from "./ProfilePage.module.scss";
import { useEffect, useState } from "react";

export const ProfilePage = () => {
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
        <img src={userData.avatar}  className={styles.avatarContainer}/>
        {/* Пароли */}
        <div className={styles.password}>
                  
            
            <Input type="text"  className={styles.input} labelText="Имя" />
            <Input type="email"  className={styles.input} labelText="Email" />
            <Input type="password"  className={styles.input} labelText="Старый пароль" />
            <Input type="password"  className={styles.input} labelText="Новый пароль"/>
            <Button type="submit" buttonText="Сохранить" className={styles.submitButton} />
          
        </div>
      </div>

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
