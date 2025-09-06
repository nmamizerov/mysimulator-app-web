import axios from "axios";
import { config } from "../config";

export const api = axios.create({
  baseURL: config.apiPath,
});

api.interceptors.request.use(
  (config) => {
    // Получаем токен из localStorage
    const externalAuthData = localStorage.getItem("externalAuthData");
    if (externalAuthData) {
      try {
        const token = JSON.parse(externalAuthData).access;
        // Добавляем токен в заголовок Authorization
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error("Error parsing externalAuthData:", error);
      }
    }
    return config;
  },
  (error) => {
    // Обрабатываем ошибку запроса
    return Promise.reject(error);
  },
);

// Добавляем интерсептор ответов
api.interceptors.response.use(
  (response) => {
    // Просто возвращаем ответ, если он успешный
    return response;
  },
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      // Если статус 401, перенаправляем на страницу логина
      // if (window.location.pathname !== "/auth/login") {
      //   window.location.href = "/auth/login";
      // }
    }
    return Promise.reject(error);
  },
);
