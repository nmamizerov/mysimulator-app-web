# Виджет `MobileHeader`

## 📍 Расположение

```
app/widgets/simulator-mobile-header/
├── ui/
│   ├── mobile-header.tsx    # Компонент
│   └── index.ts             # Экспорт UI
└── index.ts                 # Экспорт виджета
```

## 🎯 Назначение

Мобильный хедер для страницы симулятора. Показывается только на экранах меньше 1024px (lg breakpoint). Содержит логотип курса и бургер-кнопку для открытия меню.

## 📦 Импорт

```typescript
import { MobileHeader } from "@/widgets/simulator-mobile-header";
```

## 🔧 Props

```typescript
interface MobileHeaderProps {
  course: Course; // Объект курса для отображения логотипа и названия
  onMenuClick: () => void; // Callback при клике на бургер-меню
}
```

### `course: Course`

Объект курса, который содержит:

- `name` - название курса для отображения
- Первая буква названия используется для генерации логотипа

### `onMenuClick: () => void`

Функция, которая вызывается при клике на бургер-кнопку. Обычно это `toggle` из хука `useMobileMenu`.

## 💡 Использование

### Базовый пример

```typescript
import { MobileHeader } from "@/widgets/simulator-mobile-header";
import { useMobileMenu } from "@/shared/lib";

export const SimulatorPage = () => {
  const course = useCourse();
  const { toggle } = useMobileMenu();

  return (
    <div>
      <MobileHeader course={course} onMenuClick={toggle} />
      {/* Остальной контент */}
    </div>
  );
};
```

### Полный пример с меню

```typescript
import { MobileHeader } from "@/widgets/simulator-mobile-header";
import { SimulatorSidebar } from "@/widgets/simulator-sidebar";
import { useMobileMenu, useCourse } from "@/shared/lib";

export const SimulatorPage = () => {
  const course = useCourse();
  const { isOpen, toggle, close } = useMobileMenu();

  return (
    <div className="flex h-screen">
      {/* Мобильный хедер */}
      <MobileHeader course={course} onMenuClick={toggle} />

      {/* Сайдбар с меню */}
      <SimulatorSidebar
        course={course}
        isMobileMenuOpen={isOpen}
        onMobileMenuClose={close}
      />

      {/* Основной контент */}
      <main className="flex-1 pt-16 lg:pt-0">
        {/* Контент страницы */}
      </main>
    </div>
  );
};
```

## 🎨 Внешний вид

### Структура компонента

```
┌─────────────────────────────────────┐
│ [LOGO]                      [☰]    │
└─────────────────────────────────────┘
```

### Элементы

1. **Логотип курса** (слева)
   - Изображение курса из `course.logo`
   - Размер: 80×45px (как в `AppHeader`)
   - `object-contain` для сохранения пропорций

2. **Бургер-кнопка** (справа)
   - Иконка "три полоски"
   - Hover эффект изменения цвета
   - Focus ring для доступности

## 📱 Адаптивность

### Видимость

```css
/* Показывается только на мобильных устройствах */
className="lg:hidden"
```

- **< 1024px**: Виден
- **≥ 1024px**: Скрыт (показывается обычный сайдбар)

### Позиционирование

```css
/* Fixed позиционирование сверху */
className="fixed top-0 left-0 right-0 z-40"
```

- `z-40` - чуть ниже сайдбара (z-50) и оверлея (z-40)
- Высота: `h-16` (64px)

### Отступы для контента

При использовании этого хедера, не забудь добавить отступ сверху для основного контента:

```typescript
<main className="pt-16 lg:pt-0">
  {/* На мобилке pt-16 для хедера, на desktop pt-0 */}
</main>
```

## ♿ Доступность

### Aria-атрибуты

```typescript
<button
  onClick={onMenuClick}
  aria-label="Открыть меню"
  tabIndex={0}
>
```

### Клавиатурная навигация

- `tabIndex={0}` - кнопка доступна через Tab
- `focus:ring-2 focus:ring-orange-500` - визуальная индикация фокуса

### Focus Ring

```css
focus:outline-none
focus:ring-2
focus:ring-orange-500
focus:ring-offset-2
```

## 🎨 Стилизация

### Основные классы

```typescript
// Контейнер хедера
"lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200";

// Внутренний контейнер
"flex items-center justify-between px-4 h-16";

// Логотип
"w-[80px] h-[45px] object-contain";

// Бургер-кнопка
"p-2 -mr-2 text-gray-600 hover:text-gray-900 transition-colors";
```

### Цветовая палитра

- **Фон**: `bg-white` (белый)
- **Граница**: `border-gray-200` (светло-серая)
- **Иконка**: `text-gray-600` (серый) → `hover:text-gray-900` (черный при наведении)

## 🔍 Технические детали

### Логотип курса

```typescript
{course.logo && (
  <img
    src={course.logo}
    alt={course.name}
    className="w-[80px] h-[45px] object-contain"
    aria-label="Логотип курса"
  />
)}
```

Используется настоящее изображение курса, идентично `AppHeader`. Размеры 80×45px с `object-contain` для сохранения пропорций.

### SVG иконка бургера

```svg
<svg width="24" height="24" viewBox="0 0 24 24">
  <path d="M4 6h16M4 12h16M4 18h16" />
</svg>
```

Три горизонтальные линии, классическая иконка меню.

## 🔗 Связанные компоненты

- [`useMobileMenu`](../hooks/use-mobile-menu.md) - Хук для управления меню
- [`SimulatorSidebar`](./simulator-sidebar.md) - Сайдбар, который открывается по клику
- [`SimulatorPage`](../pages/simulator-page.md) - Страница, где используется

## ✅ Best Practices

### ✅ Хорошо

```typescript
// Используй с хуком useMobileMenu
const { toggle } = useMobileMenu();
<MobileHeader course={course} onMenuClick={toggle} />

// Не забудь отступ для контента
<main className="pt-16 lg:pt-0">
  {/* Контент */}
</main>
```

### ❌ Плохо

```typescript
// Не создавай обертки над toggle
const handleMenuClick = () => {
  toggle();
}; // ❌

// Не забывай про адаптивные отступы
<main>{
  /* Контент будет под хедером! */
};
```

## 🐛 Типичные проблемы

### Проблема: Контент уходит под хедер

**Решение**: Добавь `pt-16` для main на мобилке:

```typescript
<main className="pt-16 lg:pt-0">
```

### Проблема: Хедер показывается на desktop

**Решение**: Проверь, что используется `lg:hidden`:

```typescript
<header className="lg:hidden ...">
```

### Проблема: Меню не открывается

**Решение**: Проверь, что callback передан и вызывается:

```typescript
// ✅ Правильно
<MobileHeader onMenuClick={toggle} />

// ❌ Неправильно
<MobileHeader onMenuClick={() => {}} />
```

## 📝 История изменений

- **v1.0.0** (2024) - Первая версия
  - Логотип курса (первая буква)
  - Название курса с обрезкой
  - Бургер-кнопка с иконкой
  - Адаптивная видимость
  - Accessibility атрибуты
