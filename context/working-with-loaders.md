# Работа с Loaders и данными в React Router v7

## 📝 Обзор

В проекте используется React Router v7 с поддержкой loaders для загрузки данных на сервере. Есть несколько способов доступа к данным из разных loaders.

## 🎯 Структура загрузки данных

```
Root Loader (app/root.tsx)
    ↓
    Загружает данные курса и проверяет аутентификацию
    ↓
    Данные доступны через Redux Store
    ↓
Route Loaders (app/routes/*/route.tsx)
    ↓
    Могут загружать дополнительные данные для конкретной страницы
```

## 📦 Root Loader

**Расположение:** `app/root.tsx`

```typescript
export async function loader({ request }: Route.LoaderArgs) {
  // Загружаем данные курса через RTK Query
  const result = await store.dispatch(courseApi.endpoints.getCourse.initiate());

  // Проверяем аутентификацию
  const url = new URL(request.url);
  const pathname = url.pathname;
  const publicPaths = ["/login", "/register"];

  if (!publicPaths.includes(pathname)) {
    const cookieHeader = request.headers.get("cookie");
    const hasToken = cookieHeader?.includes("access_token=");

    if (!hasToken) {
      throw redirect("/login");
    }
  }

  return { course: result.data };
}
```

## 🔧 Способы доступа к данным

### ✅ Способ 1: Redux Store (Рекомендуется)

**Когда использовать:** Для глобальных данных (курс, пользователь, настройки)

**Преимущества:**

- ✅ Данные доступны в любом компоненте
- ✅ Автоматическое кеширование
- ✅ Не нужно дублировать запросы
- ✅ RTK Query управляет состоянием загрузки

**Пример:**

```typescript
// app/pages/login/ui/login-page.tsx
import { useGetCourseQuery } from "@/entities/course";

export const LoginPage = () => {
    // Получаем данные из Redux (уже загружены в root loader)
    const { data: course, isLoading, error } = useGetCourseQuery();

    console.log('Course:', course);

    return (
        <div>
            <h1>Вход в аккаунт</h1>
            <p>
                {course?.name
                    ? `Добро пожаловать на курс ${course.name}`
                    : 'Добро пожаловать'
                }
            </p>
        </div>
    );
};
```

**Доступные поля курса:**

```typescript
interface Course {
  id: string;
  name: string; // Название курса
  description: string; // Описание
  colors?: {
    // Кастомные цвета
    primary: string;
    secondary: string;
  };
  // ... другие поля
}
```

### 📝 Способ 2: useMatches() - для данных родительских роутов

**Когда использовать:** Редко, когда нужны данные из loader родительского роута

**Пример:**

```typescript
// app/routes/some-page/route.tsx
import { useMatches } from "react-router";

export default function SomePage() {
    const matches = useMatches();

    // Получаем данные из root loader
    const rootData = matches.find(match => match.id === "root")?.data;

    console.log('Root data:', rootData);
    console.log('Course:', rootData?.course);

    return <div>Page content</div>;
}
```

### 📄 Способ 3: Собственный Loader

**Когда использовать:** Для специфичных данных конкретной страницы

**Пример:**

```typescript
// app/routes/dashboard/route.tsx
import { useLoaderData } from "react-router";
import type { Route } from "./+types/route";
import { store } from "@/core/store";

// Loader для страницы dashboard
export async function loader({ request }: Route.LoaderArgs) {
    // Можно использовать store для запросов
    const stats = await fetch('/api/user/stats');

    return {
        stats: await stats.json(),
        timestamp: new Date().toISOString(),
    };
}

export default function Dashboard() {
    const { stats, timestamp } = useLoaderData<typeof loader>();

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Stats loaded at: {timestamp}</p>
        </div>
    );
}
```

## 💡 Практические примеры

### Пример 1: Использование данных курса в Header

```typescript
// app/widgets/header/ui/header.tsx
import { useGetCourseQuery } from "@/entities/course";

export const Header = () => {
    const { data: course } = useGetCourseQuery();

    return (
        <header className="bg-white shadow">
            <div className="container mx-auto px-4 py-4">
                <h1 className="text-h4">
                    {course?.name || 'Курс'}
                </h1>
            </div>
        </header>
    );
};
```

