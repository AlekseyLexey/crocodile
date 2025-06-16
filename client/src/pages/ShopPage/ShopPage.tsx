import { Button } from "@/shared";
import styles from "./ShopPage.module.scss";

export const ShopPage = () => {
    const shop = [
        {id: 1, name: 'Футболка', price: 300},
        {id: 2, name: 'Джинсы', price: 1200},
        {id: 3, name: 'Кроссовки', price: 2500},
        {id: 4, name: 'Куртка', price: 3500},
        {id: 5, name: 'Шапка', price: 500},
        {id: 6, name: 'Рюкзак', price: 1800},
        {id: 7, name: 'Часы', price: 4200},
        {id: 8, name: 'Очки', price: 1500},
        {id: 9, name: 'Ремень', price: 800},
        {id: 10, name: 'Носки', price: 200},
        {id: 11, name: 'Галстук', price: 600},
        {id: 12, name: 'Перчатки', price: 700},
    ]

    return (
        <div className={styles.shopPage}>
            <h1 className={styles.title}>Магазин</h1>
            <div className={styles.productsGrid}>
                {shop.map((product) => (
                    <div key={product.id} className={styles.productCard}>
                        <div className={styles.productImage}>
                            <h3 className={styles.productName}>{product.name}</h3>
                            <p className={styles.productPrice}>{product.price} ₽</p>
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