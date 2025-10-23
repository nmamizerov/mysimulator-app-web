# FSD Структура проекта MySimulator

## Обзор

Проект использует **Feature-Sliced Design (FSD)** архитектуру, адаптированную под React Router v7.

## Структура папок

```
app/
├── pages/              # Слой страниц (UI компоненты)
│   ├── home/          # Главная страница
│   ├── login/         # Страница входа
│   ├── register/      # Страница регистрации
│   └── simulator/     # Страница симулятора
├── routes/            # Роуты React Router
│   ├── home/
│   ├── login/
│   ├── register/
│   └── lesson.$lessonId.simulator.$simulatorId/
├── shared/            # Общие модули
│   ├── api/          # API слой
│   ├── lib/          # Библиотеки (types, utils)
│   └── ui/           # UI компоненты
├── routes.ts         # Конфигурация роутов
└── root.tsx          # Корневой компонент
```

## Принципы архитектуры

### 1. Разделение ответственности

- **Роуты (`app/routes/`)**: Отвечают за конфигурацию React Router (meta, loader, action)
- **Страницы (`app/pages/`)**: Содержат UI компоненты и бизнес-логику страниц
- **Shared (`app/shared/`)**: Общие модули, переиспользуемые компоненты

### 2. Folder-based роуты

Каждый роут находится в отдельной папке с файлом `route.tsx`:

```
app/routes/login/
└── route.tsx
```

### 3. Структура страницы

Каждая страница имеет следующую структуру:

```
app/pages/login/
├── ui/
│   ├── login-page.tsx  # Основной компонент
│   └── index.ts        # Экспорт UI
└── index.ts            # Главный экспорт
```

## Созданные страницы

### 1. Главная страница `/`

**Роут:** `app/routes/home/route.tsx`
**UI:** `app/pages/home/ui/home-page.tsx`

### 2. Страница входа `/login`

**Роут:** `app/routes/login/route.tsx`
**UI:** `app/pages/login/ui/login-page.tsx`

### 3. Страница регистрации `/register`

**Роут:** `app/routes/register/route.tsx`
**UI:** `app/pages/register/ui/register-page.tsx`

### 4. Страница симулятора `/lesson/:lessonId/simulator/:simulatorId`

**Роут:** `app/routes/lesson.$lessonId.simulator.$simulatorId/route.tsx`
**UI:** `app/pages/simulator/ui/simulator-page.tsx`

**Динамические параметры:**

- `lessonId` - ID урока
- `simulatorId` - ID симулятора

## Конфигурация роутов

Все роуты регистрируются в `app/routes.ts`:

```typescript
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Главная страница
  index("routes/home/route.tsx"),

  // Страницы аутентификации
  route("login", "routes/login/route.tsx"),
  route("register", "routes/register/route.tsx"),

  // Страница симулятора с динамическими параметрами
  route(
    "lesson/:lessonId/simulator/:simulatorId",
    "routes/lesson.$lessonId.simulator.$simulatorId/route.tsx"
  ),
] satisfies RouteConfig;
```

## Shared слой

### API (`app/shared/api/`)

Базовая настройка API с:

- `API_BASE_URL` - базовый URL API
- `fetcher` - функция для HTTP запросов

### Lib (`app/shared/lib/`)

#### Types (`types.ts`)

Глобальные интерфейсы:

- `User` - пользователь
- `Lesson` - урок
- `Simulator` - симулятор

#### Utils (`utils/index.ts`)

Утилиты:

- `formatDate` - форматирование дат
- `cn` - объединение CSS классов

### UI (`app/shared/ui/`)

Пока пустой, готов для добавления переиспользуемых компонентов.

Следующие шаги

1. Добавить логику аутентификации
2. Создать компоненты в `shared/ui`
3. Настроить RTK Query в `shared/api`
4. Добавить state management
5. Реализовать интерактивные симуляторы
