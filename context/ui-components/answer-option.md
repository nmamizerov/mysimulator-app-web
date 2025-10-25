# AnswerOption - Компонент варианта ответа

## 📋 Обзор

**AnswerOption** - переиспользуемый UI компонент из слоя `shared/ui/` для отображения варианта ответа в симуляторе. Поддерживает два режима работы: интерактивный выбор и отображение результатов с цветовой индикацией правильности.

## 📍 Расположение

```
app/shared/ui/answer-option/
├── answer-option.tsx    # Основной компонент
└── index.ts            # Экспорты
```

## 🎯 Назначение

Компонент создан для:

- **Отображения вариантов ответа** в тестовых блоках симулятора
- **Интерактивного выбора** ответа пользователем
- **Визуализации результатов** после проверки ответа
- **Поддержки одиночного и множественного выбора**

## 🔧 Props

```typescript
interface AnswerOptionProps {
  /**
   * Текст варианта ответа
   */
  children: string;

  /**
   * Статус ответа (для режима отображения результатов)
   */
  status?: AnswerStatus;

  /**
   * Режим отображения результатов
   */
  isResultMode?: boolean;

  /**
   * Растягивать на всю ширину
   */
  fullWidth?: boolean;

  /**
   * Вариант выбран (для режима множественного выбора)
   */
  isSelected?: boolean;

  /**
   * Состояние загрузки
   */
  isLoading?: boolean;

  /**
   * Обработчик клика
   */
  onClick?: () => void;

  /**
   * Дополнительные CSS классы
   */
  className?: string;
}

export type AnswerStatus =
  | "selected-correct"
  | "selected-wrong"
  | "not-selected-correct"
  | "not-selected-wrong"
  | null;
```

## 📊 Типы статусов (AnswerStatus)

| Статус                 | Описание                            | Визуальное отображение |
| ---------------------- | ----------------------------------- | ---------------------- |
| `selected-correct`     | Выбран пользователем и правильный   | 🟢 Зеленый закрашенный |
| `selected-wrong`       | Выбран пользователем и неправильный | 🔴 Красный закрашенный |
| `not-selected-correct` | Не выбран, но правильный            | ✅ Зеленый outlined    |
| `not-selected-wrong`   | Не выбран и неправильный            | ❌ Красный outlined    |
| `null`                 | Статус не определен                 | Стандартный вид        |

## 💡 Примеры использования

### 1. Режим выбора (одиночный выбор)

```typescript
import { AnswerOption } from "@/shared/ui";

// В компоненте
<AnswerOption onClick={() => handleSelect("Вариант А")}>
  Вариант А
</AnswerOption>

<AnswerOption onClick={() => handleSelect("Вариант Б")}>
  Вариант Б
</AnswerOption>
```

### 2. Режим выбора (множественный выбор)

```typescript
const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

<AnswerOption
  isSelected={selectedAnswers.includes("Вариант А")}
  onClick={() => toggleAnswer("Вариант А")}
>
  Вариант А
</AnswerOption>

<AnswerOption
  isSelected={selectedAnswers.includes("Вариант Б")}
  onClick={() => toggleAnswer("Вариант Б")}
>
  Вариант Б
</AnswerOption>
```

### 3. Режим отображения результатов (правильный выбранный ответ)

```typescript
<AnswerOption isResultMode status="selected-correct">
  Правильный ответ (выбран)
</AnswerOption>
```

### 4. Режим отображения результатов (неправильный выбранный ответ)

```typescript
<AnswerOption isResultMode status="selected-wrong">
  Неправильный ответ (выбран)
</AnswerOption>
```

### 5. Режим отображения результатов (правильный НЕ выбранный ответ)

```typescript
<AnswerOption isResultMode status="not-selected-correct">
  Правильный ответ (не выбран)
</AnswerOption>
```

### 6. Полная ширина

```typescript
<AnswerOption fullWidth onClick={handleClick}>
  Вариант на всю ширину
</AnswerOption>
```

### 7. Состояние загрузки

```typescript
<AnswerOption isLoading onClick={handleClick}>
  Загрузка...
</AnswerOption>
```

### 8. С дополнительными классами

```typescript
<AnswerOption className="mb-4" onClick={handleClick}>
  Вариант с кастомными стилями
</AnswerOption>
```

## 🎨 Стили

### Базовые стили

```css
/* Режим выбора */
- Использует компонент Button из shared/ui
- variant="outline" для не выбранных
- variant="primary" для выбранных (множественный выбор)
- rounded-2xl - скругление углов

/* Режим результатов */
- rounded-3xl - более скругленные углы
- border-2 - толстая граница
- px-4 py-2.5 - внутренние отступы
- pointer-events-none - отключение кликов
- cursor-default - курсор по умолчанию
```

