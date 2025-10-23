# Шрифтовая система типографики

## 📍 Расположение

`app/app.css` - определение типографических классов

## 📝 Описание

Готовая система типографики с предустановленными классами для всех типов текста в приложении. Каждый класс автоматически применяет размер шрифта, вес, высоту строки и межбуквенный интервал.

## 🎨 Использование

Просто добавь нужный класс к элементу:

```tsx
<h1 className="text-h1">Главный заголовок</h1>
<p className="text-body">Обычный текст параграфа</p>
<span className="text-caption">Маленькая подпись</span>
```

## 📐 Доступные классы

### Заголовки (Headings)

| Класс     | Размер          | Вес | Line Height | Letter Spacing | Пример использования      |
| --------- | --------------- | --- | ----------- | -------------- | ------------------------- |
| `text-h1` | 48px (3rem)     | 700 | 1.2         | -0.02em        | Главные заголовки страниц |
| `text-h2` | 36px (2.25rem)  | 700 | 1.2         | -0.02em        | Заголовки секций          |
| `text-h3` | 30px (1.875rem) | 600 | 1.3         | -0.01em        | Подзаголовки секций       |
| `text-h4` | 24px (1.5rem)   | 600 | 1.3         | 0              | Заголовки карточек        |
| `text-h5` | 20px (1.25rem)  | 600 | 1.4         | 0              | Заголовки списков         |
| `text-h6` | 18px (1.125rem) | 600 | 1.4         | 0              | Мелкие заголовки          |

### Подзаголовки (Subtitles)

| Класс             | Размер          | Вес | Line Height | Letter Spacing | Пример использования   |
| ----------------- | --------------- | --- | ----------- | -------------- | ---------------------- |
| `text-subtitle-1` | 16px (1rem)     | 500 | 1.5         | 0              | Подзаголовки большие   |
| `text-subtitle-2` | 14px (0.875rem) | 500 | 1.5         | 0.01em         | Подзаголовки маленькие |

### Основной текст (Body)

| Класс          | Размер          | Вес | Line Height | Letter Spacing | Пример использования      |
| -------------- | --------------- | --- | ----------- | -------------- | ------------------------- |
| `text-body`    | 16px (1rem)     | 400 | 1.5         | 0              | Основной текст параграфов |
| `text-body-lg` | 18px (1.125rem) | 400 | 1.5         | 0              | Увеличенный текст         |
| `text-body-sm` | 14px (0.875rem) | 400 | 1.5         | 0              | Уменьшенный текст         |

### Вспомогательный текст (Utility)

| Класс           | Размер         | Вес | Line Height | Letter Spacing | Пример использования          |
| --------------- | -------------- | --- | ----------- | -------------- | ----------------------------- |
| `text-caption`  | 12px (0.75rem) | 400 | 1.4         | 0.01em         | Подписи к изображениям, хинты |
| `text-overline` | 12px (0.75rem) | 500 | 1.4         | 0.1em          | Надстрочный текст (uppercase) |

### Кнопки (Buttons)

| Класс            | Размер          | Вес | Line Height | Letter Spacing | Пример использования                |
| ---------------- | --------------- | --- | ----------- | -------------- | ----------------------------------- |
| `text-button`    | 14px (0.875rem) | 500 | 1           | 0.02em         | Текст в обычных кнопках (uppercase) |
| `text-button-lg` | 16px (1rem)     | 500 | 1           | 0.02em         | Текст в больших кнопках (uppercase) |

### Специальные (Display)

| Класс            | Размер          | Вес  | Line Height | Letter Spacing | Пример использования               |
| ---------------- | --------------- | ---- | ----------- | -------------- | ---------------------------------- |
| `text-display-1` | 72px (4.5rem)   | 700  | 1           | -0.03em        | Огромные заголовки (лендинги)      |
| `text-display-2` | 60px (3.75rem)  | 700  | 1           | -0.03em        | Большие заголовки (лендинги)       |
| `text-code`      | 14px (0.875rem) | mono | 1.5         | 0              | Фрагменты кода, моноширинный шрифт |

## 💡 Примеры использования

### Заголовок страницы

```tsx
<div className="mb-8">
  <h1 className="text-h1 text-gray-900 mb-2">Добро пожаловать в MySimulator</h1>
  <p className="text-subtitle-1 text-gray-600">
    Интерактивная платформа для обучения
  </p>
</div>
```

### Секция с контентом

```tsx
<section className="py-12">
  <h2 className="text-h2 text-gray-900 mb-4">Наши курсы</h2>
  <p className="text-body text-gray-700 mb-6">
    Выберите курс для начала обучения. Каждый курс содержит теоретический
    материал и практические задания.
  </p>
  <span className="text-caption text-gray-500">Доступно 12 курсов</span>
</section>
```

### Карточка курса

```tsx
<div className="bg-white rounded-lg p-6 shadow-sm">
  <span className="text-overline text-primary mb-2 block">Веб-разработка</span>
  <h3 className="text-h4 text-gray-900 mb-2">Основы React</h3>
  <p className="text-body-sm text-gray-600 mb-4">
    Изучите основы библиотеки React для создания современных веб-приложений.
  </p>
  <button className="text-button text-white bg-primary px-4 py-2 rounded">
    Начать обучение
  </button>
</div>
```

### Форма с подписями

