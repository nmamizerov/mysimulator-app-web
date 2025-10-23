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
  const [inputValue, setInputValue] = useState("");

  const handleComplete = async (answer: string) => {
    try {
      await completeBlock({
        userBlockId,
        data: { answer, id: userBlockId },
      }).unwrap();
      setInputValue("");
    } catch (error) {
      console.error("Ошибка при завершении блока:", error);
    }
  };

  // Тип: Кнопка
  if (completeType === "button") {
    return (
      <div className="mt-4">
        <Button
          onClick={() => handleComplete("")}
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
      <div className="mt-4">
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Введите ваш ответ..."
          disabled={isLoading}
          autoExpand
          onSubmit={handleComplete}
          rightElement={
            <button
              onClick={() => {
                if (inputValue.trim()) {
                  handleComplete(inputValue);
                }
              }}
              disabled={isLoading || !inputValue.trim()}
              className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Отправить"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            </button>
          }
        />
      </div>
    );
  }

  return null;
};
