import { Textarea } from "@/shared/ui";

interface TextAnswerProps {
  isLoading: boolean;
  onComplete: (answer: string) => void;
}

/**
 * Компонент для типа ответа "text" (текстовое поле)
 */
export const TextAnswer = ({ isLoading, onComplete }: TextAnswerProps) => {
  return (
    <div className="w-full">
      <Textarea
        placeholder="Введите ваш ответ..."
        disabled={isLoading}
        onSend={onComplete}
      />
    </div>
  );
};
