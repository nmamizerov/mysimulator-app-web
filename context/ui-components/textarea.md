# Textarea Component

## Описание

Универсальный компонент текстового поля с поддержкой переносов строк, кастомных элементов справа, валидации и отправки по горячим клавишам.

## Расположение

```
app/shared/ui/textarea/textarea.tsx
```

## Типы

```typescript
interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onSubmit"> {
  error?: boolean; // Состояние ошибки
  helperText?: string; // Вспомогательный текст под полем
  rightElement?: ReactNode; // Элемент справа (центрирован по вертикали)
  onSubmit?: (value: string) => void; // Callback при отправке (Cmd/Ctrl + Enter)
}
```

## Использование

### Базовое использование

```tsx
import { Textarea } from "@/shared/ui";

<Textarea placeholder="Введите текст..." rows={3} />;
```

### С переносами строк

```tsx
<Textarea
  placeholder="Введите ваш ответ..."
  rows={1} // Начальное количество строк
  // Enter работает нормально - добавляет перенос строки!
/>
```

### С отправкой по Cmd/Ctrl + Enter

```tsx
const [value, setValue] = useState("");

<Textarea
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Введите текст и нажмите Cmd+Enter для отправки"
  onSubmit={(text) => {
    console.log("Отправлено:", text);
    setValue(""); // Очистка после отправки
  }}
/>;
```

### С кастомным элементом справа (идеально центрирован!)

```tsx
<Textarea
  placeholder="Введите сообщение..."
  rightElement={
    <button
      className="w-8 h-8 bg-primary text-white rounded-lg hover:opacity-80"
      onClick={handleSend}
    >
      ➤
    </button>
  }
/>
```

### С валидацией

```tsx
const [error, setError] = useState(false);

<Textarea
  placeholder="Обязательное поле"
  error={error}
  helperText={error ? "Это поле обязательно для заполнения" : ""}
  onChange={(e) => {
    setError(e.target.value.length === 0);
  }}
/>;
```

### Полный пример (как в AnswerField)

```tsx
import { Textarea } from "@/shared/ui";

const AnswerInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (value: string) => {
    setIsLoading(true);
    try {
      await sendAnswer(value);
      setInputValue("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Textarea
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Введите ваш ответ..."
      disabled={isLoading}
      onSubmit={handleSubmit}
      rightElement={
        <button
          onClick={() => inputValue.trim() && handleSubmit(inputValue)}
          disabled={isLoading || !inputValue.trim()}
          className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-lg hover:opacity-80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SendIcon />
        </button>
      }
    />
  );
};
```

## Props

### error

**Тип:** `boolean`  
**По умолчанию:** `false`

Показывает состояние ошибки с красной обводкой.

```tsx
<Textarea error helperText="Ошибка валидации" />
```

### helperText

**Тип:** `string`  
**По умолчанию:** `undefined`

Вспомогательный текст под полем. Цвет меняется в зависимости от `error`.

```tsx
<Textarea helperText="Максимум 500 символов" />
```

### rightElement

**Тип:** `ReactNode`  
**По умолчанию:** `undefined`

Элемент, отображаемый справа и **идеально центрированный по вертикали** (независимо от высоты textarea).

```tsx
<Textarea rightElement={<button className="...">Отправить</button>} />
```

### onSubmit

**Тип:** `(value: string) => void`  
**По умолчанию:** `undefined`

Callback, вызываемый при нажатии Cmd/Ctrl + Enter. Получает обрезанное значение поля.

```tsx
<Textarea onSubmit={(text) => console.log("Отправлено:", text)} />
```

## Поведение клавиатуры

### Enter

- **Enter** - добавляет перенос строки (работает нормально!)
- **Shift + Enter** - тоже добавляет перенос строки

### Cmd/Ctrl + Enter

Если определен `onSubmit`:

- Вызывает `onSubmit(value.trim())`
- Предотвращает стандартное поведение
- Срабатывает только если поле не пустое

## Стили

### Базовые стили

- Белый фон
- Серая обводка (`border-gray-200`)
- Закругленные углы (`rounded-lg`)
- Padding: `px-4 py-3`
- Шрифт: `text-body`

### Состояние фокуса

- Убирается дефолтный outline
- Появляется кольцо primary цвета (`focus:ring-primary`) ✅
- Обводка становится прозрачной

### Состояние ошибки

- Красная обводка (`border-red-500`)
- Красное кольцо при фокусе (`focus:ring-red-500`)
- Красный `helperText`

### Состояние disabled

- Opacity 50%
- Светло-серый фон (`bg-gray-50`)
- Курсор `not-allowed`

### С rightElement

- Дополнительный padding справа (`pr-12`)
- Абсолютное позиционирование элемента: `absolute right-3 top-1/2 -translate-y-1/2 flex items-center`
- **Идеальное центрирование по вертикали** для любой высоты textarea

## Accessibility

- Полная поддержка клавиатуры (Enter, Cmd/Ctrl+Enter)
- Правильное состояние `disabled`
- Поддержка `aria-*` атрибутов через spread props
- `helperText` для подсказок и ошибок

## Интеграция с формами

Компонент совместим со всеми стандартными атрибутами textarea:

```tsx
<Textarea
  name="message"
  id="message"
  required
  maxLength={500}
  aria-label="Сообщение"
  aria-describedby="message-helper"
/>
```

## Примеры использования

### Чат-сообщение

```tsx
<Textarea
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  placeholder="Напишите сообщение..."
  rows={1}
  onSubmit={sendMessage}
  rightElement={
    <button onClick={() => sendMessage(message)}>
      <SendIcon />
    </button>
  }
/>
```

### Форма обратной связи

```tsx
<Textarea
  placeholder="Опишите вашу проблему"
  rows={5}
  error={!isValid}
  helperText={!isValid ? "Минимум 10 символов" : `${value.length}/1000`}
  onChange={handleChange}
/>
```

### Редактор заметок

```tsx
<Textarea
  value={note}
  onChange={(e) => setNote(e.target.value)}
  placeholder="Начните писать..."
  rows={10}
  helperText="Автосохранение включено"
/>
```

## Цветовая палитра

**✅ Используются Tailwind классы с динамическими цветами:**

- `bg-primary`, `text-primary`, `ring-primary` - основной цвет (из `--color-primary` в app.css)
- `bg-secondary`, `text-secondary` - дополнительный цвет (из `--color-secondary` в app.css)
- `red-500` (#EF4444) - ошибка
- `gray-200` (#E5E7EB) - обводка
- `gray-400` (#9CA3AF) - placeholder
- `gray-500` (#6B7280) - вспомогательный текст
- `gray-900` (#111827) - основной текст

**Важно:** Всегда используй `bg-primary` вместо `bg-orange-500` или `bg-[var(--color-primary)]`!

## Связанные компоненты

- `Input` - одностроковое поле ввода
- `Button` - кнопки для форм
- `AnswerField` - использует Textarea для ввода ответов

## Связанные файлы

- `app/shared/ui/textarea/textarea.tsx` - компонент
- `app/shared/ui/textarea/index.ts` - экспорты
- `app/entities/block/ui/answer-field.tsx` - пример использования