### Цветовая палитра статусов

```typescript
const statusColors = {
  "selected-correct": {
    border: "border-transparent",
    background: "bg-success",
    text: "text-white",
  },
  "selected-wrong": {
    border: "border-transparent",
    background: "bg-error",
    text: "text-white",
  },
  "not-selected-correct": {
    border: "border-success",
    background: "transparent",
    text: "text-success",
  },
  "not-selected-wrong": {
    border: "border-error",
    background: "transparent",
    text: "text-error",
  },
};
```

## 🔄 Режимы работы

### Режим выбора (isResultMode = false)

```
┌─────────────────────────────────────────────┐
│ Интерактивная кнопка                        │
│ - Можно кликнуть                            │
│ - Можно выбрать/отменить выбор              │
│ - Визуально меняется при выборе             │
└─────────────────────────────────────────────┘
```

**Характеристики:**

- ✅ Интерактивность
- ✅ Анимация при наведении
- ✅ Состояние disabled при загрузке
- ✅ Outline стиль по умолчанию
- ✅ Primary стиль при выборе (множественный)

### Режим результатов (isResultMode = true)

```
┌─────────────────────────────────────────────┐
│ Статическое отображение результата          │
│ - Нельзя кликнуть                           │
│ - Цветовая индикация правильности           │
│ - Показывает что выбрал пользователь        │
│ - Показывает правильные ответы              │
└─────────────────────────────────────────────┘
```

**Характеристики:**

- ❌ Нет интерактивности (pointer-events-none)
- ✅ Цветовая индикация
- ✅ Disabled состояние
- ✅ Статичный вид

## 🏗️ Архитектура

### Принципы разработки

1. **Single Responsibility** - компонент отвечает только за отображение варианта ответа
2. **Reusability** - переиспользуемый в любой части приложения
3. **Composition** - использует базовый компонент Button
4. **Type Safety** - строгая типизация всех props
5. **Accessibility** - поддержка disabled состояния

### Внутренняя функция getResultButtonClass

```typescript
const getResultButtonClass = (status: AnswerStatus): string => {
  const baseClasses =
    "inline-flex cursor-default items-center justify-center gap-2 rounded-3xl font-medium transition-all duration-200 outline-none border-2 px-4 py-2.5 text-base pointer-events-none";

  switch (status) {
    case "selected-correct":
      return `${baseClasses} border-transparent bg-success text-white`;
    case "selected-wrong":
      return `${baseClasses} border-transparent bg-error text-white`;
    case "not-selected-correct":
      return `${baseClasses} border-success text-success`;
    case "not-selected-wrong":
      return `${baseClasses} border-error text-error`;
    default:
      return baseClasses;
  }
};
```

## 📦 Использование в проекте

### Где используется

1. **SingleChoiceAnswer** - одиночный выбор ответа
2. **MultipleChoiceAnswer** - множественный выбор ответа
3. Любые другие компоненты, где нужны варианты ответов

### Импорт

```typescript
// Импорт компонента
import { AnswerOption } from "@/shared/ui";

// Импорт типа (если нужен)
import type { AnswerStatus } from "@/shared/ui";
```

### Зависимости

- ✅ **clsx** - единственная зависимость для управления классами
- ❌ Не зависит от других UI компонентов
- ❌ Не использует внешние стили

## 🎯 Кейсы использования

### Кейс 1: Одиночный выбор ответа

```typescript
const SingleChoice = () => {
  const handleSelect = async (answer: string) => {
    await submitAnswer(answer);
  };

  return (
    <div className="flex flex-col gap-2">
      <AnswerOption fullWidth onClick={() => handleSelect("Да")}>
        Да
      </AnswerOption>
      <AnswerOption fullWidth onClick={() => handleSelect("Нет")}>
        Нет
      </AnswerOption>
      <AnswerOption fullWidth onClick={() => handleSelect("Не знаю")}>
        Не знаю
      </AnswerOption>
    </div>
  );
};
```

### Кейс 2: Множественный выбор с отображением результатов

