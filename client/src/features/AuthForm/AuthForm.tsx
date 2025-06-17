import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/shared";
import { Button } from "@/shared";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/shared/hooks/useReduxHooks";
import { useAppSelector } from "@/shared/hooks/useReduxHooks";
import { signInThunk, signUpThunk } from "@/entities/user";
import { registrationSchema,  type RegistrationFormData } from "@/shared/validation/validationSchemas";
import styles from "./AuthForm.module.scss";

export const AuthForm = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const location = window.location.pathname;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(registrationSchema),
  });

  useEffect(() => {
    if (user) navigate(CLIENT_ROUTES.MAIN);
  }, [user, navigate]);

  const onSubmit = async (formData: RegistrationFormData) => {
    let res = null;
    try {
      if (location === CLIENT_ROUTES.SIGN_IN) {
        res = await dispatch(signInThunk(formData));
      } else if (location === CLIENT_ROUTES.SIGN_UP) {
        res = await dispatch(signUpThunk(formData));
      } else {
        alert("Что то пошло не так...");
        return;
      }

      if (signInThunk.rejected.match(res) || signUpThunk.rejected.match(res)) {
        alert(res.payload?.message);
        return;
      }

      alert("Успешно!");
      reset();
      navigate(CLIENT_ROUTES.MAIN);
    } catch (error) {
      console.error("Ошибка!", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("username")}
        error={errors.username?.message}
        labelText="Username"
        placeholder="Username"
      />
      <Input
        {...register("email")}
        type="email"
        error={errors.email?.message}
        labelText="Email"
        placeholder="Email"
      />
      <Input
        {...register("password")}
        type="password"
        error={errors.password?.message}
        labelText="Password"
        placeholder="Password"
      />
      <Button type="submit" buttonText="Submit" />
    </form>
  );
};