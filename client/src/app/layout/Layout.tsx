import { Footer, Header, Wrapper } from "@/widgets";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/shared/hooks/useReduxHooks";
import { refreshThunk } from "@/entities/user";
import { CLIENT_ROUTES } from "@/shared";

export const Layout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    refreshFetch();
    // eslint-disable-next-line
  }, []);

  const refreshFetch = async () => {
    const response = await dispatch(refreshThunk());
    if (refreshThunk.rejected.match(response)) {
      navigate(CLIENT_ROUTES.SIGN_IN);
    } else {
      if (location.pathname === CLIENT_ROUTES.MAIN) {
        // navigate(...Куда-нибудь);
      }
    }
  };

  return (
    <>
      <Header />
      <Wrapper>
        <Outlet />
        <Footer />
      </Wrapper>
    </>
  );
};
