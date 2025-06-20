import { Button } from "@/shared";
import { useBackground } from "@/app/store/BackgroundContext";
import styles from "./ShopPage.module.scss";
import foxSvg from "@/assets/svg/animals/лиса.svg";
import penguinSvg from "@/assets/svg/animals/пингвин.svg";
import { useEffect, useState } from "react";
import { $api } from "@/shared/lib/axiosConfig";
import type { IApiResponse } from "@/shared";
import { useAlert } from "@/shared/hooks/useAlert";

interface Product {
  id: number;
  name: string;
  price: number;
  category_id: number;
  isPurchased?: boolean;
}

interface Purchase {
  product_id: number;
}

export const ShopPage = () => {
  const { setBackground } = useBackground();
  const { showAlert } = useAlert();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [purchasedIds, setPurchasedIds] = useState<number[]>([]);

  useEffect(() => {
    setBackground("beach");
    const fetchData = async () => {
      try {
        // Продукты
        const productsResponse = await $api.get<IApiResponse<Product[]>>(
          "/products"
        );
        if (productsResponse.data.statusCode === 200) {
          setProducts(productsResponse.data.data);
        } else {
          setError(
            productsResponse.data.message || "Не удалось загрузить товары"
          );
        }

        // Купленные товары пользователя
        const purchasedResponse = await $api.get<IApiResponse<Purchase[]>>(
          "/buies/user"
        );
        if (purchasedResponse.data.statusCode === 200) {
          const ids = purchasedResponse.data.data.map(
            (item) => item.product_id
          );
          setPurchasedIds(ids);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => setBackground("forest");
  }, [setBackground]);

  const handleBuy = async (productId: number) => {
    try {
      const response = await $api.post<IApiResponse<Purchase>>("/buies", {
        productId,
      });

      if (response.data.statusCode === 201) {
        setPurchasedIds((prev) => [...prev, productId]);
        showAlert("Товар успешно куплен!");
      } else {
        showAlert(response.data.message || "Ошибка при покупке");
      }
    } catch (err) {
      showAlert(err instanceof Error ? err.message : "Неизвестная ошибка");
    }
  };

  if (loading) return <div className={styles.loading}>Загрузка...</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;
  if (products.length === 0) {
    return <div className={styles.empty}>Нет доступных товаров</div>;
  }

  return (
    <div className={styles.shopPage}>
      <img src={foxSvg} alt="Лиса" className={styles.foxDesktop} />
      <img src={penguinSvg} alt="Пингвин" className={styles.penguinDesktop} />
      <h1 className={styles.title}>Магазин</h1>
      <div className={styles.productsGrid}>
        {products.map((product) => {
          const isPurchased = purchasedIds.includes(product.id);

          return (
            <div
              key={product.id}
              className={`${styles.productCard} ${
                isPurchased ? styles.purchased : ""
              }`}
            >
              <div className={styles.productImage}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productPrice}>{product.price} руб.</p>
                {isPurchased && <div className={styles.purchasedBadge}></div>}
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
