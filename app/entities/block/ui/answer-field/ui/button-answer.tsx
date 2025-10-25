import clsx from "clsx";
import { Button } from "@/shared/ui";

interface ButtonAnswerProps {
  isFill: boolean;
  isLoading: boolean;
  nextButtonText?: string;
  onComplete: (answer: string) => void;
}

/**
 * Компонент для типа ответа "button" (кнопка "Далее")
 */
export const ButtonAnswer = ({
  isFill,
  isLoading,
  nextButtonText,
  onComplete,
}: ButtonAnswerProps) => {
  const handleClick = () => {
    onComplete(nextButtonText || "");
  };

  return (
    <div className={clsx("w-full", isFill && "mt-5")}>
      <Button onClick={handleClick} disabled={isLoading} variant="primary">
        {isLoading ? "Загрузка..." : nextButtonText || "Далее"}
      </Button>
    </div>
  );
};
