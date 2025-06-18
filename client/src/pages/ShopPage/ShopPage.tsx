import { Button } from "@/shared";
import styles from "./ShopPage.module.scss";
import { useEffect, useState } from "react";
import { $api } from '../../shared/lib/axiosConfig'
import type  { IApiResponse } from "@/shared";
interface Product {
  id: number;
  name: string;
  price: number;
  category_id: number;
}

export const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await $api.get<IApiResponse<Product[]>>("/products");
        if (response.data.statusCode === 200) {
          setProducts(response.data.data);
        } else {
          setError(response.data.message || "Не удалось загрузить");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (products.length === 0) return <div className={styles.empty}>No products available</div>;

  return (
    <div className={styles.shopPage}>
      <h1 className={styles.title}>Магазин</h1>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.productImage}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productPrice}>{product.price} руб.</p>
            </div>
            <Button
              buttonText="Купить"
              className={styles.buyButton}
            />
          </div>
        ))}
      </div>
    </div>
  );
};