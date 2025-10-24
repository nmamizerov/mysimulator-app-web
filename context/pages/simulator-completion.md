# Система завершения симулятора

## Обзор

Функционал поздравительной плашки при завершении симулятора с автоматическим определением следующего шага (переход к следующему симулятору, уроку или показ завершения курса).

**Расположение:** `app/pages/simulator/`

**Компоненты:**

- UI компонент: `ui/completion-banner.tsx`
- Логика навигации: `model/use-completion-navigation.ts`

## CompletionBanner - UI компонент

### Расположение

`app/pages/simulator/ui/completion-banner.tsx`

### Назначение

Отображает поздравительную плашку с соответствующим сообщением и кнопкой перехода (если применимо).

### Props

```typescript
interface CompletionBannerProps {
  type: "next-simulator" | "next-lesson" | "course-completed";
  onNext?: () => void;
}
```

- `type` - тип завершения, определяет контент плашки
- `onNext` - функция для перехода к следующему шагу (опционально)

### Варианты отображения

#### 1. next-simulator

**Когда показывается:** Пользователь завершил симулятор, но не последний в уроке

**Контент:**

- Заголовок: "Поздравляю, вы прошли главу!"
- Описание: "Отличная работа! Переходите к следующей главе."
- Кнопка: "Перейти к следующей"
- Иконка: Галочка в круге

#### 2. next-lesson

**Когда показывается:** Пользователь завершил последний симулятор в уроке

**Контент:**

- Заголовок: "Поздравляю, вы завершили урок!"
- Описание: "Превосходно! Вы готовы к следующему уроку."
- Кнопка: "Перейти к следующему уроку"
- Иконка: Звезда

#### 3. course-completed

**Когда показывается:** Пользователь завершил последний симулятор в последнем уроке

**Контент:**

- Заголовок: "Вы завершили курс!"
- Описание: "Поздравляем! Вы успешно прошли весь курс. Великолепная работа!"
- Кнопка: Отсутствует
- Иконка: Трофей

### Пример использования

```tsx
import { CompletionBanner } from "./completion-banner";

// В компоненте
{
  simulator.user?.completed && completionType && (
    <CompletionBanner type={completionType} onNext={handleNext} />
  );
}
```

### Стилизация

Компонент использует:

- `Card` из `@/shared/ui/card`
- `Button` из `@/shared/ui/button`
- Цветовая палитра: orange-500 (основной акцент), orange-200 (бордер), orange-50 (фон)
- Градиентный фон: `bg-linear-to-br from-orange-50 to-white`
- Адаптивная типографика: `text-h4 sm:text-h3` для заголовка

## useCompletionNavigation - Хук навигации

### Расположение

`app/pages/simulator/model/use-completion-navigation.ts`

### Назначение

Определяет тип завершения и предоставляет функцию для навигации к следующему шагу.

### Параметры

```typescript
useCompletionNavigation(
  lessons: Lesson[],
  currentLessonId: string,
  currentSimulatorId: string
)
```

- `lessons` - массив всех уроков курса
- `currentLessonId` - ID текущего урока
- `currentSimulatorId` - ID текущего симулятора

### Возвращаемое значение

```typescript
{
  completionType: "next-simulator" | "next-lesson" | "course-completed" | null;
  handleNext: () => void;
}
```

- `completionType` - тип завершения (null, если не удалось определить)
- `handleNext` - функция для перехода к следующему шагу

### Логика определения типа завершения

1. **Поиск текущего урока:**
   - Находим урок по `currentLessonId` в массиве `lessons`
   - Если не найден → возвращаем `null`

2. **Поиск текущего симулятора:**
   - Находим симулятор по `currentSimulatorId` в уроке
   - Если не найден → возвращаем `null`

3. **Проверка следующего симулятора:**
   - Если индекс симулятора < длины массива - 1:
     - **Тип:** `"next-simulator"`
     - **URL:** `/lesson/{currentLessonId}/simulator/{nextSimulatorId}`

4. **Проверка следующего урока:**
   - Если индекс урока < длины массива - 1:
     - **Тип:** `"next-lesson"`
     - **URL:** `/lesson/{nextLessonId}/simulator/{firstSimulatorId}`

5. **Курс завершен:**
   - Если это последний симулятор в последнем уроке:
     - **Тип:** `"course-completed"`
     - **URL:** `null`

