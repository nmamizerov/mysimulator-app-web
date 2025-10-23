# Система аутентификации

## Обзор

Система аутентификации построена на основе JWT токенов, которые хранятся в `localStorage` и Redux store. Токен автоматически добавляется во все API запросы через заголовок `Authorization: Bearer {token}`.

## Архитектура

### 1. Auth Slice (`app/entities/session/model/auth.slice.ts`)

Redux slice для управления состоянием аутентификации.

**Состояние:**

```typescript
interface AuthState {
  token: string | null; // JWT токен
  isAuthenticated: boolean; // Статус аутентификации
}
```

**Действия:**

- `setToken(token: string)` - Сохраняет токен в Redux и localStorage
- `logout()` - Удаляет токен из Redux и localStorage

**Особенности:**

- При инициализации автоматически загружает токен из localStorage
- Синхронизирует Redux state с localStorage при каждом изменении
- Безопасно работает на сервере (SSR) - проверяет наличие `window`

### 2. API конфигурация (`app/shared/api/index.ts`)

RTK Query базовый API с автоматическим добавлением токена в заголовки.

**Логика `prepareHeaders`:**

```typescript
prepareHeaders: (headers, { endpoint, getState }) => {
  // 1. Получаем токен из Redux store
  const state = getState() as RootState;
  const token = state.auth.token;

  // 2. Добавляем токен в заголовок Authorization
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // 3. Добавляем остальные заголовки (host и т.д.)
  // ...

  return headers;
};
```

### 3. Session API (`app/entities/session/api/session.api.ts`)

API endpoints для аутентификации с автоматическим сохранением токена.

**Endpoints:**

#### `login`

```typescript
login: builder.mutation<SessionResponse, LoginRequest>({
  query: (body) => ({ url: "/login", method: "POST", body }),
  invalidatesTags: ["User"],
  async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    try {
      const { data } = await queryFulfilled;
      // Автоматически сохраняем токен после успешного логина
      dispatch(setToken(data.access_token));
    } catch (error) {
      // Ошибка обработается автоматически
    }
  },
});
```

#### `register`

```typescript
register: builder.mutation<SessionResponse, RegisterRequest>({
  query: (body) => ({ url: "/register", method: "POST", body }),
  invalidatesTags: ["User"],
  async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    try {
      const { data } = await queryFulfilled;
      // Автоматически сохраняем токен после успешной регистрации
      dispatch(setToken(data.access_token));
    } catch (error) {
      // Ошибка обработается автоматически
    }
  },
});
```

## Использование

### В компонентах

#### Логин

```tsx
import { useLoginMutation } from "@/entities/session";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    try {
      // Токен сохранится автоматически через onQueryStarted
      await login({ username, password }).unwrap();

      // Перенаправляем пользователя после успешного логина
      navigate("/");
    } catch (err) {
      // Обработка ошибки
      console.error("Login failed:", err);
    }
  };

  return (
    // UI компонент
  );
};
```

#### Регистрация

```tsx
import { useRegisterMutation } from "@/entities/session";
import { useNavigate } from "react-router";

const RegisterPage = () => {
  const [register, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleRegister = async (username: string, password: string) => {
    try {
      // Токен сохранится автоматически через onQueryStarted
      await register({ username, password }).unwrap();

      // Перенаправляем пользователя после успешной регистрации
      navigate("/character");
    } catch (err) {
      // Обработка ошибки
      console.error("Registration failed:", err);
    }
  };

  return (
    // UI компонент
  );
};
```

#### Выход из системы

```tsx
import { useDispatch } from "react-redux";
import { logout } from "@/entities/session";
import { useNavigate } from "react-router";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Удаляем токен из Redux и localStorage
    dispatch(logout());

    // Перенаправляем на страницу логина
    navigate("/login");
  };

  return <button onClick={handleLogout}>Выйти</button>;
};
```

#### Проверка статуса аутентификации

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

## Поток данных

### 1. Успешный логин/регистрация

```
User Action (submit form)
  ↓
useLoginMutation / useRegisterMutation
  ↓
API Request (POST /login or /register)
  ↓
Response: { access_token: "...", token_type: "Bearer" }
  ↓
onQueryStarted → dispatch(setToken(access_token))
  ↓
Auth Slice → Сохраняет токен в:
  - Redux store (state.auth.token)
  - localStorage ("access_token")
  ↓
Все последующие API запросы автоматически включают:
  Authorization: Bearer {token}
```

### 2. Последующие запросы

```
Any API Request
  ↓
baseApi prepareHeaders
  ↓
getState() → state.auth.token
  ↓
headers.set("Authorization", `Bearer ${token}`)
  ↓
Request with Authorization header
```

### 3. Выход из системы

```
User Action (click logout)
  ↓
dispatch(logout())
  ↓
Auth Slice → Удаляет токен из:
  - Redux store (state.auth.token = null)
  - localStorage (removeItem("access_token"))
  ↓
Последующие запросы отправляются без Authorization header
```

## Безопасность

### ✅ Что сделано правильно:

- Токен хранится в `localStorage`, а не в cookies (проще для SPA)
- Токен автоматически добавляется во все запросы
- Токен удаляется при логауте из всех мест
- Проверка `typeof window !== "undefined"` для SSR безопасности

### ⚠️ Рекомендации:

- Добавить обработку истечения токена (401 ответ → автоматический logout)
- Реализовать refresh token механизм для длительных сессий
- Добавить автоматический logout при закрытии браузера (sessionStorage вместо localStorage)

## Типы данных

### SessionResponse

```typescript
type SessionResponse = {
  access_token: string; // JWT токен
  token_type: string; // Обычно "Bearer"
};
```

### LoginRequest

```typescript
type LoginRequest = { username: string; password: string };
```

### RegisterRequest

```typescript
type RegisterRequest = { username: string; password: string };
```

## Troubleshooting

### Проблема: Токен не добавляется в запросы

**Решение:** Проверьте, что:

1. Токен сохранен в Redux store: `console.log(store.getState().auth.token)`
2. prepareHeaders вызывается: добавьте `console.log` в prepareHeaders
3. Токен не пустой и не null

### Проблема: Токен теряется после перезагрузки страницы

**Решение:** Проверьте, что:

1. `getInitialToken()` правильно читает из localStorage
2. Нет ошибок в консоли браузера
3. localStorage не очищается другим кодом

### Проблема: 401 Unauthorized после логина

**Решение:** Проверьте:

1. Формат токена в заголовке: должно быть `Bearer {token}`, а не просто `{token}`
2. Токен действительно пришел от сервера в ответе на login/register
3. Сервер ожидает токен именно в заголовке `Authorization`

## Примеры из кодовой базы

См. также:

- `app/pages/login/ui/login-page.tsx` - пример использования login
- `app/pages/register/ui/register-page.tsx` - пример использования register
- `app/entities/session/api/session.api.ts` - все auth endpoints
