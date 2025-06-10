import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { useAppSelector } from "@/shared/hooks/useReduxHooks";
import { useAppDispatch } from "@/shared/hooks/useReduxHooks";
import { logoutThunk } from "@/entities/user";

export const Header = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate(CLIENT_ROUTES.SIGN_IN);
  };

  const isActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles.active : "";

  return (
    <nav className={styles.container}>
      {!user && (
        <>
          <NavLink to={CLIENT_ROUTES.SIGN_IN} className={isActive}>
            Sign In
          </NavLink>

          <NavLink to={CLIENT_ROUTES.SIGN_UP} className={isActive}>
            Sign Up
          </NavLink>
        </>
      )}

      {user && (
        <>
          <h3>Hello, {user.username}</h3>
          <Link to={CLIENT_ROUTES.MAIN} onClick={handleLogout}>
            Sign Out
          </Link>
          <Link to={CLIENT_ROUTES.GAME}>
            GamePage
          </Link>
        </>
      )}
    </nav>
  );
};
