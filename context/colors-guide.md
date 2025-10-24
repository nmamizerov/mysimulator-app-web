# Руководство по цветам

## Динамические цвета

В проекте используются **динамические цвета**, которые загружаются с сервера и могут меняться для каждого курса.

### Определение цветов

```css
/* app/app.css */
@theme {
  --color-primary: var(--color-primary, #009dc5);
  --color-secondary: var(--color-secondary, #2196f3);
}
```

Цвета загружаются через loader и устанавливаются как CSS переменные в корневом элементе.

## Использование в Tailwind

### ✅ ПРАВИЛЬНО

Всегда используй короткие Tailwind классы:

```tsx
// Фон
<div className="bg-primary">...</div>

// Текст
<span className="text-primary">...</span>

// Рамка
<div className="border-primary">...</div>

// Ring (фокус)
<input className="focus:ring-primary" />

// Opacity
<div className="bg-primary/60">...</div>
```

### ❌ НЕПРАВИЛЬНО

НЕ используй:

```tsx
// ❌ Старые orange цвета
<div className="bg-orange-500">...</div>
<button className="hover:bg-orange-600">...</div>

// ❌ Длинная запись CSS переменных
<div className="bg-[var(--color-primary)]">...</div>

// ❌ Хардкод цветов
<div className="bg-[#009dc5]">...</div>
```

## Доступные классы

### Primary (основной цвет)

- `bg-primary` - фон
- `text-primary` - текст
- `border-primary` - рамка
- `ring-primary` - кольцо (фокус)
- `from-primary` - градиент (начало)
- `to-primary` - градиент (конец)

### Secondary (дополнительный цвет)

- `bg-secondary` - фон
- `text-secondary` - текст
- `border-secondary` - рамка
- `ring-secondary` - кольцо (фокус)

### С прозрачностью

```tsx
<div className="bg-primary/10">10% прозрачности</div>
<div className="bg-primary/20">20% прозрачности</div>
<div className="bg-primary/50">50% прозрачности</div>
<div className="bg-primary/60">60% прозрачности</div>
```

## Hover и состояния

### ✅ ПРАВИЛЬНО

Для hover эффектов используй `opacity`:

```tsx
<button className="bg-primary hover:opacity-80 transition-opacity">
  Кнопка
</button>

<button className="bg-primary hover:opacity-90 transition-all">
  Кнопка
</button>
```

### ❌ НЕПРАВИЛЬНО

```tsx
// ❌ НЕ используй разные shade цветов для hover
<button className="bg-primary hover:bg-primary-600">...</button>
```

## Примеры компонентов

### Кнопка

```tsx
<button className="bg-primary text-white rounded-lg px-4 py-2 hover:opacity-80 transition-all">
  Нажми меня
</button>
```

### Input с фокусом

```tsx
<input className="border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent" />
```

### Badge/Chip

```tsx
<span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
  Активен
</span>
```

### Иконка

```tsx
<svg className="text-primary w-5 h-5">
  <path d="..." />
</svg>
```

## Серые цвета

Для нейтральных элементов используй стандартные серые цвета:

```tsx
// Текст
text - gray - 900; // Основной текст
text - gray - 700; // Вторичный текст
text - gray - 500; // Вспомогательный текст
text - gray - 400; // Placeholder

// Фон
bg - gray - 50; // Очень светлый
bg - gray - 100; // Светлый
bg - gray - 200; // Средний
bg - white; // Белый

// Рамки
border - gray - 200; // Основная рамка
border - gray - 300; // Более заметная рамка
```

## Цвета состояний

### Успех (Success)

```tsx
<div className="bg-green-500 text-white">Успешно!</div>
```

### Ошибка (Error)

```tsx
<input className="border-red-500 focus:ring-red-500" />
<p className="text-red-500">Ошибка валидации</p>
```

### Предупреждение (Warning)

```tsx
<div className="bg-yellow-500 text-white">Внимание!</div>
```

### Информация (Info)

```tsx
<div className="bg-blue-500 text-white">Информация</div>
```

## Контраст и доступность

### Текст на primary фоне

```tsx
<div className="bg-primary text-white">
  Всегда используй белый текст на primary фоне
</div>
```

### Primary текст на белом фоне

```tsx
<div className="bg-white text-primary">
  Primary текст хорошо виден на белом фоне
</div>
```

## Проверка перед коммитом

Перед коммитом убедись, что:

- ✅ Нет использования `orange-*` классов
- ✅ Нет использования `bg-[var(--color-*)]`
- ✅ Все primary/secondary цвета используют короткие классы
- ✅ Hover эффекты используют `opacity`
- ✅ Нет хардкода hex цветов в className

## Миграция старого кода

Если видишь старый код, замени:

```tsx
// ❌ Было
<button className="bg-orange-500 hover:bg-orange-600">

// ✅ Стало
<button className="bg-primary hover:opacity-80">

// ❌ Было
<input className="focus:ring-[var(--color-primary)]" />

// ✅ Стало
<input className="focus:ring-primary" />
```

---

**Помни:** Динамические цвета - это ключевая фича проекта! Всегда используй `bg-primary` и `text-primary` вместо хардкода цветов. 🎨
