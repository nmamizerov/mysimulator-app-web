# Шрифтовая система - Шпаргалка

## 🎯 Быстрый справочник

### Заголовки

```tsx
<h1 className="text-h1">      // 48px / 700 / Главные заголовки
<h2 className="text-h2">      // 36px / 700 / Заголовки секций
<h3 className="text-h3">      // 30px / 600 / Подзаголовки
<h4 className="text-h4">      // 24px / 600 / Заголовки карточек
<h5 className="text-h5">      // 20px / 600 / Заголовки списков
<h6 className="text-h6">      // 18px / 600 / Мелкие заголовки
```

### Текст

```tsx
<p className="text-body">     // 16px / 400 / Основной текст
<p className="text-body-lg">  // 18px / 400 / Увеличенный
<p className="text-body-sm">  // 14px / 400 / Уменьшенный
```

### Подзаголовки

```tsx
<p className="text-subtitle-1">  // 16px / 500
<p className="text-subtitle-2">  // 14px / 500
```

### Вспомогательные

```tsx
<span className="text-caption">   // 12px / 400 / Подписи
<span className="text-overline">  // 12px / 500 / uppercase
```

### Кнопки

```tsx
<button className="text-button">     // 14px / 500 / uppercase
<button className="text-button-lg">  // 16px / 500 / uppercase
```

### Специальные

```tsx
<h1 className="text-display-1">  // 72px / 700 / Лендинги
<h1 className="text-display-2">  // 60px / 700 / Лендинги
<code className="text-code">     // 14px / mono / Код
```

## 📊 Таблица размеров

| Класс             | Размер | Вес  | Когда использовать  |
| ----------------- | ------ | ---- | ------------------- |
| `text-display-1`  | 72px   | 700  | Hero секции         |
| `text-display-2`  | 60px   | 700  | Большие заголовки   |
| `text-h1`         | 48px   | 700  | Главные страницы    |
| `text-h2`         | 36px   | 700  | Секции              |
| `text-h3`         | 30px   | 600  | Подсекции           |
| `text-h4`         | 24px   | 600  | Карточки            |
| `text-h5`         | 20px   | 600  | Списки              |
| `text-h6`         | 18px   | 600  | Мелкие элементы     |
| `text-body-lg`    | 18px   | 400  | Лиды, цитаты        |
| `text-body`       | 16px   | 400  | **Основной текст**  |
| `text-subtitle-1` | 16px   | 500  | Подзаголовки        |
| `text-body-sm`    | 14px   | 400  | Описания            |
| `text-subtitle-2` | 14px   | 500  | Лейблы              |
| `text-button`     | 14px   | 500  | Кнопки              |
| `text-button-lg`  | 16px   | 500  | Большие кнопки      |
| `text-code`       | 14px   | mono | Код                 |
| `text-caption`    | 12px   | 400  | Подписи, хинты      |
| `text-overline`   | 12px   | 500  | Надписи (uppercase) |

## ✨ Частые комбинации

### Заголовок страницы

```tsx
<h1 className="text-h1 text-gray-900">Заголовок</h1>
<p className="text-subtitle-1 text-gray-600">Описание</p>
```

### Карточка

```tsx
<h3 className="text-h4 text-gray-900">Название</h3>
<p className="text-body-sm text-gray-600">Описание</p>
<span className="text-caption text-gray-500">Дата</span>
```

### Форма

```tsx
<label className="text-subtitle-2 text-gray-700">Label</label>
<input className="text-body" />
<span className="text-caption text-gray-500">Подсказка</span>
```

### Кнопка

```tsx
<button className="text-button bg-primary text-white">Действие</button>
```

### Hero секция

```tsx
<h1 className="text-display-1 text-gray-900">Главная</h1>
<p className="text-h4 text-gray-600 font-normal">Подзаголовок</p>
```

## 💡 Советы

1. **Не смешивай** готовые классы с размерами:

   ```tsx
   ❌ <h1 className="text-h1 text-xl">     // Конфликт
   ✅ <h1 className="text-h1 text-primary"> // OK
   ```

2. **Используй адаптивность**:

   ```tsx
   <h1 className="text-h3 md:text-h2 lg:text-h1">
   ```

3. **Комбинируй с цветами**:

   ```tsx
   <p className="text-body text-gray-700 hover:text-gray-900">
   ```

4. **Семантические теги**:
   ```tsx
   ✅ <h1 className="text-h1">
   ❌ <div className="text-h1">
   ```
