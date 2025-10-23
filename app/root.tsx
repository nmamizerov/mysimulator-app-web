import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  redirect,
  useLoaderData,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { Provider } from "react-redux";
import { store } from "./core/store";
import { courseApi, type Course } from "./entities/course";
import { AppLayout } from "./core/layout/appLayout";
import { useEffect } from "react";
export async function loader({ request }: Route.LoaderArgs) {
  // Получаем заголовки из request
  const host =
    request.headers.get("host") || request.headers.get("x-forwarded-host");
  const cookieHeader = request.headers.get("cookie");

  // Формируем заголовки для передачи в API
  const headers: Record<string, string> = {};

  if (host) {
    headers["host"] = host;
    headers["x-forwarded-host"] = host;
  }

  if (cookieHeader) {
    headers["cookie"] = cookieHeader;
  }

  // Передаем заголовки в API запрос как параметр query
  const result = await store.dispatch(
    courseApi.endpoints.getCourse.initiate(headers)
  );

  const url = new URL(request.url);
  const pathname = url.pathname;

  const publicPaths = ["/login", "/register"];

  // Если это не публичная страница - проверяем токен
  if (!publicPaths.includes(pathname)) {
    const hasToken = cookieHeader?.includes("access_token=");

    if (!hasToken) {
      throw redirect("/login");
    }
  }

  return { course: result.data };
}

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const meta: Route.MetaFunction = ({ data }) => {
  // Если данных нет (ошибка загрузки), используем дефолтные значения
  if (!data || !data.course) {
    return [
      { title: "Loading..." },
      { name: "description", content: "Course is loading" },
    ];
  }

  const { course } = data as { course: Course };

  return [
    { title: course.name || "My Course Platform" },
    {
      name: "description",
      content: course.description || "Learn with our amazing courses",
    },
    // {
    //   name: "keywords",
    //   content: course.keywords?.join(", ") || "education, online courses"
    // },

    // Open Graph теги для соцсетей

    { property: "og:title", content: course.name },
    { property: "og:description", content: course.description },
    // { property: "og:image", content: course.thumbnail || "/default-course.jpg" },
    { property: "og:type", content: "website" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: course.name },
    { name: "twitter:description", content: course.description },
    // { name: "twitter:image", content: course.thumbnail || "/default-course.jpg" },

    // Дополнительные мета-теги
    // { name: "author", content: course.author || "Course Platform" },
    { name: "robots", content: "index, follow" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  const loaderData = useLoaderData<typeof loader>();
  const course = loaderData?.course;

  useEffect(() => {
    if (course?.favicon) {
      // Удаляем старую фавиконку
      const existingFavicon = document.querySelector("link[rel='icon']");
      if (existingFavicon) {
        existingFavicon.remove();
      }

      // Добавляем новую
      const link = document.createElement("link");
      link.rel = "icon";
      link.href = course.favicon;
      link.type = "image/png";
      document.head.appendChild(link);
    }
  }, [course?.favicon]);

  const colorStyles = course?.colors
    ? (Object.fromEntries(
        Object.entries(course.colors).map(([key, value]) => [
          `--color-${key}`,
          value,
        ])
      ) as React.CSSProperties)
    : undefined;

  return (
    <html lang="en" className="bg-gray-50" style={colorStyles}>
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

export default function App() {
  return (
    <Provider store={store}>
      <AppLayout />
    </Provider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
