import { Button } from "@/shared";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { AuthForm } from "@/features";
import { useNavigate } from "react-router-dom";
import styles from "./SignInPage.module.scss";

export const SignInPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <Button
        buttonText="Регистрация"
        onClick={() => navigate(CLIENT_ROUTES.SIGN_UP)}
      />
      <h2>Вход</h2>
      <AuthForm />
    </div>
  );
};
