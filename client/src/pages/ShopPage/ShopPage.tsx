import { Button } from "@/shared";
import styles from "./ShopPage.module.scss";
import { useEffect, useState } from "react";
import { $api } from '../../shared/lib/axiosConfig';
import type { IApiResponse } from "@/shared";
import { useAlert } from "@/shared/hooks/useAlert";

interface Product {
  id: number;
  name: string;
  price: number;
  category_id: number;
  isPurchased?: boolean; // Добавляем поле для статуса покупки
}

export const ShopPage = () => {
  const {showAlert} = useAlert()
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [purchasedIds, setPurchasedIds] = useState<number[]>([]);

  useEffect(() => {
    const GetData = async () => {
      try {
        // Загружаем продукты
        const productsResponse = await $api.get<IApiResponse<Product[]>>("/products");
        if (productsResponse.data.statusCode === 200) {
          setProducts(productsResponse.data.data);
        } else {
          setError(productsResponse.data.message || "Не удалось загрузить товары");
        }

        // Загружаем купленные товары текущего пользователя
        const purchasedResponse = await $api.get<IApiResponse<{product_id: number}[]>>("/buies/user");
        if (purchasedResponse.data.statusCode === 200) {
          const purchasedIds = purchasedResponse.data.data.map(item => item.product_id);
          setPurchasedIds(purchasedIds);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };

    GetData();
  }, []);

  const handleBuy = async (productId: number) => {
    try {
      const response = await $api.post<IApiResponse<{product_id: number}>>("/buies", {
        productId
      });

      if (response.data.statusCode === 200) {
        // Обновляем список купленных товаров
        setPurchasedIds(prev => [...prev, productId]);
        showAlert('Товар успешно куплен!');
      } else {
        showAlert(response.data.message || "Ошибка при покупке");
      }
    } catch (err) {
      showAlert(err instanceof Error ? err.message : "Неизвестная ошибка");
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (products.length === 0) return <div className={styles.empty}>No products available</div>;

  return (
    <div className={styles.shopPage}>
      <h1 className={styles.title}>Магазин</h1>
      <div className={styles.productsGrid}>
        {products.map((product) => {
          const isPurchased = purchasedIds.includes(product.id);
          
          return (
            <div key={product.id} className={`${styles.productCard} ${isPurchased ? styles.purchased : ''}`}>
              <div className={styles.productImage}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productPrice}>{product.price} руб.</p>
                {isPurchased && <div className={styles.purchasedBadge}>Куплено</div>}
              </div>
              <Button
                buttonText={isPurchased ? "Уже куплено" : "Купить"}
                className={styles.buyButton}
                onClick={() => !isPurchased && handleBuy(product.id)}
                disabled={isPurchased}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};