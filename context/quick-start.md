# Быстрый старт - MySimulator

## Запуск проекта

```bash
# Установка зависимостей (если еще не установлены)
npm install

# Запуск dev сервера
npm run dev
```

## Доступные роуты

После запуска доступны следующие страницы:

- **`/`** - Главная страница (landing)
- **`/login`** - Страница входа
- **`/register`** - Страница регистрации
- **`/lesson/1/simulator/1`** - Пример страницы симулятора (замените ID)

## Как добавить новую страницу

### 1. Создайте UI компонент

```
app/pages/your-page/
├── ui/
│   ├── your-page.tsx
│   └── index.ts
└── index.ts
```

**`app/pages/your-page/ui/your-page.tsx`:**

```typescript
export const YourPage = () => {
  return (
    <div>
      <h1>Your Page</h1>
    </div>
  );
};
```

**`app/pages/your-page/ui/index.ts`:**

```typescript
export { YourPage } from "./your-page";
```

**`app/pages/your-page/index.ts`:**

```typescript
export { YourPage } from "./ui";
```

### 2. Создайте роут

**`app/routes/your-page/route.tsx`:**

```typescript
import type { Route } from "./+types/route";
import { YourPage } from "../../pages/your-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Your Page | MySimulator" },
    { name: "description", content: "Page description" },
  ];
};

export default function YourPageRoute() {
  return <YourPage />;
}
```

### 3. Зарегистрируйте роут

Добавьте в **`app/routes.ts`:**

```typescript
route("your-page", "routes/your-page/route.tsx"),
```

## Динамические роуты

Для роутов с параметрами используйте синтаксис `:paramName`:

```typescript
// URL: /lesson/:lessonId/simulator/:simulatorId
route(
  "lesson/:lessonId/simulator/:simulatorId",
  "routes/lesson.$lessonId.simulator.$simulatorId/route.tsx"
);
```

В компоненте получите параметры через `params`:

```typescript
export default function Component({ params }: Route.ComponentProps) {
  const { lessonId, simulatorId } = params;
  // использовать параметры
}
```

## Навигация между страницами

Используйте компонент `Link` из `react-router`:

```typescript
import { Link } from "react-router";

<Link to="/login">Войти</Link>
<Link to="/lesson/1/simulator/2">Урок 1, Симулятор 2</Link>
```

Программная навигация:

```typescript
import { useNavigate } from "react-router";

const navigate = useNavigate();
navigate("/login");
```

## Shared компоненты

### Использование UI компонентов

**Доступные компоненты:**

```typescript
import { Button, Input } from "@/shared/ui";

// Button
<Button variant="primary" size="lg" fullWidth>
  Войти
</Button>

// Input
<Input
  label="Email"
  type="email"
  placeholder="example@mail.com"
/>
```

**Добавление нового UI компонента:**

1. Создайте файл в `app/shared/ui/my-component/my-component.tsx`
2. Экспортируйте в `app/shared/ui/my-component/index.ts`
3. Добавьте в `app/shared/ui/index.ts`:

```typescript
export { MyComponent } from "./my-component";
```

### Использование утилит

```typescript
import { formatDate, cn } from "../shared/lib";

const date = formatDate(new Date()); // "21.10.2025"
const classes = cn("text-base", condition && "font-bold"); // "text-base font-bold"
```

### Работа с API и данными

**Использование Redux (рекомендуется):**

```typescript
import { useGetCourseQuery } from "@/entities/course";

export const MyComponent = () => {
  const { data: course, isLoading, error } = useGetCourseQuery();

  return <div>{course?.name}</div>;
};
```

**Прямые запросы:**

```typescript
import { fetcher, API_BASE_URL } from "../shared/api";

const data = await fetcher<User>("/users/me");
```

📖 Подробнее: [context/working-with-loaders.md](./working-with-loaders.md)

## Стилизация

Проект использует **Tailwind CSS**. Все стили должны быть написаны через утилитарные классы.

### Цветовая палитра

- **Primary:** `var(--color-primary)` или класс `text-primary` / `bg-primary`
- **Secondary:** `var(--color-secondary)` или класс `text-secondary` / `bg-secondary`
- **Backgrounds:** `gray-50`, `gray-100`
- **Text:** `gray-900`, `gray-700`, `gray-600`

### Шрифтовая система

Проект имеет готовую систему типографики. Просто используй нужный класс:

```typescript
// Заголовки
<h1 className="text-h1">Главный заголовок</h1>
<h2 className="text-h2">Заголовок секции</h2>
<h3 className="text-h3">Подзаголовок</h3>

// Основной текст
<p className="text-body">Обычный параграф</p>
<p className="text-body-sm">Маленький текст</p>

// Вспомогательный
<span className="text-caption">Подпись</span>
<button className="text-button">Кнопка</button>
```

**Все доступные классы:** `text-h1`, `text-h2`, `text-h3`, `text-h4`, `text-h5`, `text-h6`, `text-subtitle-1`, `text-subtitle-2`, `text-body`, `text-body-lg`, `text-body-sm`, `text-caption`, `text-overline`, `text-button`, `text-button-lg`, `text-display-1`, `text-display-2`, `text-code`

📖 Подробнее: [context/typography-system.md](./typography-system.md)

### Пример стилизации кнопки

```typescript
<button className="text-button bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90">
  Click me
</button>
```

## Типизация

Добавляйте глобальные типы в `app/shared/lib/types.ts`:

```typescript
export interface MyType {
  id: string;
  name: string;
}
```

Используйте в компонентах:

```typescript
import type { MyType } from "../../shared/lib/types";
```

## Структура проекта

```
app/
├── pages/       # UI компоненты страниц
├── routes/      # React Router роуты
├── shared/      # Общие модули
│   ├── api/    # API клиент
│   ├── lib/    # Типы и утилиты
│   └── ui/     # Переиспользуемые компоненты
├── routes.ts   # Конфигурация роутов
└── root.tsx    # Корневой компонент
```

## Полезные ссылки

- [React Router v7 Docs](https://reactrouter.com)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [FSD Architecture](https://feature-sliced.design)
