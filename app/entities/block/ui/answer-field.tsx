import { useState } from "react";
import { Button, Textarea } from "@/shared/ui";
import { useCompleteBlockMutation } from "../api/block.api";
import type { Block } from "../model/types";

interface AnswerFieldProps {
  userBlockId: number;
  completeType: Block["complete_type"];
  nextButtonText?: string;
  answerOptions?: string[];
}

export const AnswerField = ({
  userBlockId,
  completeType,
  nextButtonText,
  answerOptions,
}: AnswerFieldProps) => {
  const [completeBlock, { isLoading }] = useCompleteBlockMutation();

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

  // Тип: Кнопка
  if (completeType === "button") {
    return (
      <div className="mt-4">
        <Button
          onClick={() => handleComplete(nextButtonText || "")}
          disabled={isLoading}
          variant="primary"
        >
          {isLoading ? "Загрузка..." : nextButtonText || "Далее"}
        </Button>
      </div>
    );
  }

  // Тип: Варианты ответа
  if (completeType === "answers" && answerOptions) {
    return (
      <div className="mt-4 flex  gap-5 flex-wrap">
        {answerOptions.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleComplete(option)}
            disabled={isLoading}
            variant="outline"
          >
            {option}
          </Button>
        ))}
      </div>
    );
  }

  // Тип: Поле ввода
  if (completeType === "text") {
    return (
      <div className="mt-4 w-full">
        <Textarea
          placeholder="Введите ваш ответ..."
          disabled={isLoading}
          onSend={handleComplete}
        />
      </div>
    );
  }

  return null;
};
