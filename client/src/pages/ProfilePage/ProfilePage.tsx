import { Button, Input } from "@/shared";
import styles from "./ProfilePage.module.scss";
import { useEffect, useState } from "react";
import { $api } from "@/shared/lib/axiosConfig";
import { useAlert } from "@/shared/hooks/useAlert";

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

interface UserData {
  username: string;
  avatar: string;
  lastGames: Game[];
}

export const ProfilePage = () => {
  const { showAlert } = useAlert();
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [purchasedProducts, setPurchasedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSection2, setShowSection2] = useState(false);
  
  const [userData, setUserData] = useState<UserData>({
    username: "NoHomo",
    avatar: "",
    lastGames: [
      { id: 1, score: 10 },
      { id: 2, score: 8 },
      { id: 3, score: 12 },
      { id: 4, score: 12 },
      { id: 5, score: 12 },
      { id: 6, score: 12 },
      { id: 7, score: 12 },
    ],
  });

  const fetchPurchasedProducts = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

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
      {/* Форма аватара имени и паролей */}
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
              {loading ? (
                <div>Загрузка...</div>
              ) : purchasedProducts.length === 0 ? (
                <div >Вы пока ничего не купили </div>
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
          {userData.lastGames.map((game: Game) => (
            <div className={styles.gamesHistory} key={game.id}>
              <div className={styles.results}> Очки: {game.score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};