# LogoutButton Component

## Описание

`LogoutButton` - это компонент кнопки для выхода из системы. При нажатии он удаляет токен из Redux store и localStorage, а затем перенаправляет пользователя на страницу логина.

## Местоположение

```
app/shared/ui/logout-button/
├── logout-button.tsx
└── index.ts
```

## Импорт

```typescript
import { LogoutButton } from "@/shared/ui";
```

## Props

```typescript
interface LogoutButtonProps {
  variant?: "primary" | "secondary" | "ghost"; // Стиль кнопки
  size?: "sm" | "md" | "lg"; // Размер кнопки
  fullWidth?: boolean; // Кнопка на всю ширину
  className?: string; // Дополнительные CSS классы
  children?: React.ReactNode; // Контент кнопки
}
```

### Значения по умолчанию

- `variant` = `"ghost"`
- `size` = `"md"`
- `fullWidth` = `false`
- `children` = `"Выйти"`

## Использование

### Базовое использование

```tsx
import { LogoutButton } from "@/shared/ui";

const Header = () => {
  return (
    <header>
      <nav>
        <LogoutButton />
      </nav>
    </header>
  );
};
```

### С кастомным текстом

```tsx
<LogoutButton>Завершить сеанс</LogoutButton>
```

### Разные варианты стилей

```tsx
// Ghost вариант (по умолчанию)
<LogoutButton variant="ghost" />

// Primary вариант
<LogoutButton variant="primary" />

// Secondary вариант
<LogoutButton variant="secondary" />
```

### Разные размеры

```tsx
// Маленькая кнопка
<LogoutButton size="sm" />

// Средняя кнопка (по умолчанию)
<LogoutButton size="md" />

// Большая кнопка
<LogoutButton size="lg" />
```

### Полная ширина

```tsx
<LogoutButton fullWidth />
```

### С дополнительными стилями

```tsx
<LogoutButton className="ml-auto" />
```

### В меню пользователя

```tsx
import { LogoutButton } from "@/shared/ui";
import { useSelector } from "react-redux";
import type { RootState } from "@/core/store/store";

const UserMenu = () => {
  const user = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (!user) return null;

  return (
    <div className="dropdown">
      <button>Меню пользователя</button>
      <div className="dropdown-menu">
        <a href="/profile">Профиль</a>
        <a href="/settings">Настройки</a>
        <hr />
        <LogoutButton variant="ghost" fullWidth>
          Выйти из аккаунта
        </LogoutButton>
      </div>
    </div>
  );
};
```

### В Header

```tsx
import { LogoutButton } from "@/shared/ui";
import { useSelector } from "react-redux";
import type { RootState } from "@/core/store/store";

const Header = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center gap-4">
        <h1>MySimulator</h1>
      </div>

      <nav className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <a href="/dashboard">Дашборд</a>
            <a href="/profile">Профиль</a>
            <LogoutButton variant="ghost" />
          </>
        ) : (
          <>
            <a href="/login">Войти</a>
            <a href="/register">Регистрация</a>
          </>
        )}
      </nav>
    </header>
  );
};
```

## Внутреннее устройство

### Что происходит при клике?

1. **Вызывается `dispatch(logout())`**
   - Удаляет токен из Redux store (`state.auth.token = null`)
   - Устанавливает `state.auth.isAuthenticated = false`
   - Удаляет токен из localStorage (`localStorage.removeItem("access_token")`)

2. **Вызывается `navigate("/login")`**
   - Перенаправляет пользователя на страницу логина
   - Использует React Router для навигации

### Код компонента

```tsx
import { useDispatch } from "react-redux";
import { logout } from "@/entities/session";
import { useNavigate } from "react-router";
import { Button } from "../button";

export const LogoutButton = ({ variant = "ghost", size = "md", ...props }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Button variant={variant} size={size} onClick={handleLogout} {...props} />
  );
};
```

## Связанные компоненты

- [Button](./button.md) - Базовый компонент кнопки
- [Auth System](../auth/auth-system.md) - Система аутентификации

## Особенности

### ✅ Что делает компонент

- Автоматически удаляет токен из Redux и localStorage
- Перенаправляет на страницу логина
- Наследует все пропсы от компонента Button
- Работает со всеми вариантами стилей Button

### ⚠️ Важно знать

- Компонент не требует подтверждения выхода (можно добавить через модальное окно)
- После выхода все защищенные API запросы будут возвращать 401 Unauthorized
- Перенаправление на `/login` можно изменить, передав другой путь

## Улучшения (если нужно)

### Добавить подтверждение выхода

```tsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/entities/session";
import { useNavigate } from "react-router";
import { Button } from "../button";

export const LogoutButton = (props) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }

    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <Button onClick={handleLogout} {...props}>
        {showConfirm ? "Точно выйти?" : "Выйти"}
      </Button>
      {showConfirm && (
        <button onClick={() => setShowConfirm(false)}>Отмена</button>
      )}
    </>
  );
};
```

### Добавить кастомный редирект

```tsx
interface LogoutButtonProps {
  // ... остальные пропсы
  redirectTo?: string; // Путь для редиректа после выхода
}

export const LogoutButton = ({ redirectTo = "/login", ...props }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate(redirectTo);
  };

  // ...
};
```

## Примеры из проекта

См. также:

- `app/core/layout/appLayout.tsx` - использование в Layout (если есть)
- `app/widgets/header/` - использование в Header (если есть)
