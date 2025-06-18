import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Button } from "@/shared";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useReduxHooks";
import { signInThunk, signUpThunk } from "@/entities/user";
import { registrationSchema, type RegistrationFormData } from "@/shared/validation/validationSchemas";
import styles from "./AuthForm.module.scss";

interface AuthFormProps {
  isLogin: boolean;
}

export const AuthForm = ({ isLogin }: AuthFormProps) => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
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
    try {
      const action = isLogin ? signInThunk : signUpThunk;
      const res = await dispatch(action(formData));

      if (action.rejected.match(res)) {
        alert(res.payload?.message || "Произошла ошибка");
        return;
      }

      alert("Успешно!");
      reset();
      navigate(CLIENT_ROUTES.MAIN);
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Произошла непредвиденная ошибка");
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
      <Button 
        type="submit" 
        buttonText={isLogin ? "Войти" : "Зарегистрироваться"} 
      />
    </form>
  );
};