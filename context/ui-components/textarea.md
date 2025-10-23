# Textarea Component

## Описание

Универсальный компонент текстового поля с поддержкой автоматического расширения, кастомных элементов справа, валидации и отправки по горячим клавишам.

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
  rightElement?: ReactNode; // Элемент справа внизу (например, кнопка отправки)
  onSubmit?: (value: string) => void; // Callback при отправке (Cmd/Ctrl + Enter)
  autoExpand?: boolean; // Автоматическое расширение при Enter
}
```

## Использование

### Базовое использование

```tsx
import { Textarea } from "@/shared/ui";

<Textarea placeholder="Введите текст..." rows={3} />;
```

### С автоматическим расширением

```tsx
<Textarea
  placeholder="Введите ваш ответ..."
  autoExpand // При нажатии Enter добавляется новая строка
  rows={1} // Начальное количество строк
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

### С кастомным элементом справа

```tsx
<Textarea
  placeholder="Введите сообщение..."
  rightElement={
    <button
      className="w-8 h-8 bg-orange-500 text-white rounded-lg"
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
      autoExpand
      onSubmit={handleSubmit}
      rightElement={
        <button
          onClick={() => inputValue.trim() && handleSubmit(inputValue)}
          disabled={isLoading || !inputValue.trim()}
          className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

Элемент, отображаемый справа внизу поля (обычно кнопка отправки).

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

### autoExpand

**Тип:** `boolean`  
**По умолчанию:** `false`

Автоматически увеличивает количество строк при нажатии Enter (без модификаторов).

```tsx
<Textarea autoExpand rows={1} />
```

## Поведение клавиатуры

### Enter

Если `autoExpand === true`:

- **Enter** - добавляет новую строку (увеличивает `rows`)
- **Shift + Enter** - обычный перенос строки (не увеличивает `rows`)

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
- Появляется кольцо оранжевого цвета (`focus:ring-orange-500`)
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
- Абсолютное позиционирование элемента

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
  autoExpand
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

- `orange-500` (#FF7A00) - фокус (обычное состояние)
- `orange-600` (#E66D00) - hover кнопки
- `red-500` (#EF4444) - ошибка
- `gray-200` (#E5E7EB) - обводка
- `gray-400` (#9CA3AF) - placeholder
- `gray-500` (#6B7280) - вспомогательный текст
- `gray-900` (#111827) - основной текст

## Связанные компоненты

- `Input` - одностроковое поле ввода
- `Button` - кнопки для форм
- `AnswerField` - использует Textarea для ввода ответов

## Связанные файлы

- `app/shared/ui/textarea/textarea.tsx` - компонент
- `app/shared/ui/textarea/index.ts` - экспорты
- `app/entities/block/ui/answer-field.tsx` - пример использования
