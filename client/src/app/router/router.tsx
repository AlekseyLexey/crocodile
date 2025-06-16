import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage, SignInPage, SignUpPage } from "@/pages";
import { CLIENT_ROUTES } from "@/shared";
import { Layout } from "../layout/Layout";
import { GamePage } from "@/pages/GamePage/GamePage";
import { LobbyList } from "@/widgets";
import { ShopPage } from "@/pages/ShopPage/ShopPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={CLIENT_ROUTES.MAIN} element={<Layout />}>
          <Route path={CLIENT_ROUTES.MAIN} element={<MainPage />} />
          <Route path={`${CLIENT_ROUTES.GAME}/:id`} element={<GamePage />} />
          <Route path={CLIENT_ROUTES.SIGN_IN} element={<SignInPage />} />
          <Route path={CLIENT_ROUTES.SIGN_UP} element={<SignUpPage />} />
          <Route path={CLIENT_ROUTES.LOBBY_LIST} element={<LobbyList />} />
          <Route path={CLIENT_ROUTES.SHOP} element={<ShopPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
