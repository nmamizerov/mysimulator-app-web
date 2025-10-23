# MySimulator - Структура проекта

## ✅ Созданная структура

```
app/
├── pages/                                      # Слой страниц (UI)
│   ├── home/                                  # Главная страница
│   │   ├── ui/
│   │   │   ├── home-page.tsx                 # UI компонент главной
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── login/                                 # Страница входа
│   │   ├── ui/
│   │   │   ├── login-page.tsx                # UI компонент входа
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── register/                              # Страница регистрации
│   │   ├── ui/
│   │   │   ├── register-page.tsx             # UI компонент регистрации
│   │   │   └── index.ts
│   │   └── index.ts
│   └── simulator/                             # Страница симулятора
│       ├── ui/
│       │   ├── simulator-page.tsx            # UI компонент симулятора
│       │   └── index.ts
│       └── index.ts
├── routes/                                     # Роуты React Router v7
│   ├── home/
│   │   └── route.tsx                         # Роут главной страницы
│   ├── login/
│   │   └── route.tsx                         # Роут страницы входа
│   ├── register/
│   │   └── route.tsx                         # Роут страницы регистрации
│   └── lesson.$lessonId.simulator.$simulatorId/
│       └── route.tsx                         # Роут симулятора (динамический)
├── shared/                                     # Общие модули
│   ├── api/
│   │   └── index.ts                          # Базовая настройка API
│   ├── lib/
│   │   ├── types.ts                          # Глобальные типы
│   │   ├── utils/
│   │   │   └── index.ts                      # Утилиты
│   │   └── index.ts                          # Экспорты lib
│   └── ui/                                    # UI компоненты
│       ├── button/
│       │   ├── button.tsx
│       │   └── index.ts
│       ├── card/
│       │   ├── card.tsx
│       │   └── index.ts
│       ├── chip/
│       │   ├── chip.tsx
│       │   └── index.ts
│       ├── input/
│       │   ├── input.tsx
│       │   └── index.ts
│       ├── progress/
│       │   ├── progress.tsx
│       │   └── index.ts
│       └── index.ts                           # Экспорты UI компонентов
├── widgets/                                    # Виджеты (композитные компоненты)
│   └── simulator-sidebar/                     # Сайдбар симулятора ✅
│       ├── ui/
│       │   └── simulator-sidebar.tsx         # UI компонент
│       ├── model/
│       │   └── use-sidebar.ts                # Логика раскрытия уроков
│       └── index.ts
├── entities/                                   # Бизнес-сущности
│   ├── block/
│   │   ├── ui/
│   │   │   ├── block-item.tsx               # Компонент блока симулятора ✅
│   │   │   └── index.ts
│   │   ├── model/
│   │   │   └── types.ts
│   │   └── index.ts
│   ├── course/
│   │   ├── api/
│   │   │   └── course.api.ts
│   │   ├── model/
│   │   │   └── types.ts
│   │   └── index.ts
│   ├── lesson/
│   │   ├── api/
│   │   │   └── lesson.api.ts
│   │   ├── model/
│   │   │   └── types.ts
│   │   └── index.ts
│   ├── session/
│   │   ├── api/
│   │   │   └── session.api.ts
│   │   ├── model/
│   │   │   ├── session.slice.ts
│   │   │   └── types.ts
│   │   └── index.ts
│   └── simulator/
│       ├── api/
│       │   └── simulator.api.ts
│       ├── model/
│       │   └── types.ts
│       └── index.ts
├── routes.ts                                   # Конфигурация всех роутов ✅
├── root.tsx                                    # Корневой компонент
└── app.css                                     # Глобальные стили
```

## 🎯 Доступные роуты

| URL                                        | Описание                   | Компонент       |
| ------------------------------------------ | -------------------------- | --------------- |
| `/`                                        | Главная страница (Landing) | `HomePage`      |
| `/login`                                   | Страница входа             | `LoginPage`     |
| `/register`                                | Страница регистрации       | `RegisterPage`  |
| `/lesson/:lessonId/simulator/:simulatorId` | Страница симулятора        | `SimulatorPage` |

## 📋 Что было создано

### 1. Базовая структура Shared

- ✅ `shared/ui/` - для переиспользуемых UI компонентов
- ✅ `shared/lib/types.ts` - глобальные TypeScript типы (User, Lesson, Simulator)
- ✅ `shared/lib/utils/` - утилиты (formatDate, cn)
- ✅ `shared/api/` - базовая настройка API (fetcher, API_BASE_URL)

