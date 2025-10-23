# SSR Headers - Прокидывание заголовков хоста

## Описание

Система автоматического прокидывания заголовков хоста (`X-COURSE-HOST`, `COURSE-HOST`) во все API запросы как на сервере (SSR), так и на клиенте.

## Проблема

При SSR запросах к бэкенду не передавался хост, с которого пришел пользователь. Бэкенду нужен этот заголовок для определения правильного курса/домена.

## Решение

### 1. Базовая конфигурация API (`app/shared/api/index.ts`)

```typescript
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    credentials: "include",
    prepareHeaders: (headers, { endpoint, arg }) => {
      // На клиенте - добавляем хост из window.location
      if (typeof window !== "undefined") {
        const host = window.location.host;
        headers.set("X-COURSE-HOST", host);
        headers.set("COURSE-HOST", host);
      }

      // На сервере - берем из arg (переданных параметров)
      if (arg && typeof arg === "object" && "host" in arg) {
        const customHeaders = arg as Record<string, string>;
        Object.entries(customHeaders).forEach(([key, value]) => {
          if (value) {
            headers.set(key, value);
          }
        });
      }

      return headers;
    },
  }),
});
```

**Логика работы:**

- **На клиенте:** Автоматически берется `window.location.host` и добавляется в каждый запрос
- **На сервере:** Заголовки передаются через параметры запроса

### 2. SSR в Root Loader (`app/root.tsx`)

```typescript
export async function loader({ request }: Route.LoaderArgs) {
  // Получаем заголовки из входящего request
  const host =
    request.headers.get("host") || request.headers.get("x-forwarded-host");
  const cookieHeader = request.headers.get("cookie");

  // Формируем заголовки для передачи в API
  const headers: Record<string, string> = {};

  if (host) {
    headers["COURSE-HOST"] = host;
    headers["X-COURSE-HOST"] = host;
  }

  if (cookieHeader) {
    headers["cookie"] = cookieHeader;
  }

  // Передаем заголовки в API запрос
  const result = await store.dispatch(
    courseApi.endpoints.getCourse.initiate(headers)
  );

  return { course: result.data };
}
```

### 3. API Endpoints (`app/entities/course/api/course.api.ts`)

```typescript
export interface SSRHeaders {
  host?: string;
  cookie?: string;
  [key: string]: string | undefined;
}

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourse: builder.query<Course, SSRHeaders | void>({
      query: (headers) => ({ url: "/course", headers: headers || undefined }),
      providesTags: ["Course"],
    }),
  }),
});
```

## Использование

### В SSR (root.tsx или другие loaders)

```typescript
// Передаем заголовки как параметр
const result = await store.dispatch(
  courseApi.endpoints.getCourse.initiate({
    "COURSE-HOST": host,
    "X-COURSE-HOST": host,
    cookie: cookieHeader,
  })
);
```

### В клиентских компонентах

```typescript
// Заголовки добавятся автоматически!
const { data: course } = useGetCourseQuery();
```

## Передаваемые заголовки

| Заголовок       | Источник (клиент)       | Источник (сервер)               | Описание                |
| --------------- | ----------------------- | ------------------------------- | ----------------------- |
| `X-COURSE-HOST` | `window.location.host`  | `request.headers.get("host")`   | Хост курса              |
| `COURSE-HOST`   | `window.location.host`  | `request.headers.get("host")`   | Дублирующий хост        |
| `cookie`        | Автоматически браузером | `request.headers.get("cookie")` | Куки для аутентификации |

## Примечания

1. **Автоматическая подстановка на клиенте** - не нужно ничего делать в компонентах
2. **Явная передача на сервере** - передаем через параметры `initiate()`
3. **Fallback для хоста** - используется `x-forwarded-host` если нет основного `host`
4. **Типизация** - используется интерфейс `SSRHeaders` для type-safety

## Пример полного flow

### 1. Пользователь заходит на `https://example.com`

### 2. SSR на сервере

```typescript
// В root.tsx loader
const host = request.headers.get("host"); // "example.com"
const result = await store.dispatch(
  courseApi.endpoints.getCourse.initiate({
    "COURSE-HOST": "example.com",
    "X-COURSE-HOST": "example.com",
  })
);
// → Запрос на бэкенд с заголовками
```

### 3. Клиентская гидрация

```typescript
// В компоненте
const { data } = useGetCourseQuery();
// prepareHeaders автоматически добавит:
// X-COURSE-HOST: example.com
// COURSE-HOST: example.com
```

## Важно

- Всегда проверяй наличие `host` перед добавлением в заголовки
- На клиенте заголовки добавляются **автоматически**
- На сервере нужно **явно передать** через параметры
- Используй `SSRHeaders` интерфейс для новых endpoints, которым нужны заголовки
