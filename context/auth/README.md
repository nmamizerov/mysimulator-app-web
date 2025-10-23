# Документация системы аутентификации

## 📚 Содержание

1. [auth-quick-guide.md](./auth-quick-guide.md) - **Начни отсюда!** Быстрый гайд с примерами
2. [auth-system.md](./auth-system.md) - Полная документация системы
3. [client-vs-server-auth.md](./client-vs-server-auth.md) - Сравнение клиентской и серверной проверки
4. [use-auth-guard.md](../hooks/use-auth-guard.md) - Документация хука для защиты роутов

## 🎯 Что было сделано

### Миграция с серверной на клиентскую проверку

✅ **Удалено:**

- Серверная проверка токена в `root.tsx` loader
- Проверка cookies на сервере
- `credentials: "include"` из API конфигурации

✅ **Добавлено:**

- Клиентская проверка через хук `useAuthGuard`
- Токен в localStorage + Redux
- Authorization header для всех запросов

### Создано

1. **Auth Slice** (`app/entities/session/model/auth.slice.ts`)
   - Redux slice для управления токеном
   - Автоматическая синхронизация с localStorage
   - SSR-безопасная работа

2. **Auth Guard Hook** (`app/shared/lib/hooks/use-auth-guard.ts`)
   - Клиентская проверка авторизации
   - Автоматический редирект на /login
   - Сохранение пути для возврата

3. **Обновлен API** (`app/shared/api/index.ts`)
   - Автоматическое добавление токена в заголовки всех запросов
   - Формат: `Authorization: Bearer {token}`
   - Убран `credentials: "include"`

4. **Обновлены endpoints** (`app/entities/session/api/session.api.ts`)
   - Автоматическое сохранение токена после login/register
   - Использование `onQueryStarted` для сохранения токена

5. **Обновлен store** (`app/core/store/store.ts`)
   - Подключен auth reducer

6. **Обновлен Layout** (`app/core/layout/appLayout.tsx`)
   - Добавлен вызов `useAuthGuard()` для защиты роутов

7. **Улучшены страницы** (`app/pages/login`, `app/pages/register`)
   - Добавлена обработка ошибок
   - Индикация загрузки
   - Использование `.unwrap()` для обработки промисов
   - Возврат на нужную страницу после логина

8. **Создан компонент** (`app/shared/ui/logout-button`)
   - Готовый к использованию компонент для выхода
   - Документация в [logout-button.md](../ui-components/logout-button.md)

## 🚀 Быстрый старт

### Логин

```tsx
const [login] = useLoginMutation();
await login({ username: "user@example.com", password: "password" }).unwrap();
// ✅ Токен сохранен автоматически
```

### Выход

```tsx
const dispatch = useDispatch();
dispatch(logout());
// ✅ Токен удален из Redux и localStorage
```

### Проверка авторизации

```tsx
const { isAuthenticated } = useSelector((state: RootState) => state.auth);
```

## 📦 Структура файлов

```
app/
├── entities/session/
│   ├── model/
│   │   ├── auth.slice.ts           ← Новый файл (Redux slice)
│   │   └── types.ts
│   ├── api/
│   │   └── session.api.ts          ← Обновлен (добавлен onQueryStarted)
│   └── index.ts                    ← Обновлен (экспорты)
│
├── core/store/
│   └── store.ts                    ← Обновлен (подключен auth reducer)
│
├── shared/
│   ├── api/
│   │   └── index.ts                ← Обновлен (добавление токена в headers)
│   └── ui/
│       └── logout-button/          ← Новый компонент
│           ├── logout-button.tsx
│           └── index.ts
│
└── pages/
    ├── login/ui/login-page.tsx     ← Улучшен (обработка ошибок)
    └── register/ui/register-page.tsx ← Улучшен (обработка ошибок)
```

## 🔄 Поток работы

```
1. Пользователь вводит логин/пароль
   ↓
2. useLoginMutation отправляет запрос
   ↓
3. Сервер возвращает { access_token, token_type }
   ↓
4. onQueryStarted → dispatch(setToken(access_token))
   ↓
5. Auth Slice сохраняет токен в:
   - Redux store (state.auth.token)
   - localStorage (access_token)
   ↓
6. Все последующие API запросы содержат:
   Authorization: Bearer {token}
```

## 🔑 Ключевые импорты

```tsx
// Хуки
import {
  useLoginMutation,
  useRegisterMutation,
  useUserInfoQuery,
} from "@/entities/session";

// Actions
import { setToken, logout } from "@/entities/session";

// UI компоненты
import { LogoutButton } from "@/shared/ui";

// Типы
import type { RootState } from "@/core/store/store";
```

## ✅ Что работает автоматически

- ✅ Сохранение токена в localStorage после login/register
- ✅ Загрузка токена из localStorage при инициализации
- ✅ Добавление токена в заголовки всех API запросов
- ✅ Удаление токена при logout
- ✅ Сохранение сессии между перезагрузками страницы

## 📖 Документация

### Основная документация

- [auth-quick-guide.md](./auth-quick-guide.md) - Примеры использования
- [auth-system.md](./auth-system.md) - Детальное описание архитектуры

### Связанные документы

- [logout-button.md](../ui-components/logout-button.md) - Компонент LogoutButton
- [session.api.ts](../api/session-api.md) - API endpoints (если есть)

## 🐛 Troubleshooting

**Токен не добавляется в запросы?**
→ Проверь: `console.log(store.getState().auth.token)`

**Токен теряется после перезагрузки?**
→ Проверь localStorage: `localStorage.getItem("access_token")`

**401 Unauthorized после логина?**
→ Проверь формат: должно быть `Bearer {token}`

## 🎓 Дополнительные материалы

- [FSD Architecture](../fsd-structure.md) - Архитектура проекта
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) - Документация RTK Query
- [Redux Toolkit](https://redux-toolkit.js.org/) - Документация Redux Toolkit

---

**Вопросы?** См. детальную документацию в [auth-system.md](./auth-system.md)