```tsx
<div className="space-y-4">
  <div>
    <label className="text-subtitle-2 text-gray-700 mb-1 block">Email</label>
    <input
      type="email"
      className="w-full border rounded-lg px-4 py-2 text-body"
    />
    <p className="text-caption text-gray-500 mt-1">
      Мы никогда не передадим вашу почту третьим лицам
    </p>
  </div>
</div>
```

### Лендинг (Hero секция)

```tsx
<div className="text-center py-20">
  <h1 className="text-display-1 text-gray-900 mb-4">MySimulator</h1>
  <p className="text-h4 text-gray-600 mb-8 font-normal">
    Будущее интерактивного обучения
  </p>
  <button className="text-button-lg bg-primary text-white px-8 py-4 rounded-lg">
    Начать бесплатно
  </button>
</div>
```

### Код и техническая информация

```tsx
<div className="bg-gray-100 rounded-lg p-4">
  <span className="text-caption text-gray-500 uppercase">API Endpoint</span>
  <code className="text-code text-gray-900 block mt-2">
    https://api.mysimulator.com/v1/courses
  </code>
</div>
```

## 🎯 Best Practices

### 1. Иерархия заголовков

```tsx
// ✅ Правильно - соблюдается иерархия
<h1 className="text-h1">Главная</h1>
  <h2 className="text-h2">Раздел 1</h2>
    <h3 className="text-h3">Подраздел 1.1</h3>

// ❌ Неправильно - пропущен уровень
<h1 className="text-h1">Главная</h1>
  <h3 className="text-h3">Раздел 1</h3>
```

### 2. Комбинирование с цветами

```tsx
// ✅ Правильно - текст + цвет
<h1 className="text-h1 text-primary">Заголовок</h1>
<p className="text-body text-gray-700">Текст</p>

// ✅ Правильно - разные состояния
<button className="text-button text-white hover:text-gray-100">
  Кнопка
</button>
```

### 3. Адаптивность

```tsx
// ✅ Правильно - адаптивные размеры
<h1 className="text-h3 md:text-h2 lg:text-h1">
  Адаптивный заголовок
</h1>

// ✅ Правильно - адаптивный текст
<p className="text-body-sm md:text-body lg:text-body-lg">
  Адаптивный параграф
</p>
```

### 4. Семантическая верстка

```tsx
// ✅ Правильно - правильные HTML теги
<h1 className="text-h1">Заголовок</h1>
<p className="text-body">Параграф</p>
<button className="text-button">Кнопка</button>

// ❌ Неправильно - неправильные теги
<div className="text-h1">Заголовок</div>
<span className="text-body">Параграф</span>
```

### 5. Не смешивай классы размеров

```tsx
// ❌ Неправильно - конфликт классов
<h1 className="text-h1 text-xl font-semibold">Заголовок</h1>

// ✅ Правильно - используй готовый класс
<h1 className="text-h1">Заголовок</h1>

// ✅ Правильно - или кастомизируй цвет/другие свойства
<h1 className="text-h1 text-primary">Заголовок</h1>
```

## 📊 Визуальная иерархия

```
text-display-1 (72px) ━━━━━━━━━━━━━━━━━ Самый большой
text-display-2 (60px) ━━━━━━━━━━━━━━━
text-h1 (48px) ━━━━━━━━━━━━━━
text-h2 (36px) ━━━━━━━━━━━
text-h3 (30px) ━━━━━━━━━
text-h4 (24px) ━━━━━━━
text-h5 (20px) ━━━━━
text-h6 (18px) ━━━━
text-body-lg (18px) ━━━━
text-body (16px) ━━━
text-subtitle-1 (16px) ━━━
text-body-sm (14px) ━━
text-subtitle-2 (14px) ━━
text-button (14px) ━━
text-code (14px) ━━
text-caption (12px) ━
text-overline (12px) ━ Самый маленький
```

## 🔧 Кастомизация

Если нужно изменить стили, редактируй `app/app.css`:

```css
@layer utilities {
  .text-h1 {
    @apply text-5xl font-bold leading-tight tracking-tight;
  }
}
```

## 📱 Адаптивные примеры

### Заголовок главной страницы

```tsx
<h1 className="text-h2 sm:text-h1 md:text-display-2 text-center">
  MySimulator
</h1>
```

### Карточка продукта

```tsx
<article className="p-4 md:p-6">
  <h2 className="text-h5 md:text-h4 mb-2">Название курса</h2>
  <p className="text-body-sm md:text-body text-gray-600">
    Описание курса с подробной информацией
  </p>
</article>
```

## 🎨 Интеграция с компонентами

### Button компонент

```tsx
<button className="text-button bg-primary text-white px-6 py-3 rounded-lg">
  Войти
</button>
```

### Input компонент

```tsx
<div>
  <label className="text-subtitle-2 text-gray-700 block mb-1">Email</label>
  <Input className="text-body" />
  <span className="text-caption text-gray-500 mt-1 block">
    Введите корректный email
  </span>
</div>
```

### Card компонент

```tsx
<div className="bg-white rounded-lg p-6 shadow">
  <h3 className="text-h4 text-gray-900 mb-2">Заголовок карточки</h3>
  <p className="text-body text-gray-700 mb-4">
    Содержимое карточки с основным текстом
  </p>
  <span className="text-caption text-gray-500">Дополнительная информация</span>
</div>
```

## 🔄 История изменений

- **2025-10-21**: Создана полная система типографики с 16 классами
