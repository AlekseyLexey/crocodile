import styles from "./ProfilePage.module.scss";
import { useEffect, useState } from "react";
import { $api } from "@/shared/lib/axiosConfig";
import { useAlert } from "@/shared/hooks/useAlert";
import { useBackground } from "@/app/store/BackgroundContext";
import hareSvg from "@/assets/svg/animals/заяц.svg";
import hedgehogSvg from "@/assets/svg/animals/ёж.svg";
import polarBearSvg from "@/assets/svg/animals/медведьбелый.svg";
import { FinishedGames } from "@/shared/ui/FinishedGames/FinishedGames";
import { ChangeName } from "@/shared/ui/ChangeName/ChangeName";

interface Product {
  id: number;
  name: string;
  price: number;
  category_id: number;
}

interface UserData {
  username: string;
  avatar: string;
}

export const ProfilePage = () => {
  const { showAlert } = useAlert();
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [purchasedProducts, setPurchasedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState({
    products: false,
    games: false,
  });

  const { setBackground } = useBackground();

  const [userData, setUserData] = useState<UserData>({
    username: "NoHomo",
    avatar: "",
  });

  const fetchPurchasedProducts = async () => {
    try {
      setLoading((prev) => ({ ...prev, products: true }));
      const response = await $api.get<{
        statusCode: number;
        data: { Product: Product }[];
      }>("/buies/user");

      if (response.data.statusCode === 200) {
        const products = response.data.data.map((item) => item.Product);
        setPurchasedProducts(products);
      }
    } catch (err) {
      showAlert(
        err instanceof Error ? err.message : "Ошибка загрузки купленных товаров"
      );
    } finally {
      setLoading((prev) => ({ ...prev, products: false }));
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
    setUserData((prev) => ({
      ...prev,
      avatar: product.name,
    }));
    closeAvatarModal();
    showAlert("Аватар успешно изменен!");
  };

  useEffect(() => {
    setBackground("forest");
  }, [setBackground]);

  return (
    <div className={styles.profile}>
      <img src={hareSvg} alt="Заяц" className={styles.hareDesktop} />
      <img src={hedgehogSvg} alt="Ёж" className={styles.hedgehogDesktop} />
      <img
        src={polarBearSvg}
        alt="Белый медведь"
        className={styles.polarBearDesktop}
      />

      <div className={styles.section1}>
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
        <ChangeName />
      </div>

      {isAvatarModalOpen && (
        <div className={styles.modalOverlay} onClick={closeAvatarModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={styles.modalTitle}>
              Выберите купленный продукт в качестве аватарки
            </h2>
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
      <FinishedGames />
    </div>
  );
};
