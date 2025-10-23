# BlockItem - Компонент блока симулятора

## 📍 Расположение

`app/entities/block/ui/block-item.tsx`

## 📝 Описание

Компонент для отображения блоков симулятора. Поддерживает два варианта отображения: простой HTML-текст (без персонажа) и блок с персонажем (аватарка + бабл с контентом). Для незавершенных блоков автоматически добавляет компонент AnswerField для взаимодействия.

## 🎨 Варианты отображения

### 1. Блок без персонажа

Простой HTML-текст, отображаемый через `dangerouslySetInnerHTML`:

```tsx
<BlockItem
  block={{
    id: 1,
    is_completed: true,
    block: {
      id: "1",
      text: "<p>Это простой текстовый блок</p>",
      complete_type: "button",
    },
  }}
/>
```

### 2. Блок с персонажем

Компонент отображает:

- Аватарку персонажа (слева снизу, 64x64px)
- Бабл с контентом (белая карточка с рамкой)
- Имя персонажа (`text-subtitle-2`)
- Роль персонажа (`text-caption`)
- Текст блока (`text-body`)

```tsx
<BlockItem
  block={{
    id: 2,
    is_completed: true,
    block: {
      id: "2",
      text: "<p>Привет! Я твой наставник.</p>",
      complete_type: "button",
      character: {
        id: 1,
        name: "Анна",
        role: "Наставник",
        image: "/avatars/woman_1.png",
      },
    },
  }}
/>
```

## 🔧 Props

```typescript
interface BlockItemProps {
  block: UserBlock;
}
```

### UserBlock

```typescript
type UserBlock = {
  id: number;
  is_completed: boolean;
  answer?: string;
  block: Block;
};
```

### Block

```typescript
type Block = {
  id: string;
  text: string; // HTML контент
  complete_type: "button" | "text" | "answers";
  next_button_text?: string;
  answer_options?: string[];
  character?: Character;
};
```

### Character

```typescript
type Character = { id: number; name: string; role: string; image: string };
```

## 🎯 Интеграция с AnswerField

Компонент BlockItem автоматически отображает компонент AnswerField для незавершенных блоков:

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

### Расположение AnswerField

**Для блоков без персонажа:**

- AnswerField отображается сразу после текста блока
- Использует общий контейнер с классом `mb-4`

**Для блоков с персонажем:**

- AnswerField отображается после баббла с текстом
- Находится в том же flex-контейнере, что и бабл

### Типы взаимодействия

В зависимости от `complete_type` блока, AnswerField отображает:

1. **"button"** - кнопку с текстом из `next_button_text`
2. **"answers"** - варианты ответа из `answer_options`
3. **"text"** - текстовое поле для ввода ответа

Подробнее см. [AnswerField documentation](./answer-field.md)

## 💡 Примеры использования

### Список блоков

```tsx
import { BlockItem } from "@/entities/block";

export const SimulatorContent = ({ blocks }: { blocks: UserBlock[] }) => {
  return (
    <div className="space-y-4">
      {blocks.map((block) => (
        <BlockItem key={block.id} block={block} />
      ))}
    </div>
  );
};
```

### Одиночный блок

```tsx
import { BlockItem } from "@/entities/block";

export const SingleBlock = () => {
  const block = {
    id: 1,
    is_completed: true,
    block: {
      id: "1",
      text: "<h2>Заголовок</h2><p>Текст блока</p>",
      complete_type: "button",
    },
  };

  return <BlockItem block={block} />;
};
```

## 🎯 Стилизация

### Блок без персонажа

- Класс: `text-body text-gray-900`
- Отступ снизу: `mb-4`

### Блок с персонажем

**Аватарка:**

- Размер: `w-16 h-16` (64x64px)
- Скругление: `rounded-full`
- Обрезка: `object-cover`

**Бабл:**

- Фон: `bg-white`
- Рамка: `border border-gray-200`
- Скругление: `rounded-2xl`
- Отступы: `p-4`
- Тень: `shadow-sm`

**Текст:**

- Имя: `text-subtitle-2 text-gray-900 font-semibold`
- Роль: `text-caption text-gray-500`
- Контент: `text-body text-gray-800`

## 🔄 Обработка HTML

Компонент использует `dangerouslySetInnerHTML` для рендеринга HTML-контента из API. Убедитесь, что контент из API безопасен и санитизирован на стороне сервера.

## 📱 Адаптивность

Компонент адаптивный по умолчанию:

- Флекс-лейаут для блоков с персонажем
- Аватарка всегда фиксированного размера (`flex-shrink-0`)
- Контент занимает оставшееся пространство (`flex-1`)

## ⚠️ Важные замечания

1. **Безопасность:** HTML контент рендерится через `dangerouslySetInnerHTML`, убедитесь в безопасности данных
2. **Типизация:** Всегда используйте типы `UserBlock` и `Block` из `@/entities/block`
3. **Изображения:** Путь к аватарке должен быть валидным URL или путь к статическому ресурсу

## 🔄 История изменений

- **2025-10-21**: Создан компонент `BlockItem` с поддержкой двух вариантов отображения
- **2025-10-21**: Перемещен в `entities/block/ui` согласно FSD архитектуре
