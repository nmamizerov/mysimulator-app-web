import { useAnswerField } from "./model";
import type { AnswerFieldProps } from "./model";
import {
  ButtonAnswer,
  TextAnswer,
  SingleChoiceAnswer,
  MultipleChoiceAnswer,
} from "./ui";

/**
 * Главный компонент для отображения поля ответа
 * Поддерживает различные типы ответов:
 * - button: кнопка "Далее"
 * - answers: варианты ответов (одиночный или множественный выбор)
 * - text: текстовое поле ввода
 */
export const AnswerField = ({
  isFill = false,
  userBlockId,
  completeType,
  nextButtonText,
  answerOptions,
  isMultiple = false,
  answer,
  answersOptionsProcessing,
}: AnswerFieldProps) => {
  const {
    isLoading,
    isResultMode,
    userAnswers,
    selectedAnswers,
    handleComplete,
    handleToggleAnswer,
    handleSubmitMultiple,
  } = useAnswerField({
    userBlockId,
    answer,
    answersOptionsProcessing,
  });

  // Тип: Кнопка
  if (completeType === "button") {
    return (
      <ButtonAnswer
        isFill={isFill}
        isLoading={isLoading}
        nextButtonText={nextButtonText}
        onComplete={handleComplete}
      />
    );
  }

  // Тип: Варианты ответа
  if (completeType === "answers" && answerOptions) {
    // Множественный выбор
    if (isMultiple) {
      return (
        <MultipleChoiceAnswer
          answerOptions={answerOptions}
          isFill={isFill}
          isLoading={isLoading}
          isResultMode={isResultMode}
          userAnswers={userAnswers}
          selectedAnswers={selectedAnswers}
          answersOptionsProcessing={answersOptionsProcessing}
          onToggleAnswer={handleToggleAnswer}
          onSubmitMultiple={handleSubmitMultiple}
        />
      );
    }

    // Одиночный выбор
    return (
      <SingleChoiceAnswer
        answerOptions={answerOptions}
        isFill={isFill}
        isLoading={isLoading}
        isResultMode={isResultMode}
        userAnswers={userAnswers}
        answersOptionsProcessing={answersOptionsProcessing}
        onComplete={handleComplete}
      />
    );
  }

  // Тип: Поле ввода
  if (completeType === "text") {
    return <TextAnswer isLoading={isLoading} onComplete={handleComplete} />;
  }

  return null;
};
