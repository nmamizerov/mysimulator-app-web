# useAuthGuard Hook

## Описание

`useAuthGuard` - это хук для **клиентской** защиты роутов от неавторизованных пользователей. Он проверяет наличие токена в Redux store (который синхронизирован с localStorage) и автоматически перенаправляет на `/login` если токена нет.

## Местоположение

```
app/shared/lib/hooks/
├── use-auth-guard.ts
└── index.ts
```

## Импорт

```typescript
import { useAuthGuard } from "@/shared/lib";
```

## Использование

### В Layout (основное использование)

```tsx
import { useAuthGuard } from "@/shared/lib";

export const AppLayout = () => {
  // Защищаем все роуты на клиенте
  useAuthGuard();

  return <Outlet />;
};
```

### В отдельном компоненте

```tsx
import { useAuthGuard } from "@/shared/lib";

const ProtectedComponent = () => {
  const { isAuthenticated, token } = useAuthGuard();

  // Компонент автоматически перенаправит на /login если нет токена
  return <div>Защищенный контент</div>;
};
```

## Возвращаемое значение

```typescript
{
  isAuthenticated: boolean; // true если токен есть
  token: string | null;     // JWT токен или null
}
```

## Как это работает

### 1. Проверка токена

```typescript
const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
```

Хук получает данные из Redux store, который:
- При инициализации загружает токен из `localStorage`
- Синхронизируется с `localStorage` при каждом изменении

### 2. Список публичных путей

```typescript
const publicPaths = ["/login", "/register"];
```

Эти пути доступны без авторизации.

### 3. Логика редиректа

```typescript
useEffect(() => {
  const currentPath = location.pathname;
  const isPublicPath = publicPaths.includes(currentPath);

  // Если не публичная страница и нет токена - редирект на /login
  if (!isPublicPath && !isAuthenticated) {
    navigate("/login", {
      replace: true,
      state: { from: currentPath }, // Сохраняем откуда пришел
    });
  }
}, [isAuthenticated, token, location.pathname, navigate]);
```

**Важно:**
- `replace: true` - заменяет текущую запись в истории (нельзя вернуться назад)
- `state: { from: currentPath }` - сохраняет путь для возврата после логина

### 4. Возврат после логина

После успешного логина, страница может вернуть пользователя туда, откуда он пришел:

```tsx
// В LoginPage
const location = useLocation();

const handleLogin = async () => {
  await login(credentials).unwrap();

  // Возвращаемся туда, откуда пришли
  const from = (location.state as { from?: string })?.from || "/";
  navigate(from, { replace: true });
};
```

## Поток работы

### Сценарий 1: Неавторизованный пользователь пытается попасть на защищенную страницу

```
1. Пользователь открывает /dashboard
   ↓
2. AppLayout рендерится
   ↓
3. useAuthGuard проверяет:
   - isAuthenticated: false
   - currentPath: "/dashboard"
   - isPublicPath: false
   ↓
4. Редирект на /login с state: { from: "/dashboard" }
   ↓
5. После успешного логина → редирект обратно на /dashboard
```

### Сценарий 2: Авторизованный пользователь

```
1. Пользователь открывает /dashboard
   ↓
2. AppLayout рендерится
   ↓
3. useAuthGuard проверяет:
   - isAuthenticated: true
   - currentPath: "/dashboard"
   ↓
4. Никакого редиректа, страница отображается
```

### Сценарий 3: Публичная страница

```
1. Пользователь открывает /login
   ↓
2. AppLayout рендерится
   ↓
3. useAuthGuard проверяет:
   - currentPath: "/login"
   - isPublicPath: true
   ↓
4. Никакого редиректа, даже если нет токена
```

## Отличия от серверной проверки

### ❌ Было (серверная проверка в loader)

```typescript
// app/root.tsx
export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("cookie");
  const pathname = new URL(request.url).pathname;
  const publicPaths = ["/login", "/register"];

  if (!publicPaths.includes(pathname)) {
    const hasToken = cookieHeader?.includes("access_token=");

    if (!hasToken) {
      throw redirect("/login"); // Серверный редирект
    }
  }

  return { course: result.data };
}
```

**Проблемы:**
- ❌ Проверяет cookie на сервере
- ❌ Токен был в httpOnly cookie
- ❌ SSR редирект (замедляет загрузку)
- ❌ Не работает с localStorage/JWT в Authorization header

### ✅ Стало (клиентская проверка в хуке)

```typescript
// app/shared/lib/hooks/use-auth-guard.ts
export const useAuthGuard = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPublicPath && !isAuthenticated) {
      navigate("/login", { replace: true, state: { from: currentPath } });
    }
  }, [isAuthenticated, location.pathname]);

  return { isAuthenticated };
};
```

**Преимущества:**
- ✅ Проверяет токен из localStorage через Redux
- ✅ Токен в Authorization header (Bearer token)
- ✅ Клиентский редирект (быстрее)
- ✅ Работает с JWT токенами
- ✅ Сохраняет путь для возврата после логина

## Расширение функционала

### Добавить больше публичных путей

```typescript
const publicPaths = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/about",
  "/contact",
];
```

### Добавить условную проверку

```typescript
export const useAuthGuard = (options?: { requireAuth?: boolean }) => {
  const { requireAuth = true } = options || {};
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (requireAuth && !isPublicPath && !isAuthenticated) {
      navigate("/login");
    }
  }, [requireAuth, isAuthenticated]);
};

// Использование
useAuthGuard({ requireAuth: false }); // Отключить проверку
```

### Добавить роли пользователей

```typescript
interface AuthGuardOptions {
  requiredRole?: "admin" | "user" | "moderator";
}

export const useAuthGuard = (options?: AuthGuardOptions) => {
  const { isAuthenticated, token } = useSelector(
    (state: RootState) => state.auth
  );
  const userRole = getUserRoleFromToken(token); // Декодировать JWT

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (options?.requiredRole && userRole !== options.requiredRole) {
      navigate("/forbidden"); // 403 страница
    }
  }, [isAuthenticated, userRole, options?.requiredRole]);
};

// Использование
useAuthGuard({ requiredRole: "admin" }); // Только для админов
```

## Связанные файлы

- [auth-system.md](../auth/auth-system.md) - Система аутентификации
- [auth.slice.ts](../../app/entities/session/model/auth.slice.ts) - Redux slice для токена
- [appLayout.tsx](../../app/core/layout/appLayout.tsx) - Использование в Layout

## Troubleshooting

### Проблема: Бесконечный редирект на /login

**Причина:** Токен не загружается из localStorage

**Решение:**
1. Проверь: `localStorage.getItem("access_token")`
2. Убедись, что auth slice правильно инициализируется:
   ```typescript
   const getInitialToken = () => {
     if (typeof window === "undefined") return null;
     return localStorage.getItem("access_token");
   };
   ```

### Проблема: Пользователь не возвращается на нужную страницу после логина

**Причина:** `location.state.from` не обрабатывается в LoginPage

**Решение:**
```tsx
// В LoginPage
const from = (location.state as { from?: string })?.from || "/";
navigate(from, { replace: true });
```

### Проблема: Редирект происходит на публичных страницах

**Причина:** Путь не в списке `publicPaths`

**Решение:** Добавь путь в список:
```typescript
const publicPaths = ["/login", "/register", "/your-public-path"];
```

## Примеры из проекта

См. также:
- `app/core/layout/appLayout.tsx` - Основное использование
- `app/pages/login/ui/login-page.tsx` - Возврат после логина
- `app/pages/register/ui/register-page.tsx` - Редирект после регистрации

