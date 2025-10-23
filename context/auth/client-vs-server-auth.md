# Клиентская vs Серверная аутентификация

## Обзор

В проекте была выполнена миграция с **серверной** проверки токена (в cookies) на **клиентскую** проверку токена (в localStorage через Redux).

## Что изменилось

### ❌ Старый подход (серверная проверка)

#### Хранение токена
- Токен хранился в **httpOnly cookie**
- Устанавливался сервером при login/register
- Автоматически отправлялся с каждым запросом

#### Проверка авторизации
```typescript
// app/root.tsx - loader (выполняется на сервере)
export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("cookie");
  const pathname = new URL(request.url).pathname;

  if (!publicPaths.includes(pathname)) {
    const hasToken = cookieHeader?.includes("access_token=");

    if (!hasToken) {
      throw redirect("/login"); // SSR редирект
    }
  }

  return { course: result.data };
}
```

#### API запросы
```typescript
// credentials: "include" для отправки cookies
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    credentials: "include", // ← Отправка cookies
  }),
});
```

### ✅ Новый подход (клиентская проверка)

#### Хранение токена
- Токен хранится в **localStorage**
- Синхронизируется с **Redux store**
- Отправляется в заголовке `Authorization: Bearer {token}`

#### Проверка авторизации
```typescript
// app/shared/lib/hooks/use-auth-guard.ts (выполняется на клиенте)
export const useAuthGuard = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPublicPath && !isAuthenticated) {
      navigate("/login", { replace: true }); // Клиентский редирект
    }
  }, [isAuthenticated, location.pathname]);
};

// app/core/layout/appLayout.tsx
export const AppLayout = () => {
  useAuthGuard(); // ← Вызов хука для проверки
  return <Outlet />;
};
```

#### API запросы
```typescript
// Токен добавляется в заголовок Authorization
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // ← JWT токен
      }

      return headers;
    },
  }),
});
```

## Сравнение

| Аспект | Серверная проверка (Старое) | Клиентская проверка (Новое) |
|--------|----------------------------|------------------------------|
| **Хранение токена** | httpOnly cookie | localStorage + Redux |
| **Передача токена** | Автоматически в cookies | Заголовок `Authorization: Bearer` |
| **Проверка авторизации** | В `loader` функции (SSR) | В хуке `useAuthGuard` (клиент) |
| **Редирект** | `throw redirect()` (SSR) | `navigate()` (клиент) |
| **Скорость** | Медленнее (ждем SSR) | Быстрее (клиентский JS) |
| **Доступ к токену** | Недоступен из JS | Доступен из JS |
| **Безопасность XSS** | Защищен (httpOnly) | Уязвим (но можно защитить) |
| **Работа с SPA** | Ограничена | Отлично |
| **Mobile apps** | Сложно | Легко (просто JWT) |

## Плюсы и минусы

### Старый подход (httpOnly cookies)

#### ✅ Плюсы
- Защита от XSS атак (httpOnly cookie недоступен из JS)
- Автоматическая отправка с запросами
- Не нужно вручную управлять токеном

#### ❌ Минусы
- Медленная проверка на сервере (SSR)
- Сложнее работать с mobile приложениями
- Проблемы с CORS
- Нельзя получить токен из JS для отладки
- Привязка к cookie-based аутентификации

### Новый подход (localStorage + JWT)

#### ✅ Плюсы
- Быстрая клиентская проверка
- Легко работать с mobile apps (просто JWT)
- Полный контроль над токеном
- Нет проблем с CORS
- Можно отлаживать (доступ из JS)
- Стандартный Bearer token подход

#### ❌ Минусы
- Уязвим к XSS атакам (если не защищен)
- Нужно вручную управлять токеном
- Токен виден в DevTools

## Как защититься от XSS при использовании localStorage

### 1. Content Security Policy (CSP)

Добавь в HTML:
```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self' 'unsafe-inline'"
/>
```

### 2. Sanitize user input

