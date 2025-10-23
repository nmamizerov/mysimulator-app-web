# useCourse Hook

## Описание

Кастомный хук для получения данных курса из root loader'а React Router. Используется для доступа к глобальным данным курса в любом компоненте приложения без необходимости дублирования кода.

## Расположение

```
app/shared/lib/hooks/use-course.ts
```

## Использование

```typescript
import { useCourse } from "@/shared/lib";

export const MyComponent = () => {
  const course = useCourse();

  return (
    <div>
      <h1>{course?.name}</h1>
      <p>{course?.description}</p>
    </div>
  );
};
```

## Возвращаемое значение

| Тип                   | Описание                                                                |
| --------------------- | ----------------------------------------------------------------------- |
| `Course \| undefined` | Данные курса из root loader'а или `undefined`, если данные не загружены |

## Примеры использования

### Базовое использование

```typescript
export const WelcomePage = () => {
  const course = useCourse();

  return (
    <div>
      <h1>Добро пожаловать на курс {course?.name || ""}</h1>
    </div>
  );
};
```

### Условный рендеринг

```typescript
export const CoursePage = () => {
  const course = useCourse();

  if (!course) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <h1>{course.name}</h1>
      <p>{course.description}</p>
    </div>
  );
};
```

### С опциональным отображением

```typescript
export const LoginPage = () => {
  const course = useCourse();

  return (
    <div>
      <h1>Вход в аккаунт</h1>
      <p>
        Добро пожаловать{" "}
        {course?.name ? (
          <>
            на курс <b>{course.name}</b>
          </>
        ) : null}
      </p>
    </div>
  );
};
```

## Технические детали

### Как работает

1. Использует `useMatches()` из React Router для получения всех активных роутов
2. Находит root роут по `id === "root"`
3. Извлекает данные курса из `loaderData` root роута
4. Типизирует данные как `{ course?: Course }`

### Почему используется loaderData вместо data

В React Router v7 свойство `data` помечено как устаревшее (deprecated). Вместо него следует использовать `loaderData`:

```typescript
// ❌ Устаревший способ
const course = (rootMatch?.data as { course?: Course })?.course;

// ✅ Правильный способ
const course = (rootMatch?.loaderData as { course?: Course })?.course;
```

## Преимущества

1. **DRY принцип**: Избегает дублирования кода получения курса
2. **Централизованная логика**: Вся логика доступа к данным курса в одном месте
3. **Типобезопасность**: TypeScript типизация возвращаемого значения
4. **Простота использования**: Один вызов хука вместо 3-4 строк кода
5. **Легкость в поддержке**: Если изменится способ получения данных, нужно обновить только хук

## Связанные файлы

- `app/root.tsx` - определяет loader с данными курса
- `app/shared/lib/hooks/index.ts` - экспорт хуков
- `app/shared/lib/index.ts` - главный экспорт shared/lib слоя

## История изменений

- **2025-10-21**: Создан хук для замены дублированного кода и исправления использования устаревшего `data` на `loaderData`
