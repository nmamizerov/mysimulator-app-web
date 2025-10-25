# AnswerField - Множественный выбор

## Обзор

Обновлённый компонент `AnswerField` поддерживает множественный выбор ответов через проп `isMultiple`.

**Расположение:** `app/entities/block/ui/answer-field.tsx`

## Типы ответов

Компонент поддерживает три типа полей для ответа:

1. **Кнопка** (`completeType === "button"`) - простая кнопка "Далее"
2. **Варианты ответа** (`completeType === "answers"`) - одиночный или множественный выбор
3. **Текстовое поле** (`completeType === "text"`) - поле ввода текста

## Множественный выбор

### Props

```typescript
interface AnswerFieldProps {
  userBlockId: number;
  completeType: "button" | "text" | "answers";
  isFill: boolean;
  nextButtonText?: string;
  answerOptions?: string[];
  isMultiple?: boolean; // ← Новый проп
}
```

### Использование

```tsx
<AnswerField
  userBlockId={block.id}
  completeType="answers"
  answerOptions={["Вариант 1", "Вариант 2", "Вариант 3"]}
  isMultiple={true}
  isFill={true}
/>
```

### Поведение при `isMultiple={true}`

#### 1. Управление состоянием

```typescript
const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
```

Компонент хранит массив выбранных ответов в локальном состоянии.

#### 2. Выбор/отмена вариантов

```typescript
const handleToggleAnswer = (answer: string) => {
  setSelectedAnswers(
    (prev) =>
      prev.includes(answer)
        ? prev.filter((a) => a !== answer) // Удалить если уже выбран
        : [...prev, answer] // Добавить если не выбран
  );
};
```

Пользователь может:

- **Выбрать** вариант кликом
- **Отменить выбор** повторным кликом
- **Выбрать несколько** вариантов одновременно

#### 3. Визуальная индикация

Выбранные варианты отличаются:

**Выбранный вариант:**

- `variant="primary"` - основной цвет
- `ring-2 ring-primary ring-offset-2` - кольцо вокруг кнопки
- Иконка галочки слева от текста

**Невыбранный вариант:**

- `variant="outline"` - обводка
- Нет иконки

```tsx
<Button
  variant={isSelected ? "primary" : "outline"}
  className={clsx(
    "transition-all",
    isSelected && "ring-2 ring-primary ring-offset-2"
  )}
>
  {isSelected && (
    <span className="mr-2">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  )}
  {option}
</Button>
```

#### 4. Кнопка отправки

Кнопка "Отправить ответы" появляется только когда выбран хотя бы один вариант:

```tsx
{
  selectedAnswers.length > 0 && (
    <div className="mt-4">
      <Button
        onClick={handleSubmitMultiple}
        disabled={isLoading}
        variant="primary"
        fullWidth={isFill}
      >
        {isLoading ? "Загрузка..." : "Отправить ответы"}
      </Button>
    </div>
  );
}
```

#### 5. Отправка данных

При отправке массив ответов объединяется в строку через запятую:

```typescript
const handleSubmitMultiple = async () => {
  if (selectedAnswers.length === 0) return;
  await handleComplete(selectedAnswers.join(", "));
};
```

**Пример результата:**

- Выбраны: `["Вариант 1", "Вариант 3"]`
- Отправляется: `"Вариант 1, Вариант 3"`

## Интеграция с BlockItem

### AnswerSection компонент

```tsx
const AnswerSection = ({
  userBlockId,
  completeType,
  nextButtonText,
  answerOptions,
  checkType,
}: {
  userBlockId: number;
  completeType: "text" | "button" | "answers";
  nextButtonText?: string;
  answerOptions?: string[];
  checkType?: "single_choice" | "multiple_choice" | "text";
}) => {
  return (
    <div className={clsx("flex justify-end", !checkType && "mt-4")}>
      <AnswerField
        isFill={!!checkType}
        userBlockId={userBlockId}
        completeType={completeType}
        nextButtonText={nextButtonText}
        answerOptions={answerOptions}
        isMultiple={checkType === "multiple_choice"} // ← Автоматически
      />
    </div>
  );
};
```

### Определение типа

`isMultiple` автоматически устанавливается на основе `checkType`:

- `checkType === "multiple_choice"` → `isMultiple={true}`
- `checkType === "single_choice"` → `isMultiple={false}`
- `checkType === "text"` → `isMultiple={false}`

## Сравнение режимов

### Одиночный выбор (`isMultiple={false}`)

```
┌─────────────────────────────────┐
│  ┌───────────┐  ┌───────────┐  │
│  │ Вариант 1 │  │ Вариант 2 │  │ ← Клик сразу отправляет
│  └───────────┘  └───────────┘  │
└─────────────────────────────────┘
```

**Поведение:**

- Клик по варианту → немедленная отправка
- Нельзя выбрать несколько
- Нет кнопки "Отправить"

### Множественный выбор (`isMultiple={true}`)

