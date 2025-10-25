# Компонент Button

## 📍 Расположение

`app/shared/ui/button/`

## 📝 Описание

Универсальный компонент кнопки с поддержкой различных вариантов отображения, размеров, состояний загрузки и иконок. Использует цветовую схему проекта (primary, secondary).

## 🎨 Использование цветовой схемы

- **Primary**: `bg-primary` - основной цвет (#009dc5)
- **Secondary**: `bg-secondary` - вторичный цвет (#2196F3)
- **Outline**: `border-primary` и `text-primary` с hover эффектом
- **Ghost**: `text-primary` с прозрачным фоном
- **Danger**: `bg-red-600` для опасных действий

## 📦 Импорт

```typescript
import { Button } from "@/shared/ui";
```

## 🔧 Props

```typescript
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode; // Содержимое кнопки
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"; // Вариант отображения
  size?: "sm" | "md" | "lg"; // Размер кнопки
  fullWidth?: boolean; // Растянуть на всю ширину
  isLoading?: boolean; // Состояние загрузки
  leftIcon?: ReactNode; // Иконка слева
  rightIcon?: ReactNode; // Иконка справа
}
```

## 💡 Примеры использования

### Базовые варианты

```tsx
// Primary (по умолчанию)
<Button variant="primary">Отправить</Button>

// Secondary
<Button variant="secondary">Отменить</Button>

// Outline
<Button variant="outline">Подробнее</Button>

// Ghost
<Button variant="ghost">Ссылка</Button>

// Danger
<Button variant="danger">Удалить</Button>
```

### Размеры

```tsx
<Button size="sm">Маленькая</Button>
<Button size="md">Средняя</Button>
<Button size="lg">Большая</Button>
```

### Полная ширина

```tsx
<Button fullWidth>Кнопка на всю ширину</Button>
```

### Состояние загрузки

```tsx
const [isLoading, setIsLoading] = useState(false);

<Button isLoading={isLoading} onClick={handleSubmit}>
  Сохранить
</Button>;
```

### С иконками

```tsx
// Иконка слева
<Button leftIcon={<PlusIcon className="w-5 h-5" />}>
  Добавить
</Button>

// Иконка справа
<Button rightIcon={<ArrowRightIcon className="w-5 h-5" />}>
  Далее
</Button>

// Обе иконки
<Button
  leftIcon={<DownloadIcon className="w-5 h-5" />}
  rightIcon={<ExternalLinkIcon className="w-5 h-5" />}
>
  Скачать файл
</Button>
```

### Disabled состояние

```tsx
<Button disabled>Недоступна</Button>
```

### Формы

```tsx
<form onSubmit={handleSubmit}>
  <Button type="submit" variant="primary" fullWidth>
    Войти
  </Button>

  <Button type="reset" variant="outline">
    Сбросить
  </Button>

  <Button type="button" variant="ghost" onClick={handleCancel}>
    Отмена
  </Button>
</form>
```

### С ref

```tsx
const buttonRef = useRef<HTMLButtonElement>(null);

<Button ref={buttonRef} onClick={handleClick}>
  Кликни меня
</Button>;
```

## 🎯 Полные примеры

### Форма логина

```tsx
export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // ... логика входа
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Email" type="email" />
      <Input label="Пароль" type="password" />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isLoading}
      >
        Войти
      </Button>

      <Button variant="ghost" fullWidth>
        Забыли пароль?
      </Button>
    </form>
  );
};
```

### Группа действий

```tsx
export const ActionButtons = () => (
  <div className="flex gap-3">
    <Button variant="primary" leftIcon={<SaveIcon className="w-5 h-5" />}>
      Сохранить
    </Button>

    <Button variant="outline" leftIcon={<EyeIcon className="w-5 h-5" />}>
      Предпросмотр
    </Button>

    <Button variant="danger" leftIcon={<TrashIcon className="w-5 h-5" />}>
      Удалить
    </Button>
  </div>
);
```

### Модальное окно

```tsx
export const Modal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg max-w-md">
      <h2 className="text-h4 mb-4">Подтвердите действие</h2>
      <p className="text-body mb-6">
        Вы уверены, что хотите удалить этот элемент?
      </p>

      <div className="flex gap-3">
        <Button variant="danger" fullWidth onClick={onConfirm}>
          Удалить
        </Button>
        <Button variant="outline" fullWidth onClick={onCancel}>
          Отмена
        </Button>
      </div>
    </div>
  </div>
);
```

### Навигация

```tsx
import { useNavigate } from "react-router";

export const Navigation = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        leftIcon={<ArrowLeftIcon className="w-5 h-5" />}
        onClick={() => navigate(-1)}
      >
        Назад
      </Button>

      <Button
        variant="primary"
        rightIcon={<ArrowRightIcon className="w-5 h-5" />}
        onClick={() => navigate("/next")}
      >
        Далее
      </Button>
    </div>
  );
};
```

### Загрузка данных

```tsx
export const DataLoader = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoad = async () => {
    setIsLoading(true);
    const result = await fetchData();
    setData(result);
    setIsLoading(false);
  };

  return (
    <Button
      variant="primary"
      isLoading={isLoading}
      onClick={handleLoad}
      leftIcon={!isLoading && <RefreshIcon className="w-5 h-5" />}
    >
      {isLoading ? "Загрузка..." : "Загрузить данные"}
    </Button>
  );
};
```

## 🎨 Цветовая схема

**Важно:** Все варианты кнопок имеют `border-2` для единообразного размера. У вариантов без видимого border используется `border-transparent`.

### Primary

- **Border**: `border-2 border-transparent`
- **Background**: `bg-primary`
- **Hover**: `hover:bg-primary/90`
- **Text**: `text-white`
- **Focus Ring**: `focus:ring-primary/50`

### Secondary

- **Border**: `border-2 border-transparent`
- **Background**: `bg-secondary`
- **Hover**: `hover:bg-secondary/90`
- **Text**: `text-white`
- **Focus Ring**: `focus:ring-secondary/50`

### Outline

- **Border**: `border-2 border-primary`
- **Text**: `text-primary`
- **Hover**: `hover:bg-primary hover:text-white`
- **Focus Ring**: `focus:ring-primary/50`

### Ghost

- **Border**: `border-2 border-transparent`
- **Text**: `text-primary`
- **Hover**: `hover:bg-primary/10`
- **Focus Ring**: `focus:ring-primary/50`

### Danger

- **Border**: `border-2 border-transparent`
- **Background**: `bg-red-600`
- **Hover**: `hover:bg-red-700`
- **Text**: `text-white`
- **Focus Ring**: `focus:ring-red-500/50`

## 📐 Размеры

| Размер | Padding     | Font Size |
| ------ | ----------- | --------- |
| sm     | px-3 py-1.5 | text-sm   |
| md     | px-4 py-2.5 | text-base |
| lg     | px-6 py-3   | text-lg   |

## ✨ Особенности

1. **Единообразный размер**:
   - Все варианты имеют `border-2` для одинакового размера
   - Прозрачный border (`border-transparent`) для вариантов без видимой рамки
   - Исключает "сжатие" кнопки при переключении между `outline` и другими вариантами
   - Особенно важно для динамического изменения варианта (например, в множественном выборе)

2. **Accessibility**:
   - Поддержка `disabled` состояния
   - Focus ring для keyboard navigation
   - Aria-атрибуты через spread props

3. **Loading State**:
   - Автоматическая иконка загрузки (спиннер)
   - Блокировка кнопки во время загрузки
   - Cursor указатель изменяется на `wait`

4. **Иконки**:
   - Автоматический spacing между иконками и текстом
   - Иконки скрываются при загрузке

5. **Анимации**:
   - Плавные переходы (200ms)
   - Hover эффекты
   - Анимация спиннера

6. **TypeScript**:
   - Полная типизация
   - Extends стандартные HTMLButtonElement атрибуты
   - forwardRef для DOM доступа

## ✅ Best Practices

### 1. Выбор правильного варианта

```tsx
// ✅ Primary для главных действий
<Button variant="primary">Сохранить</Button>

// ✅ Outline для вторичных действий
<Button variant="outline">Отмена</Button>

// ✅ Ghost для ссылок и второстепенных действий
<Button variant="ghost">Подробнее</Button>

// ✅ Danger для деструктивных действий
<Button variant="danger">Удалить</Button>
```

### 2. Использование типов кнопок

```tsx
// ✅ Правильно - указываем тип
<form>
  <Button type="submit">Отправить</Button>
  <Button type="reset">Сбросить</Button>
  <Button type="button" onClick={handler}>Действие</Button>
</form>

// ❌ Неправильно - тип не указан в форме
<form>
  <Button onClick={handleSubmit}>Отправить</Button>
</form>
```

### 3. Состояния загрузки

```tsx
// ✅ Правильно - используем isLoading
const [isLoading, setIsLoading] = useState(false);
<Button isLoading={isLoading}>Сохранить</Button>

// ❌ Неправильно - вручную управляем disabled
<Button disabled={isLoading}>
  {isLoading ? 'Загрузка...' : 'Сохранить'}
</Button>
```

### 4. Иконки

```tsx
// ✅ Правильно - правильный размер иконок
<Button leftIcon={<Icon className="w-5 h-5" />}>
  Действие
</Button>

// ❌ Неправильно - слишком большие иконки
<Button leftIcon={<Icon className="w-10 h-10" />}>
  Действие
</Button>
```

### 5. Группировка кнопок

```tsx
// ✅ Правильно - используем flex с gap
<div className="flex gap-3">
  <Button variant="primary">Сохранить</Button>
  <Button variant="outline">Отмена</Button>
</div>

// ✅ Правильно - вертикальная группа
<div className="flex flex-col gap-2">
  <Button fullWidth>Действие 1</Button>
  <Button fullWidth>Действие 2</Button>
</div>
```

## 🛠️ Технологический стек

- **clsx** - для условного управления классами
- **React forwardRef** - для доступа к DOM элементу
- **TypeScript** - полная типизация
- **Tailwind CSS v4** - стилизация

## 📁 Структура файлов

```
app/shared/ui/button/
├── index.ts        # Экспорт компонента
└── button.tsx      # Реализация компонента
```

## 🎨 Кастомизация

Можешь передать дополнительные классы через `className`:

```tsx
<Button className="shadow-lg uppercase tracking-wide">
  Специальная кнопка
</Button>
```

## 🔄 История изменений

- **2025-10-25**: Добавлен `border-2` для всех вариантов для предотвращения "сжатия" при переключении между `outline` и другими вариантами
- **2025-10-21**: Создан базовый компонент Button с поддержкой всех основных фич
