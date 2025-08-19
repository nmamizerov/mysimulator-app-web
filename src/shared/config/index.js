// Конфигурация приложения
export const config = {
  // API базовый URL из переменных окружения
  apiPath: import.meta.env.VITE_API_PATH || "http://localhost:8000/api/v1/external",
  
  // Другие конфигурационные параметры можно добавить здесь
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};
