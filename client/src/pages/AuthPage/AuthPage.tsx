import { useEffect, useState } from "react";
import { AuthForm } from "@/features";
import { Button } from "@/shared";
import { useBackground } from "@/app/store/BackgroundContext";
import styles from "./AuthPage.module.scss";
import crocodileSvg from "@/assets/svg/animals/крокодил.svg";
import bearSvg from "@/assets/svg/animals/медведь.svg";
import deerSvg from "@/assets/svg/animals/олень.svg";
import foxSvg from "@/assets/svg/animals/лиса.svg";
import dinoSvg from "@/assets/svg/animals/динозавр.svg";

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { setBackground } = useBackground();

  useEffect(() => {
    setBackground("forest");
  }, [setBackground]);

  return (
    <div className={styles.authContainer}>
      {/* Десктопные животные */}
      <img src={bearSvg} alt="Медведь" className={styles.animalLeft} />
      <img src={deerSvg} alt="Олень" className={styles.animalRight} />

      {/* Мобильные животные */}
      <img src={foxSvg} alt="Лиса" className={styles.mobileAnimalLeft} />
      <img src={dinoSvg} alt="Динозавр" className={styles.mobileAnimalRight} />

      {/* Основной контент */}
      <img src={crocodileSvg} alt="Логотип" className={styles.logo} />
      <div className={styles.formWrapper}>
        <h2>{isLogin ? "Вход" : "Регистрация"}</h2>
        <AuthForm isLogin={isLogin} />
        <Button
          buttonText={isLogin ? "У меня нет аккаунта" : "У меня уже есть аккаунт"}
          onClick={() => setIsLogin(!isLogin)}
         
          style={{ marginTop: '0.5rem' }}
        />
      </div>
    </div>
  );
};