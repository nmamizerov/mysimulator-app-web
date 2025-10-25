import clsx from "clsx";
import { Button, AnswerOption } from "@/shared/ui";
import { getAnswerStatus } from "../model";

interface MultipleChoiceAnswerProps {
  answerOptions: string[];
  isFill: boolean;
  isLoading: boolean;
  isResultMode: boolean;
  userAnswers: string[];
  selectedAnswers: string[];
  answersOptionsProcessing?: Array<{ is_correct: boolean }>;
  onToggleAnswer: (answer: string) => void;
  onSubmitMultiple: () => void;
}

/**
 * Компонент для множественного выбора ответов
 */
export const MultipleChoiceAnswer = ({
  answerOptions,
  isFill,
  isLoading,
  isResultMode,
  userAnswers,
  selectedAnswers,
  answersOptionsProcessing,
  onToggleAnswer,
  onSubmitMultiple,
}: MultipleChoiceAnswerProps) => {
  return (
    <div className="w-full flex flex-col items-end">
      <div
        className={clsx(
          "flex flex-wrap",
          isFill && "w-full gap-2 mt-5",
          !isFill && "gap-5"
        )}
      >
        {answerOptions.map((option, index) => {
          const isSelected = selectedAnswers.includes(option);
          const status = getAnswerStatus(
            option,
            index,
            userAnswers,
            answersOptionsProcessing
          );

          return (
            <AnswerOption
              key={index}
              status={status}
              isResultMode={isResultMode}
              fullWidth={isFill}
              isSelected={isSelected}
              isLoading={isLoading}
              onClick={() => onToggleAnswer(option)}
            >
              {option}
            </AnswerOption>
          );
        })}
      </div>

      {/* Кнопка отправки для множественного выбора */}
      {!isResultMode && selectedAnswers.length > 0 && (
        <div className="mt-4 flex-end">
          <Button
            onClick={onSubmitMultiple}
            disabled={isLoading}
            variant="primary"
          >
            {isLoading ? "Загрузка..." : "Отправить ответы"}
          </Button>
        </div>
      )}
    </div>
  );
};
