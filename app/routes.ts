import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Главная страница
  index("routes/home/route.tsx"),

  // Страницы аутентификации
  route("login", "routes/login/route.tsx"),
  route("register", "routes/register/route.tsx"),

  // Страница персонажа
  route("character", "routes/character/route.tsx"),

  // Страница симулятора с динамическими параметрами
  route(
    "lesson/:lessonId/simulator/:simulatorId",
    "routes/lesson.$lessonId.simulator.$simulatorId/route.tsx"
  ),
] satisfies RouteConfig;
