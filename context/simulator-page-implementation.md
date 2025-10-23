# Реализация страницы симулятора

## 📅 Дата создания: 2025-10-21

## 📝 Описание

Полная реализация страницы симулятора с сайдбаром навигации и отображением пройденных блоков.

## ✅ Созданные компоненты

### 1. BlockItem - UI компонент блока

**Расположение:** `app/entities/block/ui/`

**Функциональность:**

- Отображение блоков без персонажа (простой HTML-текст)
- Отображение блоков с персонажем (аватарка + бабл)
- Автоматическая адаптация под тип блока

**Особенности:**

- Использует `dangerouslySetInnerHTML` для HTML контента
- Аватарка 64x64px, скругленная
- Бабл с белым фоном и рамкой
- Типографика: `text-subtitle-2` (имя), `text-caption` (роль), `text-body` (текст)

### 2. SimulatorSidebar - Виджет навигации

**Расположение:** `app/widgets/simulator-sidebar/`

**Структура:**

- Лого курса (16:9)
- Название курса
- Прогресс-бар с процентами
- Список уроков (сворачиваемый)
- Список симуляторов в каждом уроке

**Функциональность:**

- Сворачивание/разворачивание уроков по клику
- Навигация по симуляторам через React Router
- Выделение активного симулятора (`text-primary`, `bg-primary/10`)
- Блокировка недоступных уроков
- Иконка стрелки с анимацией поворота

**Хук useSidebar:**

- `toggleLesson(lessonId)` - переключить состояние урока
- `isLessonExpanded(lessonId)` - проверить состояние урока
- Хранит массив ID раскрытых уроков в `useState`

### 3. SimulatorPage - Страница симулятора

**Расположение:** `app/pages/simulator/ui/simulator-page.tsx`

**Props:**

- `lessonId: string` - из URL параметров
- `simulatorId: string` - из URL параметров

**API запросы:**

- `useGetCourseQuery()` - данные курса
- `useGetCourseUserQuery()` - прогресс пользователя
- `useGetLessonsQuery()` - список уроков
- `useGetSimulatorQuery()` - данные симулятора

**Лейаут:**

```
┌──────────────────────────────────────────┐
│ Sidebar │     Main Content               │
│ 320px   │     flex-1, max-w-896px        │
│         │     mx-auto                    │
└──────────────────────────────────────────┘
```

**Основной контент:**

- Название симулятора (`text-h3`)
- Список пройденных блоков (через `BlockItem`)
- Состояние "Вы еще не начали этот симулятор"

## 🎨 Дизайн система

### Цвета

- **Primary:** динамический из `--color-primary` (по умолчанию #009dc5)
- **Secondary:** динамический из `--color-secondary` (по умолчанию #2196F3)
- **Фон:** `bg-white`, `bg-gray-50`
- **Текст:** `text-gray-900`, `text-gray-700`, `text-gray-500`

### Размеры

- **Сайдбар:** фиксированная ширина `320px`
- **Контент:** максимальная ширина `896px`, центрирование
- **Аватарка:** `64x64px` (w-16 h-16)
- **Скругления:** `rounded-2xl` (бабл), `rounded-lg` (элементы списка)

### Типографика

Используется система типографики из `app.css`:

- **h3** - Название симулятора (30px, 600, 1.3)
- **h5** - Название курса (20px, 600, 1.4)
- **subtitle-2** - Имя персонажа, метки (14px, 500, 1.5)
- **body** - Основной текст (16px, 400, 1.5)
- **body-sm** - Симуляторы в списке (14px, 400, 1.5)
- **caption** - Роль персонажа, подсказки (12px, 400, 1.4)

## 📦 Зависимости

### Внешние

- `react` - библиотека UI
- `react-router` - навигация
- `@heroicons/react` - иконки
- `@reduxjs/toolkit` - RTK Query для API
- `clsx` - утилита для классов

### Внутренние

**Entities:**

- `@/entities/course` - Course, CourseUser, courseApi
- `@/entities/lesson` - Lesson, lessonApi
- `@/entities/simulator` - Simulator, simulatorApi
- `@/entities/block` - Block, UserBlock

**Entities:**

- `@/entities/block` - BlockItem компонент

**Shared:**

- `@/shared/ui/progress` - Progress компонент

**Widgets:**

- `@/widgets/simulator-sidebar` - SimulatorSidebar компонент

## 🚀 Использование

### Роут

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

### URL

```
/lesson/1/simulator/5
         ↑          ↑
      lessonId   simulatorId
```

## 🔄 Поток данных

```
URL Params
    ↓
SimulatorPage
    ↓
API Queries (RTK Query)
    ├─→ Course (logo, name, colors)
    ├─→ CourseUser (progress)
    ├─→ Lessons (список всех уроков)
    └─→ Simulator (текущий симулятор + блоки)
    ↓
UI Components
    ├─→ SimulatorSidebar
    │   └─→ useSidebar (логика раскрытия)
    └─→ BlockItem (список блоков)
```

## 📱 Адаптивность

**Текущая версия:**

- Десктоп ориентированная
- Сайдбар фиксированной ширины
- Контент центрирован с максимальной шириной

**Рекомендации для мобильной версии:**

- Скрыть сайдбар на мобилке
- Добавить кнопку меню
- Показывать сайдбар в модальном окне
- Адаптивная типографика

## ⚠️ Важные моменты

1. **Безопасность:** HTML рендерится через `dangerouslySetInnerHTML` - контент должен быть санитизирован на бэкенде
2. **Типы:** Параметры URL (строки) конвертируются в Number для API
3. **Загрузка:** Проверка наличия данных перед рендером
4. **Состояние:** Раскрытие уроков хранится в локальном state (сбрасывается при перезагрузке)
5. **Скролл:** Сайдбар и контент скроллятся независимо

## 🎯 Best Practices

### ✅ Правильно

```tsx
// Проверка данных
if (!course || !lessons) {
  return <LoadingState />;
}

// Типизация props
interface Props {
  lessonId: string;
  simulatorId: string;
}

// Конвертация типов для API
useGetSimulatorQuery({
  lessonId: Number(lessonId),
  simulatorId: Number(simulatorId),
});
```

### ❌ Неправильно

```tsx
// Нет проверки данных
<SimulatorSidebar course={course} />; // может быть undefined

// Неправильные типы
useGetSimulatorQuery({ lessonId, simulatorId }); // строки вместо чисел

// Прямой рендер HTML без компонента
<div dangerouslySetInnerHTML={{ __html: text }} />;
```

## 📚 Документация

- [BlockItem Component](./ui-components/block-item.md)
- [SimulatorSidebar Widget](./widgets/simulator-sidebar.md)
- [Simulator Page](./pages/simulator-page.md)
- [Typography System](./typography-system.md)

## 🔄 История изменений

- **2025-10-21**: Первая версия - создание всех компонентов и страницы
- **2025-10-21**: Перемещен `BlockItem` из `shared/ui` в `entities/block/ui` (правильное FSD расположение)
