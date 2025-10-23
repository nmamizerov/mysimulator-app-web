# Быстрый гайд: Система аутентификации

## 🚀 Как использовать

### 1. Логин пользователя

```tsx
import { useLoginMutation } from "@/entities/session";
import { useNavigate } from "react-router";

const LoginComponent = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login({
        username: "user@example.com",
        password: "password",
      }).unwrap();
      // ✅ Токен автоматически сохранен в localStorage и Redux
      navigate("/");
    } catch (err) {
      // ❌ Обработка ошибки
    }
  };
};
```

### 2. Регистрация пользователя

```tsx
import { useRegisterMutation } from "@/entities/session";
import { useNavigate } from "react-router";

const RegisterComponent = () => {
  const [register, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register({
        username: "user@example.com",
        password: "password",
      }).unwrap();
      // ✅ Токен автоматически сохранен в localStorage и Redux
      navigate("/character");
    } catch (err) {
      // ❌ Обработка ошибки
    }
  };
};
```

### 3. Выход из системы

```tsx
import { useDispatch } from "react-redux";
import { logout } from "@/entities/session";
import { useNavigate } from "react-router";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    // ✅ Токен удален из localStorage и Redux
    navigate("/login");
  };

  return <button onClick={handleLogout}>Выйти</button>;
};
```

### 4. Проверка авторизации

```tsx
import { useSelector } from "react-redux";
import type { RootState } from "@/core/store/store";

const ProtectedComponent = () => {
  const { isAuthenticated, token } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated) {
    return <div>Требуется авторизация</div>;
  }

  return <div>Защищенный контент</div>;
};
```

### 5. Защищенный роут

```tsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import type { RootState } from "@/core/store/store";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Использование в роутере:
// <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
```

## 📦 Что происходит автоматически?

### При успешном login/register:

1. ✅ Токен сохраняется в Redux store (`state.auth.token`)
2. ✅ Токен сохраняется в localStorage (`access_token`)
3. ✅ Устанавливается флаг `isAuthenticated = true`
4. ✅ Все последующие API запросы автоматически включают заголовок:
   ```
   Authorization: Bearer {token}
   ```

### При logout:

1. ✅ Токен удаляется из Redux store
2. ✅ Токен удаляется из localStorage
3. ✅ Устанавливается флаг `isAuthenticated = false`
4. ✅ Последующие API запросы идут без заголовка Authorization

## 🔑 Ключевые экспорты

```tsx
// Хуки для аутентификации
import {
  useLoginMutation,
  useRegisterMutation,
  useUserInfoQuery,
} from "@/entities/session";

// Actions для работы с токеном
import { setToken, logout } from "@/entities/session";

// Типы
import type { RootState } from "@/core/store/store";
```

## 💾 Структура state

```typescript
// Redux state
state.auth = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // JWT токен или null
  isAuthenticated: true, // true если токен есть, false если нет
};

// localStorage
localStorage.getItem("access_token"); // JWT токен или null
```

## 🛡️ Безопасность

- ✅ Токен автоматически добавляется во все API запросы
- ✅ Токен сохраняется между перезагрузками страницы
- ✅ Токен безопасно удаляется при выходе
- ✅ SSR-безопасная проверка `typeof window !== "undefined"`

## 🐛 Отладка

### Проверить наличие токена в Redux:

```typescript
// В консоли браузера
store.getState().auth.token;
```

### Проверить наличие токена в localStorage:

```typescript
// В консоли браузера
localStorage.getItem("access_token");
```

### Проверить Authorization header в запросах:

1. Открой DevTools → Network
2. Выбери любой API запрос
3. Во вкладке Headers найди `Authorization: Bearer {token}`

## 📄 Полная документация

См. [auth-system.md](./auth-system.md) для детальной информации.
