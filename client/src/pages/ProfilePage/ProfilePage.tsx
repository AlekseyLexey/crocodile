import { useEffect, useState } from 'react';
import styles from './ProfilePage.module.scss';
import { useAlert } from '@/shared/hooks/useAlert';
import { useBackground } from '@/app/store/BackgroundContext';
import hareSvg from '@/assets/svg/animals/заяц.svg';
import hedgehogSvg from '@/assets/svg/animals/ёж.svg';
import polarBearSvg from '@/assets/svg/animals/медведьбелый.svg';
import { FinishedGames } from '@/shared/ui/FinishedGames/FinishedGames';
import { ChangeName } from '@/shared/ui/ChangeName/ChangeName';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useReduxHooks';
import { $api, Button } from '@/shared';
import { updateUserThunk } from '@/entities/user/api/UserApi';
import defaultAvatarSvg from '@/assets/svg/заливка.svg';
import type { IUser } from '@/entities/user';

interface Purchase {
  id: number;
  product_id: number;
  user_id: number;
  is_active: boolean;
  Product: Product;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category_id: number;
}

export const ProfilePage = () => {
  const { showAlert } = useAlert();
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [purchasedProducts, setPurchasedProducts] = useState<Purchase[]>([]);
  const [activeAvatar, setActiveAvatar] = useState<Purchase | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<Purchase | null>(null);
  const [loading, setLoading] = useState({
    products: false,
    games: false,
    avatar: false,
  });
  const [actualUser, setActualUser] = useState<IUser | null>(null);

  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.user);
  const { setBackground } = useBackground();

  const fetchPurchasedProducts = async () => {
    try {
      setLoading((prev) => ({ ...prev, products: true }));
      const response = await $api.get<{
        statusCode: number;
        data: Purchase[];
      }>('/buies/user/avatars');

      if (response.data.statusCode === 200) {
        setPurchasedProducts(response.data.data);
        console.log('response.data.data ===>', response.data.data);
      }
    } catch (err) {
      showAlert(
        err instanceof Error ? err.message : 'Ошибка загрузки купленных товаров'
      );
    } finally {
      setLoading((prev) => ({ ...prev, products: false }));
    }
  };

  const fetchActiveAvatar = async () => {
    try {
      const response = await $api.get<{
        statusCode: number;
        data: Purchase;
      }>('/buies/active/avatar');

      console.log('response ===>', response);

      if (response.data.statusCode === 200) {
        setActiveAvatar(response.data.data);
        console.log('activeAvatar ===>', activeAvatar);
      }
    } catch (err) {
      console.log('Нет активного аватара', err);
    }
  };

  const openAvatarModal = async () => {
    try {
      await fetchPurchasedProducts();
      await fetchActiveAvatar();
      setIsAvatarModalOpen(true);
    } catch (err) {
      showAlert('Ошибка при загрузке данных аватара');
      console.log('Ошибка при загрузке данных аватара', err);
    }
  };

  const closeAvatarModal = () => {
    setIsAvatarModalOpen(false);
    setSelectedAvatar(null);
  };

  const handleAvatarSelect = (purchase: Purchase) => {
    setSelectedAvatar(purchase);
  };

  const handleSaveAvatar = async () => {
    if (!selectedAvatar) return;

    try {
      setLoading((prev) => ({ ...prev, avatar: true }));

      // Deactivate current avatar if exists
      if (activeAvatar) {
        await $api.patch(`/buies/deactivate/${activeAvatar.id}`);
      }

      // Activate new avatar
      await $api.patch(`/buies/activate/${selectedAvatar.id}`);

      setActiveAvatar(selectedAvatar);
      showAlert(`Аватар "${selectedAvatar.Product.name}" сохранён!`);
      closeAvatarModal();
    } catch (err) {
      showAlert(
        err instanceof Error ? err.message : 'Ошибка при сохранении аватара'
      );
    } finally {
      setLoading((prev) => ({ ...prev, avatar: false }));
    }
  };

  const handleDeactivateAvatar = async () => {
    if (!activeAvatar) return;

    try {
      setLoading((prev) => ({ ...prev, avatar: true }));
      await $api.patch(`/buies/deactivate/${activeAvatar.id}`);
      setActiveAvatar(null);
      showAlert('Аватар деактивирован!');
      closeAvatarModal();
    } catch (err) {
      showAlert(
        err instanceof Error ? err.message : 'Ошибка при деактивации аватара'
      );
    } finally {
      setLoading((prev) => ({ ...prev, avatar: false }));
    }
  };

  const handleUpdateUsername = async (newUsername: string) => {
    try {
      await dispatch(updateUserThunk({ username: newUsername })).unwrap();
      showAlert('Имя успешно изменено!');
    } catch (err) {
      showAlert('Ошибка при изменении имени');
      console.log('Ошибка при изменении имени', err);
    }
  };

  const getAvatarImage = () => {
    if (activeAvatar) {
      return (
        <div className={styles.avatarImage}>{activeAvatar.Product.name}</div>
      );
    }
    return (
      <img
        src={defaultAvatarSvg}
        alt="Дефолтный аватар"
        className={styles.defaultAvatar}
      />
    );
  };

  useEffect(() => {
    setBackground('forest');
    fetchActiveAvatar();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await $api('/user');

        if (response.status === 200) {
          setActualUser(response.data.data);
        }
      } catch (err) {
        console.error('Ошибка загрузки пользователя', err);
      }
    };

    fetchUser();
  }, []);

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
            {getAvatarImage()}
            <button
              onClick={openAvatarModal}
              className={styles.avatarChangeButton}
              aria-label="Change avatar"
            >
              +
            </button>
          </div>
        </div>
        <div className={styles.allUserPoints}>
          Текущий баланс: {actualUser?.point}
        </div>
        <ChangeName
          currentUsername={user?.username || ''}
          onUpdate={handleUpdateUsername}
          isLoading={isLoading}
        />
      </div>

      {isAvatarModalOpen && (
        <div className={styles.modalOverlay} onClick={closeAvatarModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={styles.modalTitle}>Выбрать аватарку</h2>
            <div className={styles.avatarsGrid}>
              {loading.products ? (
                <div>Загрузка товаров...</div>
              ) : purchasedProducts.length === 0 ? (
                <div>Нет купленных аватарок</div>
              ) : (
                purchasedProducts.map((purchase) => (
                  <div
                    key={purchase.id}
                    className={`${styles.avatarOption} ${
                      selectedAvatar?.id === purchase.id ||
                      (activeAvatar?.id === purchase.id && !selectedAvatar)
                        ? styles.selected
                        : ''
                    }`}
                    onClick={() => handleAvatarSelect(purchase)}
                  >
                    <div className={styles.productAvatar}>
                      {purchase.Product.name} - {purchase.Product.price} руб.
                      {purchase.is_active && <span> (Активен)</span>}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className={styles.modalButtons}>
              {activeAvatar && (
                <Button
                  buttonText={loading.avatar ? 'Обработка...' : 'Убрать'}
                  onClick={handleDeactivateAvatar}
                  className={styles.modalDeactivateButton}
                  disabled={loading.avatar}
                />
              )}
             
              <Button
                buttonText={loading.avatar ? 'Сохранение...' : 'Сохранить'}
                onClick={handleSaveAvatar}
                className={styles.modalSaveButton}
                disabled={!selectedAvatar || loading.avatar}
              />
               <Button
                buttonText="Закрыть"
                onClick={closeAvatarModal}
                className={styles.modalCloseButton}
              />
            </div>
          </div>
        </div>
      )}

      <FinishedGames />
    </div>
  );
};
