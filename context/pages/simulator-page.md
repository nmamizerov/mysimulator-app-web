# SimulatorPage - Страница симулятора

## 📍 Расположение

`app/pages/simulator/ui/simulator-page.tsx`

## 📝 Описание

Страница для отображения и прохождения симулятора. Состоит из сайдбара с навигацией по курсу и основного контента с пройденными блоками.

## 🎨 Структура страницы

```
┌──────────────────────────────────────────┐
│  SimulatorSidebar (320px)  │  Content   │
│                             │            │
│  - Лого курса              │ Название   │
│  - Название курса          │ симулятора │
│  - Прогресс бар            │            │
│  - Список уроков           │ Блоки      │
│    ├─ Урок 1               │ (макс      │
│    │  ├─ Симулятор 1       │  896px)    │
│    │  └─ Симулятор 2       │            │
│    └─ Урок 2               │            │
│       └─ Симулятор 3       │            │
└──────────────────────────────────────────┘
```

## 🔧 Props

```typescript
interface SimulatorPageProps {
  lessonId: string; // ID урока (из URL)
  simulatorId: string; // ID симулятора (из URL)
}
```

## 💡 Использование

### В роутере

```tsx
// app/routes/lesson.$lessonId.simulator.$simulatorId/route.tsx
import { SimulatorPage } from "@/pages/simulator";

export default function Route({ params }) {
  return (
    <SimulatorPage
      lessonId={params.lessonId}
      simulatorId={params.simulatorId}
    />
  );
}
```

## 📊 API запросы

Страница использует следующие API endpoints:

```typescript
// Данные курса
const { data: course } = useGetCourseQuery();

// Прогресс пользователя по курсу
const { data: courseUser } = useGetCourseUserQuery();

// Список всех уроков курса
const { data: lessons } = useGetLessonsQuery();

// Данные текущего симулятора
const { data: simulator } = useGetSimulatorQuery({
  lessonId: Number(lessonId),
  simulatorId: Number(simulatorId),
});
```

## 🎯 Основной контент

### Лейаут

```tsx
<main className="flex-1 overflow-y-auto">
  <div className="max-w-[896px] mx-auto px-8 py-12">{/* Контент */}</div>
</main>
```

### Название симулятора

```tsx
<h1 className="text-h3 text-gray-900 mb-8">{simulator.name}</h1>
```

### Список блоков

```tsx
{
  simulator.user?.blocks && simulator.user.blocks.length > 0 ? (
    <div className="space-y-4">
      {simulator.user.blocks.map((userBlock) => (
        <BlockItem key={userBlock.id} block={userBlock} />
      ))}
    </div>
  ) : (
    <div className="text-center py-12">
      <p className="text-body text-gray-500">Вы еще не начали этот симулятор</p>
    </div>
  );
}
```

## 🔄 Состояния

### Загрузка

Пока данные загружаются, показывается индикатор:

```tsx
if (!course || !lessons || !simulator) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-body text-gray-500">Загрузка...</div>
    </div>
  );
}
```

### Нет блоков

Если пользователь еще не начал симулятор:

```tsx
<div className="text-center py-12">
  <p className="text-body text-gray-500">Вы еще не начали этот симулятор</p>
</div>
```

### Есть блоки

Отображается список пройденных блоков через компонент `BlockItem`.

## 🎨 Стилизация

### Основной контейнер

```tsx
<div className="flex h-screen bg-gray-50">
```

- Флекс-лейаут для размещения сайдбара и контента
- Полная высота экрана
- Светло-серый фон

### Контент

```tsx
<main className="flex-1 overflow-y-auto">
  <div className="max-w-[896px] mx-auto px-8 py-12">
```

- `flex-1` - занимает оставшееся пространство
- `overflow-y-auto` - независимый скролл
- `max-w-[896px]` - максимальная ширина контента
- `mx-auto` - центрирование
- `px-8 py-12` - отступы

## 📱 Адаптивность

В текущей версии страница не адаптирована под мобильные устройства. Рекомендации для мобильной версии:

```tsx
// Пример адаптивности
<div className="flex flex-col lg:flex-row h-screen">
  {/* Сайдбар скрыт на мобилке */}
  <div className="hidden lg:block">
    <SimulatorSidebar {...props} />
  </div>

  {/* Кнопка меню на мобилке */}
  <button className="lg:hidden">Menu</button>

  <main className="flex-1">{/* Контент */}</main>
</div>
```

## ⚠️ Важные замечания

1. **Типы:** `lessonId` и `simulatorId` приходят как строки из URL, конвертируются в `Number` для API
2. **Загрузка:** Обязательна проверка на наличие данных перед рендером
3. **Навигация:** Сайдбар использует React Router для SPA-навигации
4. **Скролл:** Сайдбар и контент скроллятся независимо

## 🔗 Связанные компоненты

- `SimulatorSidebar` - виджет навигации по курсу
- `BlockItem` - компонент отображения блока
- `Progress` - компонент прогресс-бара

## 🔗 Связанные API

- `courseApi` - получение данных курса
- `lessonApi` - получение списка уроков
- `simulatorApi` - получение данных симулятора

## 🎯 Best Practices

### Правильная обработка загрузки

```tsx
// ✅ Правильно
if (!course || !lessons || !simulator) {
  return <LoadingState />;
}

// ❌ Неправильно
return <SimulatorSidebar course={course} />; // может быть undefined
```

### Правильная типизация

```tsx
// ✅ Правильно
useGetSimulatorQuery({
  lessonId: Number(lessonId),
  simulatorId: Number(simulatorId),
});

// ❌ Неправильно
useGetSimulatorQuery({ lessonId, simulatorId }); // строки вместо чисел
```

## 🔄 Поток данных

```
URL (params)
    ↓
SimulatorPage (lessonId, simulatorId)
    ↓
API Queries (RTK Query)
    ↓
    ├─→ course (useGetCourseQuery)
    ├─→ courseUser (useGetCourseUserQuery)
    ├─→ lessons (useGetLessonsQuery)
    └─→ simulator (useGetSimulatorQuery)
    ↓
UI Components
    ├─→ SimulatorSidebar
    └─→ BlockItem (list)
```

## 🔄 История изменений

- **2025-10-21**: Создана страница `SimulatorPage` с интеграцией сайдбара и списка блоков
