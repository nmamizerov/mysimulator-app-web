# Block API

## Описание

RTK Query API для работы с блоками симулятора. Предоставляет методы для завершения блоков пользователем.

## Расположение

```
app/entities/block/api/block.api.ts
```

## Endpoints

### completeBlock

Мутация для завершения блока пользователем.

**Метод:** `PATCH`  
**URL:** `/user_blocks/{user_block_id}/complete`

#### Параметры

```typescript
interface CompleteBlockRequest {
  answer: string; // Ответ пользователя (может быть пустым для типа "button")
  id: number; // ID пользовательского блока (дублируется для валидации)
}

// Аргументы мутации
{
  userBlockId: number; // ID пользовательского блока (в URL)
  data: CompleteBlockRequest; // Тело запроса
}
```

#### Возвращаемое значение

```typescript
void // Успешное завершение не возвращает данных
```

#### Invalidation Tags

После успешного завершения инвалидируются теги:

- `"Simulator"` - общий тег для всех симуляторов
- `{ type: "Simulator", id: userBlockId }` - специфичный тег

Это приводит к автоматическому перезапросу данных симулятора.

## Использование

### Базовое использование

```tsx
import { useCompleteBlockMutation } from "@/entities/block";

const MyComponent = () => {
  const [completeBlock, { isLoading, isError, isSuccess }] =
    useCompleteBlockMutation();

  const handleComplete = async (userBlockId: number, answer: string) => {
    try {
      await completeBlock({
        userBlockId,
        data: { answer, id: userBlockId },
      }).unwrap();

      console.log("Блок успешно завершен");
    } catch (error) {
      console.error("Ошибка при завершении блока:", error);
    }
  };

  return (
    <button
      onClick={() => handleComplete(123, "Мой ответ")}
      disabled={isLoading}
    >
      {isLoading ? "Отправка..." : "Отправить"}
    </button>
  );
};
```

### Использование в AnswerField

```tsx
// В компоненте AnswerField
const [completeBlock, { isLoading }] = useCompleteBlockMutation();

const handleComplete = async (answer: string) => {
  try {
    await completeBlock({
      userBlockId,
      data: { answer, id: userBlockId },
    }).unwrap();

    // Очистка формы
    setInputValue("");
    setRows(1);
  } catch (error) {
    console.error("Ошибка при завершении блока:", error);
  }
};
```

## Состояния мутации

RTK Query автоматически предоставляет следующие состояния:

```typescript
const [completeBlock, result] = useCompleteBlockMutation();

// Доступные состояния в result:
result.isLoading; // true во время выполнения запроса
result.isSuccess; // true после успешного завершения
result.isError; // true при ошибке
result.error; // Объект ошибки
result.data; // Возвращаемые данные (void в данном случае)
```

## Обработка ошибок

```tsx
const handleComplete = async () => {
  try {
    await completeBlock({
      userBlockId: 123,
      data: { answer: "Ответ", id: 123 },
    }).unwrap();
  } catch (error) {
    if ("status" in error) {
      // HTTP ошибка
      console.error(`Ошибка ${error.status}:`, error.data);
    } else {
      // Сетевая ошибка
      console.error("Сетевая ошибка:", error);
    }
  }
};
```

## Cache Invalidation

После успешного завершения блока автоматически обновляются:

1. **Данные симулятора** - через тег `"Simulator"`
2. **Конкретный блок** - через тег с ID

Это означает, что компоненты, использующие `useGetSimulatorQuery`, автоматически получат обновленные данные.

### Пример автообновления

```tsx
// В SimulatorPage
const { data: simulator } = useGetSimulatorQuery({ simulatorId: 1 });

// После вызова completeBlock в AnswerField,
// simulator.user.blocks автоматически обновится
```

## Типы запроса/ответа

### CompleteBlockRequest

```typescript
interface CompleteBlockRequest {
  answer: string; // Ответ пользователя
  id: number; // ID пользовательского блока
}
```

**Примеры:**

```typescript
// Для типа "button"
{ answer: "", id: 123 }

// Для типа "answers"
{ answer: "Вариант 1", id: 123 }

// Для типа "text"
{ answer: "Развернутый ответ пользователя", id: 123 }
```

## Backend Contract

API endpoint на бэкенде:

```python
@router.patch("/user_blocks/{user_block_id}/complete")
async def complete_block(
    user_block_id: int,
    data: CompleteBlock,
    complete_service: CompleteService = Depends(complete_service_dependency),
) -> None:
    """Пройти блок"""
    await complete_service.complete_block(user_block_id, data)
```

## Интеграция с baseApi

API создается через `injectEndpoints` из базового API:

```typescript
import { baseApi } from "@/shared/api";

export const blockApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    completeBlock: builder.mutation<void, CompleteBlockArgs>({
      // ...
    }),
  }),
});
```

Это позволяет:

- Использовать общую конфигурацию (baseUrl, credentials)
- Автоматически добавлять endpoints в store
- Использовать общие middleware

## Связанные файлы

- `app/shared/api/index.ts` - базовый API
- `app/entities/block/ui/answer-field.tsx` - основной потребитель API
- `app/entities/simulator/api/simulator.api.ts` - API симулятора
- `app/entities/block/model/types.ts` - типы блоков
