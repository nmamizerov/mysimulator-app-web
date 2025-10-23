# Button - Шпаргалка

## 🎯 Быстрый справочник

### Импорт

```tsx
import { Button } from "@/shared/ui";
```

### Варианты

```tsx
<Button variant="primary">Primary</Button>    // Основная (по умолчанию)
<Button variant="secondary">Secondary</Button> // Вторичная
<Button variant="outline">Outline</Button>    // С обводкой
<Button variant="ghost">Ghost</Button>        // Прозрачная
<Button variant="danger">Danger</Button>      // Опасная
```

### Размеры

```tsx
<Button size="sm">Small</Button>   // Маленькая
<Button size="md">Medium</Button>  // Средняя (по умолчанию)
<Button size="lg">Large</Button>   // Большая
```

### Модификаторы

```tsx
<Button fullWidth>Full Width</Button>         // На всю ширину
<Button isLoading={true}>Loading...</Button>  // Загрузка
<Button disabled>Disabled</Button>            // Отключена
```

### Иконки

```tsx
<Button leftIcon={<Icon />}>Left</Button>   // Иконка слева
<Button rightIcon={<Icon />}>Right</Button> // Иконка справа
```

### Типы (для форм)

```tsx
<Button type="submit">Submit</Button>   // Отправка формы
<Button type="reset">Reset</Button>     // Сброс формы
<Button type="button">Button</Button>   // Обычная кнопка
```

## 📊 Таблица вариантов

| Вариант     | Когда использовать              | Пример                |
| ----------- | ------------------------------- | --------------------- |
| `primary`   | Главное действие                | Сохранить, Отправить  |
| `secondary` | Вторичное действие              | Экспорт, Поделиться   |
| `outline`   | Альтернативное действие         | Отмена, Назад         |
| `ghost`     | Ссылки, второстепенные действия | Подробнее, Узнать     |
| `danger`    | Деструктивные действия          | Удалить, Сбросить все |

## ✨ Частые комбинации

### Форма

```tsx
<Button type="submit" variant="primary" fullWidth>
  Войти
</Button>
```

### С загрузкой

```tsx
const [loading, setLoading] = useState(false);
<Button isLoading={loading} onClick={handleSave}>
  Сохранить
</Button>;
```

### С иконкой

```tsx
<Button leftIcon={<PlusIcon className="w-5 h-5" />}>Добавить</Button>
```

### Группа кнопок

```tsx
<div className="flex gap-3">
  <Button variant="primary">Сохранить</Button>
  <Button variant="outline">Отмена</Button>
</div>
```

## 💡 Props

```typescript
variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
size?: "sm" | "md" | "lg"
fullWidth?: boolean
isLoading?: boolean
leftIcon?: ReactNode
rightIcon?: ReactNode
disabled?: boolean
type?: "button" | "submit" | "reset"
className?: string
onClick?: () => void
// ... все стандартные HTML button атрибуты
```

## 🎨 Цвета

- `primary` - bg-primary (#009dc5)
- `secondary` - bg-secondary (#2196F3)
- `danger` - bg-red-600

## 📏 Размеры

| Размер | Padding     | Font      |
| ------ | ----------- | --------- |
| sm     | px-3 py-1.5 | text-sm   |
| md     | px-4 py-2.5 | text-base |
| lg     | px-6 py-3   | text-lg   |