### 2. Страницы (Pages)

- ✅ **Home Page** - Landing с hero секцией, features и навигацией
- ✅ **Login Page** - Форма входа с валидацией
- ✅ **Register Page** - Форма регистрации с проверкой
- ✅ **Character Page** - Страница выбора персонажа
- ✅ **Simulator Page** - Страница симулятора с:
  - Сайдбаром навигации по курсу (320px)
  - Списком пройденных блоков
  - Отображением блоков с персонажами и без

### 3. Роуты (Routes)

- ✅ Конфигурация в `app/routes.ts`
- ✅ Index route для главной страницы
- ✅ Статические роуты для login/register
- ✅ Динамический роут с параметрами для симулятора

### 4. UI Компоненты (Shared)

- ✅ **BlockItem** - Отображение блоков симулятора (с/без персонажа)
- ✅ **Button** - Переиспользуемая кнопка
- ✅ **Card** - Карточка контента
- ✅ **Chip** - Чип/тег
- ✅ **Input** - Поле ввода
- ✅ **Progress** - Прогресс-бар

### 5. Виджеты (Widgets)

- ✅ **SimulatorSidebar** - Сайдбар навигации по курсу с:
  - Лого курса
  - Названием и прогрессом
  - Сворачиваемым списком уроков
  - Списком симуляторов в уроках
  - Выделением активного симулятора

### 6. Документация

- ✅ `context/fsd-structure.md` - подробное описание архитектуры
- ✅ `context/quick-start.md` - руководство быстрого старта
- ✅ `context/ui-components/block-item.md` - документация BlockItem
- ✅ `context/widgets/simulator-sidebar.md` - документация SimulatorSidebar
- ✅ `context/pages/simulator-page.md` - документация SimulatorPage

## 🚀 Как запустить

```bash
# Запуск dev сервера
npm run dev

# Доступные страницы:
# http://localhost:5173/
# http://localhost:5173/login
# http://localhost:5173/register
# http://localhost:5173/lesson/1/simulator/1
```

## ⚠️ Важные заметки

### Типы React Router

После первого запуска `npm run dev`, React Router автоматически сгенерирует типы в папке `.react-router/types/`. Это устранит ошибки линтера, связанные с `./+types/route`.

### FSD принципы

1. **Routes** в `app/routes/` - только конфигурация роутов (meta, loader, action)
2. **Pages** в `app/pages/` - UI компоненты и логика страниц
3. **Shared** в `app/shared/` - переиспользуемые модули

### Именование роутов

Для динамических роутов используется folder-based подход:

- URL: `/lesson/:lessonId/simulator/:simulatorId`
- Папка: `lesson.$lessonId.simulator.$simulatorId/`
- Файл: `route.tsx`

## 🎨 Дизайн система

### Цвета

- **Primary**: orange-600 (#ea580c)
- **Hover**: orange-700
- **Background**: gray-50, white
- **Text**: gray-900, gray-700, gray-600

### Компоненты

Все используют Tailwind CSS utility classes.

## 📚 Следующие шаги

1. [x] Создать переиспользуемые UI компоненты в `shared/ui/`
2. [x] Настроить RTK Query для API
3. [x] Создать виджет SimulatorSidebar
4. [x] Реализовать страницу симулятора с отображением блоков
5. [ ] Добавить интерактивность в симуляторы (прохождение блоков)
6. [ ] Добавить middleware для защищенных роутов
7. [ ] Создать общий layout с Header

## 📖 Документация

### Архитектура

- [FSD Architecture](./context/fsd-structure.md)
- [Quick Start Guide](./context/quick-start.md)

### Компоненты

- [BlockItem Component](./context/ui-components/block-item.md)
- [Button Component](./context/ui-components/button.md)
- [Input Component](./context/ui-components/input.md)

### Виджеты

- [SimulatorSidebar Widget](./context/widgets/simulator-sidebar.md)

### Страницы

- [Simulator Page](./context/pages/simulator-page.md)

### Система

- [Typography System](./context/typography-system.md)
- [Typography Cheatsheet](./context/typography-cheatsheet.md)

### Внешние ресурсы

- [React Router v7 Docs](https://reactrouter.com)
- [Redux Toolkit Docs](https://redux-toolkit.js.org)
