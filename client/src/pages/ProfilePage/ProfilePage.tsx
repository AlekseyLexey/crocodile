import { Button, Input } from "@/shared";
import styles from "./ProfilePage.module.scss";

export const ProfilePage = () => {
  const userData = {
    username: "GamoTron",
    avatar: "https://example.com/avatar.jpg",
    lastGames: [
      { id: 1, date: "2023-05-15", score: 10},
      { id: 2, date: "2023-05-10", score: 8},
      { id: 3, date: "2023-05-05", score: 12},
    ],
  };

  return (
    <div className={styles.profile}>
      {/* Форма аватара имени и паролей */}
      <div className={styles.profileHeader}>
        <div className={styles.avatarContainer}>
          <img src={userData.avatar} alt="Аватар"/>
        </div>
        <h1 className={styles.username}>{userData.username}</h1>

        {/* Пароли */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Смена пароля</h2>
          <form>
            <Input type="text" placeholder="Имя" className={styles.input} />
            <Input type="password" placeholder="Старый пароль" className={styles.input} />
            <Input type="password" placeholder="Новый пароль" className={styles.input} />
            <Button type="submit" buttonText="Сохранить" className={styles.submitButton} />
          </form>
        </div>
      </div>

      {/* Форма последних игр */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Результаты прошлых игр</h2>
        <div className={styles.gamesHistory}>
          {userData.lastGames.map((game) => (
            <div key={game.id}>
              <div>{game.date}</div>
              <div>Очки: {game.score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
