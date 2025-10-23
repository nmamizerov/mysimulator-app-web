# Компонент Input

## 📍 Расположение

`app/shared/ui/input/`

## 📝 Описание

Универсальный компонент для ввода текста с поддержкой различных состояний, валидации, иконок и размеров. Использует цветовую схему проекта (primary color: `#009dc5`).

## 🎨 Использование цветовой схемы

- **Focus state**: `focus:border-[var(--color-primary)]` - использует primary цвет (#009dc5)
- **Ring effect**: `focus:ring-[var(--color-primary)]/20` - полупрозрачный primary цвет для эффекта кольца

## 📦 Импорт

```typescript
import { Input } from "@/shared/ui";
```

## 🔧 Props

```typescript
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Лейбл над полем
  error?: string; // Текст ошибки
  helperText?: string; // Вспомогательный текст
  leftIcon?: ReactNode; // Иконка слева
  rightIcon?: ReactNode; // Иконка справа
  variant?: "default" | "filled"; // Вариант отображения
  inputSize?: "sm" | "md" | "lg"; // Размер поля
}
```

## 💡 Примеры использования

### Базовый пример

```typescript
<Input
  placeholder="Введите текст"
/>
```

### С лейблом

```typescript
<Input
  label="Email"
  type="email"
  placeholder="example@mail.com"
/>
```

### С ошибкой

```typescript
<Input
  label="Email"
  type="email"
  error="Неверный формат email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

### С вспомогательным текстом

```typescript
<Input
  label="Пароль"
  type="password"
  helperText="Минимум 8 символов"
/>
```

### С иконками

```typescript
<Input
  label="Поиск"
  placeholder="Введите запрос"
  leftIcon={<SearchIcon className="w-5 h-5" />}
  rightIcon={<CloseIcon className="w-5 h-5 cursor-pointer" onClick={handleClear} />}
/>
```

### Разные размеры

```typescript
<Input inputSize="sm" placeholder="Маленький" />
<Input inputSize="md" placeholder="Средний" />
<Input inputSize="lg" placeholder="Большой" />
```

### Варианты отображения

```typescript
<Input variant="default" placeholder="По умолчанию" />
<Input variant="filled" placeholder="Заполненный фон" />
```

### Disabled состояние

```typescript
<Input
  disabled
  value="Недоступно для редактирования"
/>
```

### С ref (например, для focus)

```typescript
const inputRef = useRef<HTMLInputElement>(null);

const handleFocus = () => {
  inputRef.current?.focus();
};

<Input
  ref={inputRef}
  label="Имя"
/>
```

## 🎯 Особенности

1. **Accessibility**: Поддержка `aria-invalid`, `aria-describedby`, `role="alert"`
2. **Состояния**: Normal, Focus, Error, Disabled
3. **Анимации**: Плавные переходы на 200ms
4. **Адаптивность**: Полная ширина с возможностью настройки
5. **Типизация**: Полная поддержка TypeScript
6. **forwardRef**: Возможность получить доступ к DOM элементу

## 🎨 Цветовая схема

- **Border default**: `border-gray-300`
- **Border hover**: `hover:border-gray-400`
- **Border focus**: `focus:border-[var(--color-primary)]` (#009dc5)
- **Ring focus**: `focus:ring-[var(--color-primary)]/20`
- **Border error**: `border-red-500`
- **Text error**: `text-red-600`
- **Placeholder**: `placeholder:text-gray-400` - светло-серый для подсказок

## 📐 Размеры

| Размер | Padding     | Font Size |
| ------ | ----------- | --------- |
| sm     | px-3 py-1.5 | text-sm   |
| md     | px-4 py-2   | text-base |
| lg     | px-5 py-3   | text-lg   |

## ✅ Best Practices

1. Всегда указывай `label` для доступности
2. Используй `error` для отображения ошибок валидации
3. Используй `helperText` для подсказок пользователю
4. Указывай правильный `type` (email, password, number, etc.)
5. Используй `id` для связи с label и error сообщениями
6. Добавляй иконки для улучшения UX (поиск, очистка, показать пароль)

## 🔍 Примеры форм

### Форма логина

```typescript
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  return (
    <form className="space-y-4">
      <Input
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        placeholder="example@mail.com"
        leftIcon={<MailIcon />}
      />

      <Input
        id="password"
        label="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        placeholder="••••••••"
        leftIcon={<LockIcon />}
      />

      <button type="submit">Войти</button>
    </form>
  );
};
```

## 📁 Структура файлов

```
app/shared/ui/input/
├── index.ts        # Экспорт компонента
└── input.tsx       # Реализация компонента
```

## 🛠️ Технологический стек

- **clsx** - для условного управления классами
- **React forwardRef** - для доступа к DOM элементу
- **TypeScript** - полная типизация
- **Tailwind CSS v4** - стилизация

## 🔄 История изменений

- **2025-10-21**: Создан базовый компонент Input с поддержкой всех основных фич
- **2025-10-21**: Добавлено использование clsx для управления классами
- **2025-10-21**: Улучшен цвет placeholder (серый вместо черного для лучшего UX)