Всегда очищай пользовательский ввод:
```typescript
import DOMPurify from "dompurify";

const clean = DOMPurify.sanitize(userInput);
```

### 3. Используй React правильно

React автоматически защищает от XSS:
```tsx
// ✅ Безопасно - React экранирует
<div>{userInput}</div>

// ❌ Опасно - не используй!
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

### 4. HTTPS везде

- Всегда используй HTTPS
- Токен передается в заголовке, а не в URL

### 5. Short-lived tokens

- Используй короткий срок жизни токена (например, 15 минут)
- Реализуй refresh token механизм

### 6. Logout при закрытии

```typescript
// Очистка токена при закрытии браузера
window.addEventListener("beforeunload", () => {
  if (!rememberMe) {
    localStorage.removeItem("access_token");
  }
});
```

## Миграция с cookies на localStorage

### Шаг 1: Обновить backend

Сервер должен возвращать токен в ответе:
```json
// POST /login
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer"
}
```

### Шаг 2: Создать auth slice

```typescript
// app/entities/session/model/auth.slice.ts
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: getInitialToken(),
    isAuthenticated: !!getInitialToken(),
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("access_token", action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("access_token");
    },
  },
});
```

### Шаг 3: Обновить API

```typescript
// app/shared/api/index.ts
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
});
```

### Шаг 4: Убрать серверную проверку

```typescript
// app/root.tsx - УДАЛИТЬ
export async function loader({ request }: Route.LoaderArgs) {
  // ❌ Удалить эту проверку
  // if (!publicPaths.includes(pathname)) {
  //   const hasToken = cookieHeader?.includes("access_token=");
  //   if (!hasToken) {
  //     throw redirect("/login");
  //   }
  // }

  return { course: result.data };
}
```

### Шаг 5: Добавить клиентскую проверку

```typescript
// app/core/layout/appLayout.tsx
export const AppLayout = () => {
  useAuthGuard(); // ← Добавить
  return <Outlet />;
};
```

### Шаг 6: Обновить login/register

```typescript
// Автоматическое сохранение токена
export const sessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({ url: "/login", method: "POST", body }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setToken(data.access_token)); // ← Сохранить токен
      },
    }),
  }),
});
```

## Когда использовать что?

### Используй localStorage + JWT (новый подход) если:
- ✅ Строишь SPA (Single Page Application)
- ✅ Планируешь mobile приложение
- ✅ Нужна быстрая клиентская проверка
- ✅ Хочешь стандартный Bearer token подход
- ✅ Нужен доступ к токену из JS

### Используй httpOnly cookies (старый подход) если:
- ✅ Очень высокие требования к безопасности
- ✅ Не можешь защититься от XSS
- ✅ Не нужна работа с mobile apps
- ✅ SSR критична для SEO

## Гибридный подход (best of both)

Можно комбинировать оба подхода:

1. **Access token** - короткоживущий (15 мин) в localStorage
2. **Refresh token** - долгоживущий (7 дней) в httpOnly cookie
3. При истечении access token - обновить через refresh token

```typescript
// Автообновление токена при 401
const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // Пробуем обновить токен
    const refreshResult = await baseQuery("/refresh", api, extraOptions);

    if (refreshResult.data) {
      // Сохраняем новый токен
      api.dispatch(setToken(refreshResult.data.access_token));

      // Повторяем запрос
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Не удалось обновить - выходим
      api.dispatch(logout());
    }
  }

  return result;
};
```

## Итог

**Новый подход (клиентская проверка + localStorage):**
- ✅ Быстрее
- ✅ Проще
- ✅ Гибче
- ✅ Лучше для SPA
- ⚠️ Требует защиты от XSS

**Рекомендация:** Используй новый подход с правильной защитой от XSS (CSP, sanitize input, short-lived tokens).

## Связанные документы

- [auth-system.md](./auth-system.md) - Система аутентификации
- [use-auth-guard.md](../hooks/use-auth-guard.md) - Хук для защиты роутов
- [auth-quick-guide.md](./auth-quick-guide.md) - Быстрый гайд