```typescript
const MultipleChoice = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const options = [
    { text: "Вариант А", isCorrect: true },
    { text: "Вариант Б", isCorrect: false },
    { text: "Вариант В", isCorrect: true }
  ];

  const getStatus = (option: typeof options[0]): AnswerStatus => {
    if (!submitted) return null;

    const isSelected = selected.includes(option.text);
    if (isSelected && option.isCorrect) return "selected-correct";
    if (isSelected && !option.isCorrect) return "selected-wrong";
    if (!isSelected && option.isCorrect) return "not-selected-correct";
    return "not-selected-wrong";
  };

  return (
    <div>
      {options.map((option) => (
        <AnswerOption
          key={option.text}
          isResultMode={submitted}
          status={getStatus(option)}
          isSelected={selected.includes(option.text)}
          onClick={() => {
            if (!submitted) {
              setSelected(prev =>
                prev.includes(option.text)
                  ? prev.filter(t => t !== option.text)
                  : [...prev, option.text]
              );
            }
          }}
        >
          {option.text}
        </AnswerOption>
      ))}

      {!submitted && (
        <Button onClick={() => setSubmitted(true)}>
          Отправить
        </Button>
      )}
    </div>
  );
};
```

## ⚡ Производительность

- ✅ Легковесный компонент
- ✅ Минимум перерендеров
- ✅ Использует clsx для оптимизации классов
- ✅ Нет тяжелых вычислений

## 🎨 Визуальные примеры

### Режим выбора

```
┌──────────────────────────────┐
│  Вариант А  (outline)        │  ← Не выбран
└──────────────────────────────┘

┌──────────────────────────────┐
│  Вариант Б  (primary)        │  ← Выбран
└──────────────────────────────┘
```

### Режим результатов

```
┌──────────────────────────────┐
│  ✅ Правильно (зеленый)      │  ← selected-correct
└──────────────────────────────┘

┌──────────────────────────────┐
│  ❌ Неправильно (красный)    │  ← selected-wrong
└──────────────────────────────┘

┌──────────────────────────────┐
│  ✓  Правильный вариант       │  ← not-selected-correct
└──────────────────────────────┘

┌──────────────────────────────┐
│  ✗  Неправильный вариант     │  ← not-selected-wrong
└──────────────────────────────┘
```

## 🚀 Расширение функционала

### Добавление нового статуса

1. Обновите тип `AnswerStatus`:

```typescript
export type AnswerStatus =
  | "selected-correct"
  | "selected-wrong"
  | "not-selected-correct"
  | "not-selected-wrong"
  | "partially-correct" // ← Новый статус
  | null;
```

2. Добавьте стили в `getResultButtonClass`:

```typescript
case "partially-correct":
  return `${baseClasses} border-warning text-warning`;
```

### Добавление новых вариантов

Компонент уже поддерживает любые визуальные варианты через props:

- `className` - дополнительные классы
- `fullWidth` - на всю ширину
- `isSelected` - выбран/не выбран

## 📚 Связанные компоненты

- **SingleChoiceAnswer** - использует AnswerOption для одиночного выбора
- **MultipleChoiceAnswer** - использует AnswerOption для множественного выбора
- **AnswerField** - родительский компонент-координатор

## 🔗 Связанные типы

```typescript
// Импорт из block entity
import type { Block } from "@/entities/block/model/types";

// Типы для проверки ответов
interface AnswerCheck {
  is_correct: boolean;
}
```

## ✨ Ключевые особенности

1. **Универсальность** - работает для всех типов вопросов
2. **Два режима** - выбор и результаты
3. **Цветовая индикация** - понятная визуализация
4. **Доступность** - поддержка disabled
5. **Гибкость** - настраиваемые стили
6. **Type-safe** - строгая типизация

## 📖 Best Practices

### ✅ DO

```typescript
// Используй children для текста
<AnswerOption>Текст варианта</AnswerOption>

// Явно указывай режим результатов
<AnswerOption isResultMode={true} status="selected-correct">
  Правильно
</AnswerOption>

// Используй fullWidth для мобильных
<AnswerOption fullWidth>Вариант</AnswerOption>
```

### ❌ DON'T

```typescript
// Не передавай status без isResultMode
<AnswerOption status="selected-correct">  // ❌
  Вариант
</AnswerOption>

// Не используй без children
<AnswerOption />  // ❌

// Не забывай onClick в режиме выбора
<AnswerOption>  // ❌ Нет onClick
  Вариант
</AnswerOption>
```

## 🎓 Выводы

**AnswerOption** - это:

- ✅ Переиспользуемый компонент из `shared/ui`
- ✅ Поддерживает режимы выбора и результатов
- ✅ Имеет четкую цветовую индикацию
- ✅ Типобезопасный и расширяемый
- ✅ Следует принципам FSD архитектуры

---

**Версия:** 2.0
**Дата обновления:** 25 октября 2025
**Слой:** `shared/ui`
**Зависимости:** `clsx`
**Архитектура:** Single Return, No External UI Dependencies
