import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage, SignInPage, SignUpPage } from "@/pages";
import { CLIENT_ROUTES } from "@/shared";
import { Layout } from "../layout/Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={CLIENT_ROUTES.MAIN} element={<Layout />}>
          <Route path={CLIENT_ROUTES.MAIN} element={<MainPage />} />
          <Route path={CLIENT_ROUTES.SIGN_IN} element={<SignInPage />} />
          <Route path={CLIENT_ROUTES.SIGN_UP} element={<SignUpPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