### Пример использования

```tsx
import { useCompletionNavigation } from "../model/use-completion-navigation";

const SimulatorPage = ({ lessonId, simulatorId }: SimulatorPageProps) => {
  const { data: lessons } = useGetLessonsQuery();

  const { completionType, handleNext } = useCompletionNavigation(
    lessons || [],
    lessonId,
    simulatorId
  );

  return (
    <>
      {/* Основной контент */}

      {simulator.user?.completed && completionType && (
        <CompletionBanner type={completionType} onNext={handleNext} />
      )}
    </>
  );
};
```

## Интеграция в SimulatorPage

### Изменения в `app/pages/simulator/ui/simulator-page.tsx`

1. **Импорты:**

```tsx
import { CompletionBanner } from "./completion-banner";
import { useCompletionNavigation } from "../model/use-completion-navigation";
```

2. **Использование хука:**

```tsx
const { completionType, handleNext } = useCompletionNavigation(
  lessons || [],
  lessonId,
  simulatorId
);
```

3. **Отображение баннера:**

```tsx
{
  /* Плашка завершения симулятора */
}
{
  simulator.user?.completed && completionType && (
    <div className="mt-8">
      <CompletionBanner type={completionType} onNext={handleNext} />
    </div>
  );
}
```

### Условия показа

Баннер показывается только если **ОБЕ** условия выполнены:

- `simulator.user?.completed === true` - симулятор завершен
- `completionType !== null` - определен тип завершения

## Переносимость компонентов

Компоненты спроектированы для легкого переноса:

### CompletionBanner

- **Зависимости:** `@/shared/ui/card`, `@/shared/ui/button`
- **Переносится:** Копированием файла + обновлением импортов
- **Не зависит от:** Контекста страницы, Redux store, специфичной логики

### useCompletionNavigation

- **Зависимости:** `react-router` (useNavigate), `@/entities/lesson` (типы)
- **Переносится:** Копированием файла + обновлением импортов типов
- **Не зависит от:** Других хуков страницы, глобального состояния

## Типы данных

### Lesson

```typescript
type Lesson = {
  id: number;
  name: string;
  description: string;
  courseId: number;
  image?: string;
  is_available: boolean;
  simulators: SimulatorInLesson[];
  user?: LessonUser;
};
```

### SimulatorInLesson

```typescript
type SimulatorInLesson = {
  id: number;
  name: string;
};
```

### SimulatorUser

```typescript
type SimulatorUser = {
  completed: boolean;
  started: boolean;
  blocks: UserBlock[];
};
```

## Возможные улучшения

1. **Анимация появления:**
   - Добавить fade-in анимацию при показе баннера
   - Использовать Framer Motion или CSS transitions

2. **Конфетти при завершении курса:**
   - Добавить эффект конфетти для типа `course-completed`
   - Библиотека: `react-confetti`

3. **Прогресс курса:**
   - Показать процент прохождения курса в баннере
   - Добавить визуальный прогресс-бар

4. **Сохранение достижений:**
   - Интегрировать с системой достижений
   - Показать полученные награды

5. **Кастомизация сообщений:**
   - Вынести тексты в конфигурацию
   - Поддержка i18n для мультиязычности

## Связанные файлы

- `/app/pages/simulator/ui/simulator-page.tsx` - основная страница
- `/app/pages/simulator/ui/mobile-header.tsx` - мобильный хедер
- `/app/entities/lesson/model/types.ts` - типы уроков
- `/app/entities/simulator/model/types.ts` - типы симулятора
- `/app/shared/ui/card/card.tsx` - Card компонент
- `/app/shared/ui/button/button.tsx` - Button компонент

## FAQ

**Q: Что если у урока нет симуляторов?**
A: Хук вернет `completionType: null`, баннер не будет показан.

**Q: Можно ли использовать баннер на других страницах?**
A: Да, компонент полностью самодостаточен. Просто передайте правильный `type` и `onNext`.

**Q: Как протестировать разные варианты баннера?**
A: Временно измените условие `simulator.user?.completed` на `true` и проверьте разные позиции симуляторов в уроке.

**Q: Баннер показывается сразу при загрузке?**
A: Да, если `simulator.user.completed === true`. Для анимации добавьте CSS transitions.
