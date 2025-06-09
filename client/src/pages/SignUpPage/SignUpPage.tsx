import { Button } from "@/shared";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { AuthForm } from "@/features";
import { useNavigate } from "react-router-dom";
import styles from "./SignUpPage.module.scss";

export const SignUpPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <Button
        buttonText="Войти в профиль"
        onClick={() => navigate(CLIENT_ROUTES.SIGN_IN)}
      />
      <h2>Регистрация</h2>
      <AuthForm />
    </div>
  );
};
