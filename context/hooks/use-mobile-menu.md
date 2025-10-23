# Хук `useMobileMenu`

## 📍 Расположение

```
app/shared/lib/hooks/use-mobile-menu.ts
```

## 🎯 Назначение

Хук для управления состоянием мобильного меню. Предоставляет методы открытия/закрытия меню, автоматически блокирует скролл body при открытии и закрывает меню при ресайзе на desktop.

## 📦 Импорт

```typescript
import { useMobileMenu } from "@/shared/lib";
```

## 🔧 API

### Возвращаемое значение

```typescript
interface UseMobileMenuReturn {
  isOpen: boolean; // Открыто ли меню
  open: () => void; // Функция открытия меню
  close: () => void; // Функция закрытия меню
  toggle: () => void; // Функция переключения меню
}
```

## 💡 Использование

### Базовый пример

```typescript
import { useMobileMenu } from "@/shared/lib";

export const MyComponent = () => {
  const { isOpen, toggle, close } = useMobileMenu();

  return (
    <>
      <button onClick={toggle}>
        {isOpen ? "Закрыть" : "Открыть"} меню
      </button>

      {isOpen && (
        <div className="mobile-menu">
          <button onClick={close}>✕</button>
          {/* Контент меню */}
        </div>
      )}
    </>
  );
};
```

### Пример с оверлеем

```typescript
import { useMobileMenu } from "@/shared/lib";

export const MyComponent = () => {
  const { isOpen, toggle, close } = useMobileMenu();

  return (
    <>
      {/* Бургер-кнопка */}
      <button onClick={toggle}>☰</button>

      {/* Оверлей */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={close}
        />
      )}

      {/* Меню */}
      <aside className={`
        fixed top-0 left-0 h-screen w-64 z-50
        transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Контент меню */}
      </aside>
    </>
  );
};
```

## ⚙️ Особенности

### 1. Автоблокировка скролла

Когда меню открыто, скролл страницы автоматически блокируется:

```typescript
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}, [isOpen]);
```

### 2. Автозакрытие при ресайзе

Меню автоматически закрывается, если пользователь увеличивает окно до desktop размера (≥1024px):

```typescript
useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 1024 && isOpen) {
      close();
    }
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, [isOpen]);
```

## 🎨 Рекомендации по стилизации

### Анимация появления меню

```typescript
<aside className={clsx(
  "fixed top-0 left-0 h-screen w-64 z-50",
  "bg-white transition-transform duration-300 ease-in-out",
  isOpen ? "translate-x-0" : "-translate-x-full"
)}>
  {/* Контент */}
</aside>
```

### Оверлей с анимацией

```typescript
{isOpen && (
  <div
    className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
    onClick={close}
  />
)}
```

## 🔍 Примеры использования в проекте

### SimulatorPage

```typescript
export const SimulatorPage = ({ lessonId, simulatorId }) => {
  const { isOpen, toggle, close } = useMobileMenu();

  return (
    <div className="flex h-screen">
      <MobileHeader onMenuClick={toggle} />

      <SimulatorSidebar
        isMobileMenuOpen={isOpen}
        onMobileMenuClose={close}
      />

      <main>{/* Контент */}</main>
    </div>
  );
};
```

## ✅ Best Practices

### ✅ Хорошо

```typescript
// Использование деструктуризации для получения только нужных методов
const { isOpen, close } = useMobileMenu();

// Передача callbacks в дочерние компоненты
<MobileMenu isOpen={isOpen} onClose={close} />
```

### ❌ Плохо

```typescript
// Не нужно создавать обертки над методами
const handleClose = () => {
  close();
};

// Не нужно дублировать состояние
const [menuOpen, setMenuOpen] = useState(isOpen); // ❌
```

## 🔗 Связанные компоненты

- [`MobileHeader`](../widgets/simulator-mobile-header.md) - Использует этот хук
- [`SimulatorSidebar`](../widgets/simulator-sidebar.md) - Принимает props от этого хука
- [`SimulatorPage`](../pages/simulator-page.md) - Интегрирует мобильное меню

## 📝 История изменений

- **v1.0.0** (2024) - Первая версия с базовым функционалом
  - Открытие/закрытие меню
  - Блокировка скролла
  - Автозакрытие при ресайзе
