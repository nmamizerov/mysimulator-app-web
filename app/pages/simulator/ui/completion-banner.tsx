import type { ReactNode } from "react";
import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";

type CompletionType = "next-simulator" | "next-lesson" | "course-completed";

interface CompletionBannerProps {
  type: CompletionType;
  onNext?: () => void;
}

const completionConfig: Record<
  CompletionType,
  {
    title: string;
    description: string;
    buttonText?: string;
    icon: ReactNode;
  }
> = {
  "next-simulator": {
    title: "Поздравляю, вы прошли главу!",
    description: "Отличная работа! Переходите к следующей главе.",
    buttonText: "Перейти к следующей",
    icon: (
      <svg
        className="w-16 h-16 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  "next-lesson": {
    title: "Поздравляю, вы завершили урок!",
    description: "Превосходно! Вы готовы к следующему уроку.",
    buttonText: "Перейти к следующему уроку",
    icon: (
      <svg
        className="w-16 h-16 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
  "course-completed": {
    title: "Вы завершили курс!",
    description:
      "Поздравляем! Вы успешно прошли весь курс. Великолепная работа!",
    icon: (
      <svg
        className="w-16 h-16 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
  },
};

export const CompletionBanner = ({ type, onNext }: CompletionBannerProps) => {
  const config = completionConfig[type];

  return (
    <Card className="border-2 border-primary bg-linear-to-br from-secondary to-white">
      <div className="flex flex-col items-center text-center py-8 px-4">
        {/* Иконка */}
        <div className="mb-4">{config.icon}</div>

        {/* Заголовок */}
        <h2 className="text-h4 sm:text-h3 text-gray-900 mb-3">
          {config.title}
        </h2>

        {/* Описание */}
        <p className="text-body text-gray-600 mb-6 max-w-md">
          {config.description}
        </p>

        {/* Кнопка (если есть) */}
        {config.buttonText && onNext && (
          <Button
            variant="primary"
            size="md"
            onClick={onNext}
            className="min-w-[240px]"
          >
            {config.buttonText}
          </Button>
        )}
      </div>
    </Card>
  );
};
