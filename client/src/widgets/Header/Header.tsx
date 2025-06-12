import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { useAppSelector } from "@/shared/hooks/useReduxHooks";
import { useAppDispatch } from "@/shared/hooks/useReduxHooks";
import { logoutThunk } from "@/entities/user";
import { useState } from "react";

export const Header = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate(CLIENT_ROUTES.SIGN_IN);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          <div className={styles.menuContainer}>
            
            <button
              className={styles.burgerButton}
              onClick={toggleMenu}
              aria-label="Toggle-menu"
            >
              ☰
            </button>

            {isMenuOpen && (
              <div className={styles.modalMenu}>
                <Link
                  to={CLIENT_ROUTES.SHOP}
                  className={styles.menuItem}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Магазин
                </Link>
                <Link 
                  to={CLIENT_ROUTES.GAME}
                  className={styles.menuItem}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Игры
                </Link>
                <Link
                to={CLIENT_ROUTES.PROFILE}
                className={styles.menuItem}
                onClick={() => setIsMenuOpen(false)}
                >
                  Профиль
                </Link>
              </div>
            )}
          </div>

          <div className={styles.logoutContainer}>
              <button 
              onClick={handleLogout}
              className={styles.logoutButton}
              >
                Выйти
              </button>
          </div>
            

          {/* <h3>Hello, {user.username}</h3>
          <Link to={CLIENT_ROUTES.MAIN} onClick={handleLogout}>
            Sign Out
          </Link>
          <Link to={CLIENT_ROUTES.GAME}>
            GamePage
          </Link> */}
        </>
      )}
    </nav>
  );
};