### Пример 2: Условный рендеринг по данным

```typescript
// app/pages/home/ui/home-page.tsx
import { useGetCourseQuery } from "@/entities/course";

export const HomePage = () => {
    const { data: course, isLoading } = useGetCourseQuery();

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            <h1 className="text-h1">{course?.name}</h1>
            <p className="text-body">{course?.description}</p>
        </div>
    );
};
```

### Пример 3: Использование в форме

```typescript
// app/pages/profile/ui/profile-page.tsx
import { useGetCourseQuery } from "@/entities/course";
import { Input } from "@/shared/ui";

export const ProfilePage = () => {
    const { data: course } = useGetCourseQuery();

    return (
        <form>
            <Input
                label="Название курса"
                defaultValue={course?.name}
                disabled
            />
            <Input
                label="Email"
                helperText={`Используется для курса "${course?.name}"`}
            />
        </form>
    );
};
```

## 🎨 Работа с динамическими цветами

Цвета курса автоматически применяются в root.tsx:

```typescript
// app/root.tsx
export default function App() {
  const { course } = useLoaderData<typeof loader>();

  useEffect(() => {
    if (course?.colors) {
      const root = document.documentElement;
      Object.entries(course.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
      });
    }
  }, [course?.colors]);

  return <Provider store={store}><Outlet /></Provider>;
}
```

Использование в компонентах:

```tsx
// Автоматически используют цвета из course.colors
<div className="bg-primary text-white">
  <h1 className="text-h1">Заголовок</h1>
</div>

// В CSS переменных
<button style={{ backgroundColor: 'var(--color-primary)' }}>
  Кнопка
</button>
```

## 🔒 Защита роутов

Root loader автоматически проверяет аутентификацию:

```typescript
const publicPaths = ["/login", "/register"];

if (!publicPaths.includes(pathname)) {
  const cookieHeader = request.headers.get("cookie");
  const hasToken = cookieHeader?.includes("access_token=");

  if (!hasToken) {
    throw redirect("/login");
  }
}
```

**Как добавить новый публичный роут:**

```typescript
// app/root.tsx
const publicPaths = [
  "/login",
  "/register",
  "/forgot-password", // ← Добавь сюда
];
```

## 📊 Типизация данных

```typescript
// Типизация loader данных
import type { Route } from "./+types/route";

export async function loader({ request }: Route.LoaderArgs) {
  return { data: "some data" };
}

// В компоненте
export default function Page() {
  const loaderData = useLoaderData<typeof loader>();
  // loaderData автоматически типизирован
}
```

## ⚠️ Важные замечания

### 1. Кеширование RTK Query

```typescript
// Данные кешируются автоматически
const { data: course } = useGetCourseQuery();

// При повторном вызове - данные берутся из кеша
const { data: sameCourse } = useGetCourseQuery();
```

### 2. Инвалидация данных

```typescript
// Принудительная перезагрузка
const { data: course, refetch } = useGetCourseQuery();

const handleRefresh = () => {
  refetch(); // Загрузит данные заново
};
```

### 3. Обработка ошибок

```typescript
const { data: course, error, isError } = useGetCourseQuery();

if (isError) {
  return <div>Ошибка загрузки: {error.message}</div>;
}
```

## 🚀 Best Practices

1. **Используй Redux для глобальных данных**

   ```tsx
   ✅ const { data: course } = useGetCourseQuery();
   ❌ const course = useLoaderData().course;
   ```

2. **Создавай отдельные loaders для специфичных данных**

   ```tsx
   // Хорошо
   export async function loader() {
     return { pageSpecificData: ... };
   }
   ```

3. **Проверяй наличие данных**

   ```tsx
   ✅ {course?.name || 'Default'}
   ❌ {course.name}
   ```

4. **Обрабатывай состояния загрузки**

   ```tsx
   const { data, isLoading, error } = useGetCourseQuery();

   if (isLoading) return <Loader />;
   if (error) return <Error />;
   ```

## 📚 Полезные ссылки

- [React Router v7 Docs](https://reactrouter.com)
- [RTK Query Docs](https://redux-toolkit.js.org/rtk-query/overview)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)

## 🔄 История изменений

- **2025-10-21**: Создана документация по работе с loaders
