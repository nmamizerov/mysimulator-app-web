# Решение проблемы гидратации SSR

## Проблема

При работе с SSR (Server-Side Rendering) в React Router v7 + Vite + Tailwind CSS возникала ошибка гидратации:

```
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties.
```

Ошибка появлялась в двух случаях:

1. **Critical CSS несоответствие** - React Router генерировал разные критические стили на сервере и клиенте
2. **Динамические CSS переменные** - Цвета курса применялись через `useEffect`, который работает только на клиенте

## Решения

### 1. Исправление Critical CSS (React Router)

**Проблема:**

```tsx
// В ошибке показывало:
<style data-react-router-critical-css="" dangerouslySetInnerHTML={{...}}>
// vs
<style data-react-router-critical-css={null} dangerouslySetInnerHTML={{...}}>
```

**Решение:**
Добавили `suppressHydrationWarning` к тегу `<head>`:

```tsx
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head suppressHydrationWarning>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      {/* ... */}
    </html>
  );
}
```

**Почему это работает:**

- `suppressHydrationWarning` отключает предупреждения о несоответствии для конкретного элемента
- React Router автоматически инжектирует critical CSS в `<head>`, и они могут отличаться между SSR и клиентом
- Это безопасно, так как различия в critical CSS не влияют на функциональность

### 2. Исправление динамических CSS переменных

**Проблема:**

```tsx
// ❌ Старый код - работал только на клиенте
export default function App() {
  const { course } = useLoaderData<typeof loader>();

  useEffect(() => {
    if (course?.colors) {
      const root = document.documentElement;
      Object.entries(course.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
      });
    }
  }, [course?.colors]);

  return (
    <Provider store={store}>
      <AppLayout />
    </Provider>
  );
}
```

**Решение:**
Переместили применение цветов в `Layout` и используем атрибут `style` на теге `<html>`:

```tsx
// ✅ Новый код - работает и на сервере, и на клиенте
export function Layout({ children }: { children: React.ReactNode }) {
  const loaderData = useLoaderData<typeof loader>();
  const course = loaderData?.course;

  // Генерируем CSS переменные для цветов курса
  const colorStyles = course?.colors
    ? (Object.fromEntries(
        Object.entries(course.colors).map(([key, value]) => [
          `--color-${key}`,
          value,
        ])
      ) as React.CSSProperties)
    : undefined;

  return (
    <html lang="en" style={colorStyles}>
      <head suppressHydrationWarning>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

**Почему это работает:**

1. `Layout` рендерится и на сервере, и на клиенте
2. `useLoaderData` доступен в `Layout` (в отличие от старых версий React Router)
3. CSS переменные применяются напрямую через атрибут `style` на `<html>`
4. `Object.fromEntries` создает валидный объект стилей для React
5. Type assertion `as React.CSSProperties` обеспечивает типобезопасность
6. Одинаковые данные из loader → одинаковый HTML на сервере и клиенте
7. Цвета применяются до первого рендера (нет "мигания")
8. **Самое главное:** React полностью контролирует атрибут `style`, что гарантирует 100% совпадение между сервером и клиентом

## Преимущества нового подхода

### До (с useEffect):

- ❌ Работает только на клиенте
- ❌ Вызывает ошибки гидратации
- ❌ Может вызвать "мигание" при загрузке
- ❌ Цвета применяются после монтирования компонента

### После (с Layout + style tag):

- ✅ Работает и на сервере, и на клиенте
- ✅ Нет ошибок гидратации
- ✅ Нет "мигания" - цвета сразу в HTML
- ✅ Цвета применяются до первого рендера
- ✅ SSR-безопасно

## Почему атрибут `style` лучше, чем тег `<style>`?

### Вариант A: ❌ Через тег `<style>` (менее надежно)

```tsx
const colorStyles = course?.colors
  ? Object.entries(course.colors)
      .map(([key, value]) => `--color-${key}: ${value};`)
      .join(" ")
  : "";

return (
  <html lang="en">
    <head suppressHydrationWarning>
      {/* ... */}
      {colorStyles && (
        <style
          dangerouslySetInnerHTML={{ __html: `:root { ${colorStyles} }` }}
        />
      )}
    </head>
  </html>
);
```

**Проблемы:**

- Требует `dangerouslySetInnerHTML` (потенциальный XSS риск)
- Строковая конкатенация CSS подвержена ошибкам
- Условный рендеринг может вызвать проблемы с гидратацией
- Дополнительный DOM узел в head

### Вариант B: ✅ Через атрибут `style` (рекомендуется)

```tsx
const colorStyles = course?.colors
  ? (Object.fromEntries(
      Object.entries(course.colors).map(([key, value]) => [
        `--color-${key}`,
        value,
      ])
    ) as React.CSSProperties)
  : undefined;

return <html lang="en" style={colorStyles}>;
```

**Преимущества:**

- ✅ Безопасно - React экранирует значения автоматически
- ✅ Типобезопасно - TypeScript проверяет типы
- ✅ Нет условного рендеринга - `undefined` просто не рендерит атрибут
- ✅ React полностью контролирует атрибут → гарантия одинакового HTML
- ✅ Чище и лаконичнее
- ✅ Нет дополнительных DOM узлов

## Альтернативные решения (не рекомендуются)

### Вариант 1: Отключить SSR

```ts
// react-router.config.ts
export default {
  ssr: false, // ❌ Теряем преимущества SSR
} satisfies Config;
```

**Минусы:**

- Теряем SEO преимущества
- Медленная начальная загрузка
- Нет SSR для мета-тегов

### Вариант 2: Использовать data-attributes (не работает для CSS переменных)

```tsx
// ❌ Не сработает - data-attributes не поддерживают CSS переменные
<html data-primary-color="#009dc5">
```

### Вариант 3: Hardcode цвета в CSS (не гибко)

```css
/* ❌ Не подходит для динамических цветов из API */
:root {
  --color-primary: #009dc5;
}
```

## Связанные файлы

- `app/root.tsx` - Layout с SSR-безопасными стилями
- `app/app.css` - Tailwind конфигурация с CSS переменными
- `vite.config.ts` - Конфигурация Vite с React Router
- `react-router.config.ts` - Конфигурация React Router (ssr: true)

## Дополнительные ресурсы

- [React Router v7 - SSR Guide](https://reactrouter.com/dev/guides/ssr)
- [React - Hydration Errors](https://react.dev/link/hydration-mismatch)
- [suppressHydrationWarning documentation](https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors)

## История изменений

- **2025-10-21**: Исправлена проблема гидратации с critical CSS и динамическими цветами
  - Добавлен `suppressHydrationWarning` к `<head>`
  - Переместили применение цветов из `useEffect` в `Layout`
  - Удалили неиспользуемый импорт `useEffect`
