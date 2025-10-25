import type { AnswerStatus } from "@/shared/ui";

/**
 * Определяет статус варианта ответа по индексу
 * @param option - текст варианта ответа
 * @param index - индекс варианта в массиве
 * @param userAnswers - массив ответов пользователя
 * @param answersOptionsProcessing - информация о правильности каждого варианта
 * @returns статус ответа для визуального отображения
 */
export const getAnswerStatus = (
  option: string,
  index: number,
  userAnswers: string[],
  answersOptionsProcessing?: Array<{ is_correct: boolean }>
): AnswerStatus => {
  if (!answersOptionsProcessing) return null;

  const isUserAnswer = userAnswers.includes(option);
  const isCorrect = answersOptionsProcessing[index]?.is_correct || false;

  if (isUserAnswer && isCorrect) return "selected-correct";
  if (isUserAnswer && !isCorrect) return "selected-wrong";
  if (!isUserAnswer && isCorrect) return "not-selected-correct";
  return "not-selected-wrong";
};

/**
 * Возвращает CSS классы для кнопки результата в зависимости от статуса
 * @param status - статус ответа
 * @returns строка с Tailwind классами
 */
export const getResultButtonClass = (status: AnswerStatus): string => {
  const baseClasses =
    "inline-flex cursor-default items-center justify-center gap-2 rounded-3xl font-medium transition-all duration-200 outline-none border-2 px-4 py-2.5 text-base pointer-events-none";

  switch (status) {
    case "selected-correct":
      return `${baseClasses} border-transparent bg-success text-white`;
    case "selected-wrong":
      return `${baseClasses} border-transparent bg-error text-white`;
    case "not-selected-correct":
      return `${baseClasses} border-success text-success`;
    case "not-selected-wrong":
      return `${baseClasses} border-error text-error`;
    default:
      return baseClasses;
  }
};

/**
 * Парсит строку ответа в массив ответов
 * @param answer - строка с ответами, разделенными запятыми
 * @returns массив ответов
 */
export const parseUserAnswers = (answer?: string): string[] => {
  return answer ? answer.split(", ").map((a) => a.trim()) : [];
};
