import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import type { RootState } from "@/core/store/store";

/**
 * Хук для защиты роутов от неавторизованных пользователей
 * Проверяет наличие токена в Redux store и перенаправляет на /login если токена нет
 */
export const useAuthGuard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, token } = useSelector(
    (state: RootState) => state.auth
  );

  // Список публичных путей, которые доступны без авторизации
  const publicPaths = ["/login", "/register"];

  useEffect(() => {
    const currentPath = location.pathname;
    const isPublicPath = publicPaths.includes(currentPath);

    // Если это не публичная страница и пользователь не авторизован
    if (!isPublicPath && !isAuthenticated) {
      // Сохраняем путь, куда пользователь хотел попасть
      const redirectPath = currentPath !== "/" ? currentPath : undefined;

      // Перенаправляем на логин
      navigate("/login", { replace: true, state: { from: redirectPath } });
    }
  }, [isAuthenticated, token, location.pathname, navigate]);

  return { isAuthenticated, token };
};
