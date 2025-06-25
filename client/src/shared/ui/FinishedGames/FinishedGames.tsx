import { useEffect, useState } from "react";
import styles from "../../../pages/ProfilePage/ProfilePage.module.scss";
import { $api } from "@/shared/lib/axiosConfig";



interface FinishedGame {
  room: Room;
  point: number;
}

interface Room {
  id: number;
  name: string;
  createdAt: string;
}



export const FinishedGames = () => {
  const [loading, setLoading] = useState({
    games: false,
  });
  const [finishedGames, setFinishedGames] = useState<FinishedGame[]>([]);
  const [showSection2, setShowSection2] = useState(false);

  const formaterData = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
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

    const getFinishedUserGames = async () => {
      try {
        setLoading((prev) => ({ ...prev, games: true }));
        const response = await $api.get<{ data: FinishedGame[] }>(
          "user-room/finished"
        );
        setFinishedGames(response.data?.data || []);
      } catch (error) {
        console.error("Error loading finished games:", error);
        setFinishedGames([]);
      } finally {
        setLoading((prev) => ({ ...prev, games: false }));
      }
    };

    getFinishedUserGames();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`${styles.section2} ${
        showSection2 ? styles.showSection2 : ""
      }`}
    >
      <h2 className={styles.sectionTitle}>Результаты прошлых игр</h2>

      <div className={styles.scrollContainer}>
        {loading.games ? (
          <div>Загрузка истории игр...</div>
        ) : finishedGames.length === 0 ? (
          <div className={styles.noInfo}>Нет данных о завершенных играх</div>
        ) : (
          finishedGames.map((game) => (
            <div className={styles.gamesHistory} key={game.room.id}>
              <div className={styles.results}>
                <div className={styles.finishedGamePoints}>Очки: {game.point}</div>
                <div className={styles.finishedGameName}>Игра: {game.room.name}</div>
                <div className={styles.gameDate}>
                  {formaterData(game.room.createdAt)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
