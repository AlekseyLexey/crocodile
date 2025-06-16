import { CLIENT_ROUTES } from "@/shared";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { useAppSelector } from "@/shared/hooks/useReduxHooks";
import { useAppDispatch } from "@/shared/hooks/useReduxHooks";
import { logoutThunk } from "@/entities/user";
import { useEffect, useState } from "react";
import { ButtonNavigate } from "@/shared";

export const Header = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(document.documentElement.clientWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
          {isMobile ? (
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
                    to={CLIENT_ROUTES.LOBBY_LIST}
                    className={styles.menuItem}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Магазин
                  </Link>
                  <Link
                    to={CLIENT_ROUTES.LOBBY_LIST}
                    className={styles.menuItem}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Список Лобби
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
              <ButtonNavigate buttonText="Выйти" onClick={handleLogout} />
            </div>
          ) : (
            <div className={styles.desktopButtons}>
              <ButtonNavigate
                buttonText="Магазин"
                onClick={() => navigate(CLIENT_ROUTES.LOBBY_LIST)}
              />
              <ButtonNavigate
                buttonText="Список Лобби"
                onClick={() => navigate(CLIENT_ROUTES.LOBBY_LIST)}
              />
              <ButtonNavigate
                buttonText="Профиль"
                onClick={() => navigate(CLIENT_ROUTES.PROFILE)}
              />
              <ButtonNavigate buttonText="Выйти" onClick={handleLogout} />
            </div>
          )}
        </>
      )}
    </nav>
  );
};
