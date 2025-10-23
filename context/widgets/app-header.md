# AppHeader Widget

## Описание

Виджет шапки приложения с логотипом курса и навигацией. Переиспользуемый компонент для всех страниц приложения.

## Расположение

```
app/widgets/app-header/
├── ui/
│   └── app-header.tsx    # UI компонент header
└── index.ts              # Экспорты
```

## Функциональность

1. **Логотип курса** - клик по логотипу переводит на главную страницу
2. **Иконка профиля** - клик переводит на страницу профиля (опционально)
3. **Адаптивность** - responsive дизайн с контейнером max-w-4xl
4. **Визуальный feedback** - hover эффекты на интерактивных элементах

## Props

```typescript
interface AppHeaderProps {
  showProfileIcon?: boolean; // Показывать ли иконку профиля (default: true)
}
```

## Использование

### На главной странице (с иконкой профиля):

```tsx
import { AppHeader } from "@/widgets/app-header";

export const HomePage = () => {
  return (
    <div>
      <AppHeader showProfileIcon={true} />
      {/* Основной контент */}
    </div>
  );
};
```

### На странице профиля (без иконки профиля):

```tsx
import { AppHeader } from "@/widgets/app-header";

export const ProfilePage = () => {
  return (
    <div>
      <AppHeader showProfileIcon={false} />
      {/* Основной контент */}
    </div>
  );
};
```

### По умолчанию (иконка профиля показывается):

```tsx
<AppHeader />
// Эквивалентно: <AppHeader showProfileIcon={true} />
```

## Структура компонента

```tsx
<header className="min-h-16 py-4 border-b border-gray-200">
  <div className="container max-w-4xl mx-auto">
    {/* Логотип с навигацией на главную */}
    <img onClick={handleLogoClick} />

    {/* Иконка профиля (опционально) */}
    {showProfileIcon && <button onClick={handleProfileClick} />}
  </div>
</header>
```

## Зависимости

### Внешние модули:

- `react-router` - навигация между страницами
- `@heroicons/react/24/solid` - иконка профиля
- `@/shared/lib` - хук `useCourse()` для получения данных курса

### Используемые хуки:

- `useNavigate()` - программная навигация
- `useCourse()` - получение данных курса (логотип, название)

## Навигация

### Клик по логотипу:

```tsx
const handleLogoClick = () => {
  navigate("/");
};
```

Переводит пользователя на главную страницу (`/`)

### Клик по иконке профиля:

```tsx
const handleProfileClick = () => {
  navigate("/profile");
};
```

Переводит пользователя на страницу профиля (`/profile`)

## Доступность (A11y)

Виджет следует принципам доступности:

1. **aria-label** на элементах:
   - Логотип: `"Перейти на главную"`
   - Иконка профиля: `"Перейти в профиль"`

2. **Семантическая разметка**:
   - `<header>` для обертки
   - `<button>` для кликабельной иконки
   - `<img>` с корректным alt для логотипа

3. **Визуальный feedback**:
   - `cursor-pointer` на интерактивных элементах
   - Hover эффекты для понимания кликабельности

## Стилизация

### Header:

- `min-h-16` - минимальная высота 64px
- `py-4` - вертикальные отступы
- `border-b` - нижняя граница

### Контейнер:

- `max-w-4xl` - максимальная ширина 896px
- `mx-auto` - центрирование
- `flex justify-between` - размещение элементов по краям

### Логотип:

- `w-[80px] h-[45px]` - фиксированные размеры
- `cursor-pointer` - указатель при наведении
- `hover:opacity-80` - снижение прозрачности при hover
- `transition-opacity` - плавный переход

### Иконка профиля:

- `w-8 h-8` - размер 32x32px
- `cursor-pointer` - указатель при наведении
- `text-gray-600 hover:text-primary` - изменение цвета при hover
- `transition-colors` - плавный переход цвета

## Использование в страницах

### HomePage:

```tsx
// С иконкой профиля
<AppHeader showProfileIcon={true} />
```

### ProfilePage:

```tsx
// Без иконки профиля (т.к. мы уже в профиле)
<AppHeader showProfileIcon={false} />
```

### CharacterPage:

```tsx
// Можно добавить без иконки или с иконкой
<AppHeader showProfileIcon={false} />
```

### SimulatorPage:

```tsx
// Вероятно без иконки, т.к. есть своя навигация
<AppHeader showProfileIcon={false} />
```

## Преимущества виджета

1. **Переиспользование** - один компонент на всех страницах
2. **Консистентность** - единый стиль header по всему приложению
3. **Гибкость** - настройка через props
4. **Maintainability** - изменения в одном месте применяются везде
5. **DRY принцип** - нет дублирования кода

## Связанные компоненты

- **HomePage** - использует с иконкой профиля
- **ProfilePage** - использует без иконки профиля
- **CharacterPage** - может использовать для консистентности

## Дальнейшее развитие

Возможные улучшения:

- [ ] Добавить мобильное меню (burger menu)
- [ ] Добавить breadcrumbs навигацию
- [ ] Добавить dropdown меню в иконке профиля
- [ ] Добавить уведомления
- [ ] Добавить поиск
- [ ] Добавить переключатель темы
- [ ] Добавить меню навигации между уроками
