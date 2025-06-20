import { Button, Input } from "@/shared";
import styles from "./ProfilePage.module.scss";
import { useEffect, useState } from "react";
import { $api } from "@/shared/lib/axiosConfig";
import { useAlert } from "@/shared/hooks/useAlert";
import { useBackground } from "@/app/store/BackgroundContext";
import hareSvg from "@/assets/svg/animals/заяц.svg";
import hedgehogSvg from "@/assets/svg/animals/ёж.svg";
import polarBearSvg from "@/assets/svg/animals/медведьбелый.svg";

interface Product {
  id: number;
  name: string;
  price: number;
  category_id: number;
}

interface Game {
  id: number;
  score: number;
}

interface Room {
  id: number;
  name: string;
  createdAt: string;
}

interface FinishedGame {
  room: Room;
  point: number;
}

interface UserData {
  username: string;
  avatar: string;
  lastGames: Game[];
}

export const ProfilePage = () => {
  const { showAlert } = useAlert();
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [purchasedProducts, setPurchasedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState({
    products: false,
    games: false
  });
  const [showSection2, setShowSection2] = useState(false);
  const [finishedGames, setFinishedGames] = useState<FinishedGame[]>([]);
  const { setBackground } = useBackground();

  const [userData, setUserData] = useState<UserData>({
    username: "NoHomo",
    avatar: "",
    lastGames: [],
  });

  const fetchPurchasedProducts = async () => {
    try {
      setLoading(prev => ({...prev, products: true}));
      const response = await $api.get<{ 
        statusCode: number;
        data: { Product: Product }[] 
      }>("/buies/user");
      
      if (response.data.statusCode === 200) {
        const products = response.data.data.map(item => item.Product);
        setPurchasedProducts(products);
      }
    } catch (err) {
      showAlert(err instanceof Error ? err.message : "Ошибка загрузки купленных товаров");
    } finally {
      setLoading(prev => ({...prev, products: false}));
    }
  };

  const formaterData = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  useEffect(() => {
    setBackground("forest");
    
    const getFinishedUserGames = async () => {
      try {
        setLoading(prev => ({...prev, games: true}));
        const response = await $api.get<{ data: FinishedGame[] }>('user-room/finished');
        setFinishedGames(response.data?.data || []);
      } catch (error) {
        console.error('Error loading finished games:', error);
        setFinishedGames([]);
      } finally {
        setLoading(prev => ({...prev, games: false}));
      }
    };

    getFinishedUserGames();
  }, [setBackground]);

  const openAvatarModal = () => {
    fetchPurchasedProducts();
    setIsAvatarModalOpen(true);
  };

  const closeAvatarModal = () => {
    setIsAvatarModalOpen(false);
  };

  const selectAvatar = (product: Product) => {
    setUserData(prev => ({
      ...prev,
      avatar: product.name
    }));
    closeAvatarModal();
    showAlert("Аватар успешно изменен!");
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
      <img src={hareSvg} alt="Заяц" className={styles.hareDesktop} />
      <img src={hedgehogSvg} alt="Ёж" className={styles.hedgehogDesktop} />
      <img src={polarBearSvg} alt="Белый медведь" className={styles.polarBearDesktop} />
      
      <div className={`${styles.section1} ${showSection2 ? styles.hideSection1 : ''}`}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatarContainer}>
            {userData.avatar ? (
              <div className={styles.avatarImage}>{userData.avatar}</div>
            ) : (
              <div className={styles.avatarPlaceholder}>Аватарка</div>
            )}
            <button 
              onClick={openAvatarModal}
              className={styles.avatarChangeButton}
              aria-label="Change avatar"
            >
              +  
            </button>  
          </div>
        </div>
          
        <div className={styles.nickname}>{userData.username}</div>
        <div className={styles.password}> 
          <Input type="text" className={styles.input} labelText="Новое имя" />
          <Button type="submit" buttonText="Сохранить" className={styles.submitButton} /> 
        </div>
      </div>

      {isAvatarModalOpen && (
        <div className={styles.modalOverlay} onClick={closeAvatarModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Выберите купленный продукт в качестве аватарки</h2>
            <div className={styles.avatarsGrid}>
              {loading.products ? (
                <div>Загрузка товаров...</div>
              ) : purchasedProducts.length === 0 ? (
                <div>Вы пока ничего не купили</div>
              ) : (
                purchasedProducts.map((product: Product) => (
                  <div
                    key={product.id}
                    className={styles.avatarOption}
                    onClick={() => selectAvatar(product)}
                  >
                    <div className={styles.productAvatar}>
                      {product.name} - {product.price} руб.
                    </div>
                  </div>
                ))
              )}
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

      <div className={`${styles.section2} ${showSection2 ? styles.showSection2 : ''}`}>
        <h2 className={styles.sectionTitle}>Результаты прошлых игр</h2>
        <div className={styles.scrollContainer}>
          {loading.games ? (
            <div>Загрузка истории игр...</div>
          ) : finishedGames.length === 0 ? (
            <div>Нет данных о завершенных играх</div>
          ) : (
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};