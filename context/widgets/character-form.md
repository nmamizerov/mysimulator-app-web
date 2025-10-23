# CharacterForm Widget

## Описание

Виджет формы создания/редактирования персонажа. Содержит поля для ввода имени, фамилии, выбора пола и аватара.

## Расположение

```
app/widgets/character-form/
├── model/
│   └── use-character-form.ts    # Хук для управления состоянием формы
├── ui/
│   └── character-form.tsx       # UI компонент формы
└── index.ts                     # Экспорты
```

## Архитектура

### Модель (`use-character-form.ts`)

Хук `useCharacterForm` содержит всю логику работы с формой:

- **Состояние формы** - хранит данные о персонаже (имя, фамилия, пол, аватар)
- **Валидация** - проверяет заполненность всех обязательных полей
- **Мутация** - отправляет данные на сервер через `useCreateCharacterMutation`

#### API хука:

```typescript
const {
  data, // Текущие данные формы
  updateField, // Обновление отдельного поля
  handleSubmit, // Отправка формы
  isLoading, // Статус загрузки
  isValid, // Валидация формы
} = useCharacterForm();
```

### UI (`character-form.tsx`)

Компонент отображает форму с полями:

1. **Имя и фамилия** - текстовые поля (`Input`)
2. **Пол** - выбор через чипы (`Chip`)
3. **Аватар** - выбор из галереи аватаров

#### Props:

```typescript
interface CharacterFormProps {
  onSuccess?: () => void; // Колбэк после успешного создания
  title?: string; // Заголовок формы
  description?: string; // Описание формы
  submitButtonText?: string; // Текст кнопки отправки
}
```

## Использование

### В странице создания персонажа

```tsx
import { CharacterForm } from "@/widgets/character-form";

export const CharacterPage = () => {
  const navigate = useNavigate();

  return (
    <CharacterForm
      onSuccess={() => navigate("/")}
      title="Добро пожаловать на курс"
      description="Создайте вашего персонажа"
      submitButtonText="Создать персонажа"
    />
  );
};
```

### В странице профиля

```tsx
import { CharacterForm } from "@/widgets/character-form";

export const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <CharacterForm
      onSuccess={() => navigate("/")}
      title="Профиль персонажа"
      description="Измените данные персонажа"
      submitButtonText="Сохранить изменения"
    />
  );
};
```

## Зависимости

### Внешние модули:

- `@/entities/session` - API для создания персонажа
- `@/shared/ui` - UI компоненты (Button, Chip, Input)
- `@/shared/lib/avatars` - Галерея аватаров

### Используемые хуки:

- `useCreateCharacterMutation()` - мутация для создания персонажа
- `useState()` - управление состоянием формы

## Типы данных

```typescript
interface CreateCharacterRequest {
  first_name: string;
  last_name: string;
  sex: "male" | "female";
  avatar: string;
}
```

## Особенности реализации

1. **Переиспользуемость** - виджет используется на разных страницах с разными настройками
2. **Разделение ответственности** - логика в хуке, UI в компоненте
3. **Типизация** - полная типизация всех props и данных
4. **Валидация** - проверка заполненности всех полей перед отправкой
5. **UX** - disabled кнопка при незаполненных полях или загрузке

## Взаимодействие с API

Виджет использует RTK Query мутацию `useCreateCharacterMutation` из `@/entities/session`:

```typescript
// Отправка данных
await createCharacter({
  first_name: "Иван",
  last_name: "Иванов",
  sex: "male",
  avatar: "man1",
});
```

## Дальнейшее развитие

Возможные улучшения:

- [ ] Добавить редактирование существующего персонажа
- [ ] Добавить загрузку пользовательского аватара
- [ ] Добавить больше полей (возраст, описание и т.д.)
- [ ] Добавить предпросмотр персонажа
