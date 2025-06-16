import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  type AxiosError,
} from "axios";

// Для разработки (локальный сервер)
const API_URL = "http://localhost:3000/api";

// Для продакшена (удалённый сервер)
// const API_URL = "https://crocdraw.ru/api";

export const $api: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

    return config;
  }
);

$api.interceptors.response.use(
  (config: AxiosResponse) => {
    return config;
  },
  async (error: AxiosError) => {
    const prevReq: InternalAxiosRequestConfig | undefined = error.config;
    if (error.response!.status == 401) {
      try {
        const { data } = await $api.get("/refresh");
        localStorage.setItem("token", data.data.accessToken);
        return $api.request(prevReq!);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default $api;
