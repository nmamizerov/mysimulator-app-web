# AnswerField Component

## Описание

Компонент для взаимодействия пользователя с блоками симулятора. Поддерживает три типа взаимодействия:

- **Кнопка** - простой переход к следующему блоку
- **Варианты ответа** - выбор из предложенных вариантов
- **Текстовое поле** - ввод произвольного ответа

## Расположение

```
app/entities/block/ui/answer-field.tsx
```

## Типы

```typescript
interface AnswerFieldProps {
  userBlockId: number; // ID пользовательского блока
  completeType: "button" | "text" | "answers"; // Тип взаимодействия
  nextButtonText?: string; // Текст для кнопки (если тип "button")
  answerOptions?: string[]; // Варианты ответа (если тип "answers")
}
```

## Использование

```tsx
import { AnswerField } from "@/entities/block";

// Пример использования в BlockItem
<AnswerField
  userBlockId={block.id}
  completeType={block.block.complete_type}
  nextButtonText={block.block.next_button_text}
  answerOptions={block.block.answer_options}
/>;
```

## Поведение по типам

### 1. Тип "button"

Отображает кнопку для перехода к следующему блоку:

```tsx
<AnswerField userBlockId={123} completeType="button" nextButtonText="Далее" />
```

**Особенности:**

- Отправляет пустую строку в качестве ответа
- Использует компонент Button из shared/ui
- Показывает состояние загрузки

### 2. Тип "answers"

Отображает список вариантов ответа в виде кнопок:

```tsx
<AnswerField
  userBlockId={123}
  completeType="answers"
  answerOptions={["Вариант 1", "Вариант 2", "Вариант 3"]}
/>
```

**Особенности:**

- Каждый вариант - отдельная кнопка во всю ширину
- При наведении - оранжевая обводка (цвет orange-500)
- Отправляет выбранный текст в качестве ответа
- Блокирует все кнопки во время загрузки

**Стили:**

- Использует компонент `Button` с вариантом `outline`
- Базовые: белая обводка, текст первичного цвета
- Hover: оранжевый фон, белый текст
- Disabled: полупрозрачность 60%
- Полная ширина (`fullWidth`)

### 3. Тип "text"

Отображает текстовое поле для ввода произвольного ответа:

```tsx
<AnswerField userBlockId={123} completeType="text" />
```

**Особенности:**

- Использует компонент `Textarea` из `shared/ui` с флагом `autoExpand`
- Начинается с 1 строки
- При нажатии Enter (без модификаторов) - автоматически добавляется новая строка
- Иконка отправки всегда справа внизу
- Отправка по:
  - Клику на иконку
  - Cmd/Ctrl + Enter (обрабатывается в Textarea)
- Нельзя отправить пустой ответ

**Иконка отправки:**

- SVG стрелка (отправка)
- Цвет: оранжевый (orange-500)
- Hover: более темный оранжевый (orange-600)
- Размер: 32x32px (w-8 h-8)
- Передается через prop `rightElement`

## API Integration

Компонент использует RTK Query мутацию `useCompleteBlockMutation` из `block.api.ts`:

```typescript
// Структура запроса
PATCH /user_blocks/{user_block_id}/complete
{
  answer: string,  // Текст ответа
  id: number       // ID пользовательского блока
}
```

**Обработка:**

- При успешном завершении очищает поле ввода
- При ошибке логирует в консоль
- Инвалидирует теги "Simulator" для обновления данных

## Состояния

1. **Обычное** - все элементы активны
2. **Загрузка** - все элементы заблокированы, показывается индикатор
3. **Успех** - очистка формы, обновление данных через invalidation

## Accessibility

- Textarea имеет placeholder "Введите ваш ответ..."
- Кнопка отправки имеет aria-label="Отправить"
- Все интерактивные элементы поддерживают disabled состояние
- Клавиатурная навигация:
  - Enter - новая строка
  - Cmd/Ctrl + Enter - отправка

## Интеграция с BlockItem

Компонент отображается в `BlockItem` только если блок не завершен:

```tsx
{
  !block.is_completed && (
    <AnswerField
      userBlockId={block.id}
      completeType={block.block.complete_type}
      nextButtonText={block.block.next_button_text}
      answerOptions={block.block.answer_options}
    />
  );
}
```

**Расположение:**

- Для блоков без персонажа - сразу после текста
- Для блоков с персонажем - после баббла с текстом

## Цветовая палитра

Используемые цвета:

- `orange-500` (#FF7A00) - основной цвет кнопок и акцентов
- `orange-600` (#E66D00) - hover состояние
- `gray-50` (#F9FAFB) - фон кнопок вариантов при hover
- `gray-200` (#E5E7EB) - обводка
- `gray-400` (#9CA3AF) - placeholder
- `gray-900` (#111827) - текст

## Примеры использования

### Простая навигация

```tsx
<AnswerField
  userBlockId={1}
  completeType="button"
  nextButtonText="Продолжить обучение"
/>
```

### Квиз с вариантами

```tsx
<AnswerField
  userBlockId={2}
  completeType="answers"
  answerOptions={["React", "Vue", "Angular", "Svelte"]}
/>
```

### Открытый вопрос

```tsx
<AnswerField userBlockId={3} completeType="text" />
```

## Технические детали

### Используемые компоненты

- `Button` (`shared/ui`) - для вариантов "button" и "answers"
- `Textarea` (`shared/ui`) - для варианта "text"

### Логика автоматического расширения

Логика увеличения строк при нажатии Enter вынесена в компонент `Textarea`:

```tsx
// В Textarea компоненте
if (
  autoExpand &&
  e.key === "Enter" &&
  !e.shiftKey &&
  !e.ctrlKey &&
  !e.metaKey
) {
  e.preventDefault();
  setRows((prev) => prev + 1);
}
```

### Логика отправки

Отправка по Cmd/Ctrl+Enter также обрабатывается в `Textarea`:

```tsx
// В Textarea компоненте
if (onSubmit && e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
  e.preventDefault();
  const value = (e.target as HTMLTextAreaElement).value;
  if (value.trim()) {
    onSubmit(value.trim());
  }
}
```

## Связанные файлы

- `app/entities/block/api/block.api.ts` - API для завершения блоков
- `app/entities/block/ui/block-item.tsx` - компонент блока
- `app/entities/block/model/types.ts` - типы данных
- `app/shared/ui/button/button.tsx` - компонент кнопки
- `app/shared/ui/textarea/textarea.tsx` - компонент текстового поля
