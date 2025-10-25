import clsx from "clsx";
import { AnswerOption } from "@/shared/ui";
import { getAnswerStatus } from "../model";

interface SingleChoiceAnswerProps {
  answerOptions: string[];
  isFill: boolean;
  isLoading: boolean;
  isResultMode: boolean;
  userAnswers: string[];
  answersOptionsProcessing?: Array<{ is_correct: boolean }>;
  onComplete: (answer: string) => void;
}

/**
 * Компонент для одиночного выбора ответа
 */
export const SingleChoiceAnswer = ({
  answerOptions,
  isLoading,
  isResultMode,
  userAnswers,
  answersOptionsProcessing,
  onComplete,
}: SingleChoiceAnswerProps) => {
  return (
    <div className={clsx("flex flex-wrap gap-5")}>
      {answerOptions.map((option, index) => {
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
            isLoading={isLoading}
            onClick={() => onComplete(option)}
          >
            {option}
          </AnswerOption>
        );
      })}
    </div>
  );
};
