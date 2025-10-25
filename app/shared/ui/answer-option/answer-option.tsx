import clsx from "clsx";

export type AnswerStatus =
  | "selected-correct"
  | "selected-wrong"
  | "not-selected-correct"
  | "not-selected-wrong"
  | null;

interface AnswerOptionProps {
  /**
   * Текст варианта ответа
   */
  children: string;
  /**
   * Статус ответа (для режима отображения результатов)
   */
  status?: AnswerStatus;
  /**
   * Режим отображения результатов
   */
  isResultMode?: boolean;
  /**
   * Растягивать на всю ширину
   */
  fullWidth?: boolean;
  /**
   * Вариант выбран (для режима множественного выбора)
   */
  isSelected?: boolean;
  /**
   * Состояние загрузки
   */
  isLoading?: boolean;
  /**
   * Обработчик клика
   */
  onClick?: () => void;
  /**
   * Дополнительные CSS классы
   */
  className?: string;
}
export const AnswerOption = ({
  children,
  status = null,
  isResultMode = false,
  isSelected = false,
  isLoading = false,
  onClick,
  className = "",
}: AnswerOptionProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isResultMode || isLoading}
      className={clsx(
        // Базовые стили
        "inline-flex rounded-3xl items-center justify-center gap-2 font-medium transition-all duration-200 outline-none border-2 px-10 py-2.5 text-base",
        // Скругление
        // Режим результатов
        isResultMode && [
          "cursor-default pointer-events-none",
          status === "selected-correct" &&
            "border-transparent bg-success text-white",
          status === "selected-wrong" &&
            "border-transparent bg-error text-white",
          status === "not-selected-correct" &&
            "border-success text-success bg-transparent",
          status === "not-selected-wrong" &&
            "border-error text-error bg-transparent",
        ],
        // Режим выбора
        !isResultMode && [
          "cursor-pointer",
          // Выбранный вариант (множественный выбор)
          isSelected && [
            "border-transparent bg-primary text-white",
            !isLoading && "hover:bg-primary-dark active:scale-95",
          ],
          // Не выбранный вариант
          !isSelected && [
            "border-gray-300 bg-transparent text-gray-900",
            !isLoading &&
              "hover:border-primary hover:text-primary active:scale-95",
          ],
          // Состояние загрузки
          isLoading && "opacity-50 cursor-not-allowed",
        ],
        className
      )}
    >
      {children}
    </button>
  );
};
