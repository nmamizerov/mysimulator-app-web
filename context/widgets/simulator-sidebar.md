# SimulatorSidebar - Виджет навигации по курсу

## 📍 Расположение

`app/widgets/simulator-sidebar/`

## 📝 Описание

Виджет боковой панели для навигации по курсу в симуляторе. Отображает информацию о курсе, прогресс пользователя и сворачиваемый список уроков с симуляторами.

## 🎨 Структура

Виджет состоит из следующих элементов (сверху вниз):

1. **Лого курса** - изображение с соотношением сторон 16:9
2. **Название курса** - заголовок (`text-h5`)
3. **Прогресс бар** - визуализация прогресса с процентами
4. **Список уроков** - сворачиваемый список с симуляторами

## 🔧 Props

```typescript
interface SimulatorSidebarProps {
  course: Course; // Данные курса
  courseUser?: CourseUser; // Прогресс пользователя
  lessons: Lesson[]; // Список уроков
  currentLessonId: string; // ID текущего урока
  currentSimulatorId: string; // ID текущего симулятора
}
```

## 💡 Использование

### Базовое использование

```tsx
import { SimulatorSidebar } from "@/widgets/simulator-sidebar";
import { useGetCourseQuery, useGetCourseUserQuery } from "@/entities/course";
import { useGetLessonsQuery } from "@/entities/lesson";

export const SimulatorPage = ({ lessonId, simulatorId }) => {
  const { data: course } = useGetCourseQuery();
  const { data: courseUser } = useGetCourseUserQuery();
  const { data: lessons } = useGetLessonsQuery();

  return (
    <div className="flex h-screen">
      <SimulatorSidebar
        course={course}
        courseUser={courseUser}
        lessons={lessons}
        currentLessonId={lessonId}
        currentSimulatorId={simulatorId}
      />
      {/* Основной контент */}
    </div>
  );
};
```

## 🎯 Функциональность

### 1. Сворачивание уроков

По умолчанию все уроки свернуты. Пользователь может кликнуть на урок, чтобы развернуть/свернуть список симуляторов.

**Хук `useSidebar`:**

```typescript
const { toggleLesson, isLessonExpanded } = useSidebar();

// Переключить состояние урока
toggleLesson(lessonId);

// Проверить, раскрыт ли урок
const expanded = isLessonExpanded(lessonId);
```

### 2. Навигация

Клик на симулятор переводит пользователя на страницу симулятора:

```
/lesson/{lessonId}/simulator/{simulatorId}
```

### 3. Активный симулятор

Активный симулятор выделяется:

- Цвет текста: `text-primary`
- Фон: `bg-primary/10`
- Жирность шрифта: `font-medium`

### 4. Недоступные уроки

Уроки с `is_available: false`:

- Прозрачность: `opacity-50`
- Курсор: `cursor-not-allowed`
- Отключена интеракция

## 🎨 Стилизация

### Контейнер

```tsx
<aside className="w-[320px] bg-white border-r border-gray-200 h-screen overflow-y-auto flex-shrink-0">
```

### Лого курса

```tsx
<div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
  <img className="w-full h-full object-cover" />
</div>
```

### Название курса

```tsx
<h2 className="text-h5 text-gray-900 mb-3">{course.name}</h2>
```

### Прогресс

```tsx
<div className="flex justify-between items-center mb-2">
  <span className="text-caption text-gray-600">Прогресс</span>
  <span className="text-caption text-gray-900 font-medium">45%</span>
</div>
<Progress progress={45} />
```

### Урок

```tsx
<button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
  <span className="text-subtitle-2 text-gray-900">{lesson.name}</span>
  <ChevronRightIcon className="w-5 h-5 text-gray-400" />
</button>
```

### Симулятор (активный)

```tsx
<Link className="block px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium text-body-sm">
  {simulator.name}
</Link>
```

### Симулятор (неактивный)

```tsx
<Link className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 text-body-sm">
  {simulator.name}
</Link>
```

## 🔄 Логика раскрытия (useSidebar hook)

### Расположение

`app/widgets/simulator-sidebar/model/use-sidebar.ts`

### API

```typescript
export const useSidebar = () => {
  const [expandedLessons, setExpandedLessons] = useState<number[]>([]);

  const toggleLesson = useCallback((lessonId: number) => {
    // Переключить состояние урока
  }, []);

  const isLessonExpanded = useCallback(
    (lessonId: number) => expandedLessons.includes(lessonId),
    [expandedLessons]
  );

  return { expandedLessons, toggleLesson, isLessonExpanded };
};
```

### Использование

```tsx
const { toggleLesson, isLessonExpanded } = useSidebar();

<button onClick={() => toggleLesson(lesson.id)}>
  {lesson.name}
  <ChevronRightIcon
    className={isLessonExpanded(lesson.id) ? "rotate-90" : ""}
  />
</button>;
```

## 📱 Адаптивность

Сайдбар имеет фиксированную ширину `320px` и не адаптируется под мобильные устройства в текущей версии. Для мобильных версий рекомендуется скрывать сайдбар и показывать в модальном окне.

## ⚠️ Важные замечания

1. **Ширина:** Фиксированная ширина `320px`, используй `flex-shrink-0`
2. **Скролл:** Сайдбар скроллится независимо от основного контента (`overflow-y-auto`)
3. **Высота:** Занимает всю высоту экрана (`h-screen`)
4. **Иконки:** Используются иконки из `@heroicons/react/24/outline`
5. **Навигация:** Используется `Link` из `react-router` для SPA навигации

## 🎯 Best Practices

### Правильное использование в лейауте

```tsx
// ✅ Правильно
<div className="flex h-screen">
  <SimulatorSidebar {...props} />
  <main className="flex-1 overflow-y-auto">{/* Контент */}</main>
</div>
```

### Обработка состояния загрузки

```tsx
// ✅ Правильно
const { data: course, isLoading } = useGetCourseQuery();

if (isLoading || !course) {
  return <div>Загрузка...</div>;
}

return <SimulatorSidebar course={course} {...otherProps} />;
```

## 🔄 История изменений

- **2025-10-21**: Создан виджет `SimulatorSidebar` с хуком `useSidebar`
