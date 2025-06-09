import { useEffect, useState } from "react";
import { Input } from "@/shared";
import { Button } from "@/shared";
import type { IAuthForm } from "./index";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/shared/hooks/useReduxHooks";
import { useAppSelector } from "@/shared/hooks/useReduxHooks";
import { signInThunk, signUpThunk } from "@/entities/user";
import styles from "./AuthForm.module.scss";

const initialState: IAuthForm = {
  username: "",
  email: "",
  password: "",
};

export const AuthForm = () => {
  const [formData, setFormData] = useState<IAuthForm>(initialState);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const location = window.location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate(CLIENT_ROUTES.MAIN);
    //eslint-disable-next-line
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let res = null;
    if (location === CLIENT_ROUTES.SIGN_IN) {
      res = await dispatch(signInThunk(formData));
    } else if (location === CLIENT_ROUTES.SIGN_UP) {
      res = await dispatch(signUpThunk(formData));
    } else {
      alert("Что-то пошло не так...");
      return;
    }

    if (signInThunk.rejected.match(res) || signUpThunk.rejected.match(res)) {
      alert(res.payload);
      return;
    }

    alert("Успешно!");
    setFormData(initialState);
    navigate(CLIENT_ROUTES.MAIN);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        value={formData.username}
        onChange={handleChange}
        name="username"
        labelText="Username"
        placeholder="Username"
      />
      <Input
        value={formData.email}
        onChange={handleChange}
        type="email"
        name="email"
        labelText="Email"
        placeholder="Email"
      />
      <Input
        value={formData.password}
        onChange={handleChange}
        type="password"
        name="password"
        labelText="Password"
        placeholder="Password"
      />
      <Button type="submit" buttonText="Отправить" />
    </form>
  );
};
