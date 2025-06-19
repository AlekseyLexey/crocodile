import * as yup from "yup";

export const registrationSchema = yup.object({
  username: yup
    .string()
    .required("Без имени мы вас как звать-то будем?")
    .min(3, "Слишком коротко, давай заново (минимум 3 символа)")
    .max(20, "Ого, разащелся! Давайте покороче (максимум 20)"),

  email: yup
    .string()
    .required("Введите email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@(mail\.ru|yandex\.ru|gmail\.com|icloud\.com|proton\.me|outlook\.com)$/i,
      "Введите корректный email (разрешены: mail.ru, yandex.ru, gmail.com и др.)"
    ),

  password: yup
    .string()
    .required("Пароль - это святое!")
    .min(6, "Слишком простой! Крокодил угадает (минимум 6 символов)")
    .max(40, "А ты хорош! Давайте покороче (максимум 40)")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      'Эй, это же не "123456"! Добавьте буквы и цифры'
    ),
});

export type RegistrationFormData = yup.InferType<typeof registrationSchema>;
