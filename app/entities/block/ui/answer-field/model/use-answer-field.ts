import { useState } from "react";
import { useCompleteBlockMutation } from "../../../api/block.api";
import { parseUserAnswers } from "./utils";

interface UseAnswerFieldProps {
  userBlockId: number;
  answer?: string;
  answersOptionsProcessing?: Array<{ is_correct: boolean }>;
}

/**
 * Хук для управления бизнес-логикой поля ответа
 * Содержит логику отправки ответов и управления состоянием выбора
 */
export const useAnswerField = ({
  userBlockId,
  answer,
  answersOptionsProcessing,
}: UseAnswerFieldProps) => {
  const [completeBlock, { isLoading }] = useCompleteBlockMutation();
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  // Режим отображения результатов
  const isResultMode = !!answer && !!answersOptionsProcessing;

  // Парсим ответ пользователя
  const userAnswers = parseUserAnswers(answer);

  /**
   * Отправляет ответ на сервер
   */
  const handleComplete = async (answer: string) => {
    try {
      await completeBlock({
        userBlockId,
        data: { answer, id: userBlockId },
      }).unwrap();
    } catch (error) {
      console.error("Ошибка при завершении блока:", error);
    }
  };

  /**
   * Переключает выбор варианта ответа (для множественного выбора)
   */
  const handleToggleAnswer = (answer: string) => {
    setSelectedAnswers((prev) =>
      prev.includes(answer)
        ? prev.filter((a) => a !== answer)
        : [...prev, answer]
    );
  };

  /**
   * Отправляет множественные ответы
   */
  const handleSubmitMultiple = async () => {
    if (selectedAnswers.length === 0) return;
    await handleComplete(selectedAnswers.join(", "));
  };

  return {
    isLoading,
    isResultMode,
    userAnswers,
    selectedAnswers,
    handleComplete,
    handleToggleAnswer,
    handleSubmitMultiple,
  };
};
