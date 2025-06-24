import { Footer, Header, Wrapper } from "@/widgets";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/shared/hooks/useReduxHooks";
import { refreshThunk } from "@/entities/user";
import { CLIENT_ROUTES } from "@/shared";
import { BackgroundProvider } from "../store/BackgroundContext";

export const Layout = () => {
  const [isRefreshLoading, setRefreshLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  //ищем путь
  const currentPath = Object.values(CLIENT_ROUTES).find(
    route => route === location.pathname
  );

  const isAuthPage = currentPath 
    ? [CLIENT_ROUTES.SIGN_IN, CLIENT_ROUTES.SIGN_UP].includes(currentPath)
    : false;

  useEffect(() => {
    refreshFetch();
    // eslint-disable-next-line
  }, []);

  const refreshFetch = async () => {
    const response = await dispatch(refreshThunk());
    if (refreshThunk.rejected.match(response)) {
      navigate(CLIENT_ROUTES.SIGN_IN);
    }
    setRefreshLoading(true);
  };

  if (!isRefreshLoading) {
    return <div>...LOADING</div>;
  }

  return (
    <BackgroundProvider>
      {!isAuthPage && <Header />}
      <Wrapper isAuthPage={isAuthPage}>
        <Outlet />
      </Wrapper>
      {!isAuthPage && <Footer />}
    </BackgroundProvider>
  );
};