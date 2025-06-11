import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage, SignInPage, SignUpPage } from "@/pages";
import { CLIENT_ROUTES } from "@/shared";
import { Layout } from "../layout/Layout";
import { GamePage } from "@/pages/GamePage/GamePage";
import { GameTest } from "@/pages/GameTest";

import io from "socket.io-client";

const socket = io("ws://localhost:3000");

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={CLIENT_ROUTES.MAIN} element={<Layout />}>
          <Route
            path={CLIENT_ROUTES.MAIN}
            element={<MainPage socket={socket} />}
          />
          <Route
            path={`${CLIENT_ROUTES.GAME_TEST}/:id`}
            element={<GameTest socket={socket} />}
          />
          <Route path={CLIENT_ROUTES.GAME} element={<GamePage />} />
          <Route path={CLIENT_ROUTES.SIGN_IN} element={<SignInPage />} />
          <Route path={CLIENT_ROUTES.SIGN_UP} element={<SignUpPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
