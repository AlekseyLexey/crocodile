import { Button, Input } from "@/shared";
import styles from "./ProfilePage.module.scss";

export const ProfilePage = () => {
  const userData = {
    username: "NoHomo",
    avatar: "https://example.com/avatar.jpg",
    lastGames: [
      { id: 1, score: 10},
      { id: 2, score: 8},
      { id: 3, score: 12},
    ],
  };

  return (
    <div className={styles.profile}>
      {/* Форма аватара имени и паролей */}
      <div className={styles.section1}>
        <img src={userData.avatar} alt="Аватар" className={styles.avatarContainer}/>
        {/* Пароли */}
        <div className={styles.password}>
          {/* <h2 className={styles.sectionTitle}>Смена пароля</h2> */}
            
            
            <Input type="text" placeholder="Имя" className={styles.input} labelText="Имя" />
            <Input type="email" placeholder="Email" className={styles.input} labelText="Email" />
            <Input type="password" placeholder="Старый пароль" className={styles.input} labelText="Старый пароль" />
            <Input type="password" placeholder="Новый пароль" className={styles.input} labelText="Новый пароль"/>
            <Button type="submit" buttonText="Сохранить" className={styles.submitButton} />
          
        </div>
      </div>

      {/* Форма последних игр */}
      <div className={styles.section2}>
        <h2 className={styles.sectionTitle}>Результаты прошлых игр</h2>
        <div className={styles.gamesHistory}>
            
          {userData.lastGames.map((game) => (
            <div key={game.id}>
              <div className={styles.results}>Очки: {game.score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