```
┌─────────────────────────────────┐
│  ┌─────────────┐  ┌───────────┐│
│  │ ✓ Вариант 1 │  │ Вариант 2 ││ ← Выбираются кликом
│  └─────────────┘  └───────────┘│
│                                  │
│  ┌───────────────────────────┐  │
│  │    Отправить ответы       │  │ ← Кнопка отправки
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

**Поведение:**

- Клик по варианту → toggle выбора
- Можно выбрать несколько
- Кнопка "Отправить ответы" появляется при выборе
- Выбранные варианты подсвечены

## Типы данных

### Block type

```typescript
export type Block = {
  id: string;
  text: string;
  complete_type: "button" | "text" | "answers";
  is_task: boolean;
  check_type?: null | "single_choice" | "multiple_choice" | "text";
  next_button_text?: string;
  answer_options?: string[];
  character?: Character;
  tag?: string;
};
```

**Важно:** Если `check_type === "multiple_choice"`, то `complete_type` **обязательно** должен быть `"answers"`.

## Примеры использования

### Пример 1: Тест с множественным выбором

```tsx
const block = {
  id: "1",
  text: "Какие из этих языков программирования являются объектно-ориентированными?",
  complete_type: "answers",
  check_type: "multiple_choice",
  answer_options: ["JavaScript", "C", "Python", "Assembly", "Java"],
};

<AnswerField
  userBlockId={1}
  completeType="answers"
  answerOptions={block.answer_options}
  isMultiple={true}
  isFill={true}
/>;
```

**Результат:** Пользователь выбирает JavaScript, Python, Java → отправляется `"JavaScript, Python, Java"`

### Пример 2: Одиночный выбор

```tsx
const block = {
  id: "2",
  text: "Выберите правильный ответ:",
  complete_type: "answers",
  check_type: "single_choice",
  answer_options: ["Да", "Нет"],
};

<AnswerField
  userBlockId={2}
  completeType="answers"
  answerOptions={block.answer_options}
  isMultiple={false}
  isFill={false}
/>;
```

**Результат:** Пользователь кликает "Да" → сразу отправляется `"Да"`

### Пример 3: Кнопка

```tsx
<AnswerField
  userBlockId={3}
  completeType="button"
  nextButtonText="Продолжить"
  isFill={false}
/>
```

### Пример 4: Текстовое поле

```tsx
<AnswerField userBlockId={4} completeType="text" isFill={true} />
```

## Стилизация

### Выбранная кнопка

```css
/* Primary вариант с кольцом */
.ring-2.ring-primary.ring-offset-2
```

### Иконка галочки

SVG иконка с размером 16x16px (w-4 h-4), заполненная текущим цветом кнопки.

### Анимация

```css
.transition-all
```

Плавный переход при выборе/отмене варианта.

## API

### handleComplete

```typescript
const handleComplete = async (answer: string) => {
  try {
    await completeBlock({
      userBlockId,
      data: { answer, id: userBlockId },
    }).unwrap();
  } catch (error) {
    console.error("Ошибка при завершении блока:", error);
  }
};
```

### handleToggleAnswer

```typescript
const handleToggleAnswer = (answer: string) => {
  setSelectedAnswers((prev) =>
    prev.includes(answer) ? prev.filter((a) => a !== answer) : [...prev, answer]
  );
};
```

### handleSubmitMultiple

```typescript
const handleSubmitMultiple = async () => {
  if (selectedAnswers.length === 0) return;
  await handleComplete(selectedAnswers.join(", "));
};
```

## Возможные улучшения

1. **Валидация минимального количества ответов:**

   ```typescript
   const minAnswers = 2;
   const canSubmit = selectedAnswers.length >= minAnswers;
   ```

2. **Максимальное количество ответов:**

   ```typescript
   const maxAnswers = 3;
   const canSelectMore = selectedAnswers.length < maxAnswers;
   ```

3. **Кастомное форматирование результата:**

   ```typescript
   // Вместо "A, B, C" отправлять JSON
   await handleComplete(JSON.stringify(selectedAnswers));
   ```

4. **Подсказка о количестве выбранных:**

   ```tsx
   <p className="text-sm text-gray-600">
     Выбрано: {selectedAnswers.length} из {answerOptions.length}
   </p>
   ```

5. **Кнопка "Очистить выбор":**
   ```tsx
   <Button variant="ghost" onClick={() => setSelectedAnswers([])}>
     Очистить
   </Button>
   ```

## FAQ

**Q: Что если пользователь не выберет ни одного варианта?**
A: Кнопка "Отправить ответы" не появится, отправка невозможна.

**Q: Можно ли изменить разделитель между ответами?**
A: Да, измените `join(", ")` на нужный разделитель в `handleSubmitMultiple`.

**Q: Как сбросить выбор после отправки?**
A: После успешной отправки компонент перерисуется с новыми данными блока.

**Q: Работает ли это с `isFill={false}`?**
A: Да, множественный выбор работает в обоих режимах (внутри блока и справа).

## Связанные файлы

- `/app/entities/block/ui/answer-field.tsx` - основной компонент
- `/app/entities/block/ui/block-item.tsx` - использование в BlockItem
- `/app/entities/block/model/types.ts` - типы данных
- `/app/entities/block/api/block.api.ts` - API запросы
