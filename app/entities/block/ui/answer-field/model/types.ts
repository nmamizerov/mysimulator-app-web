import type { Block } from "../../../model/types";

export interface AnswerFieldProps {
  userBlockId: number;
  completeType: Block["complete_type"];
  isFill: boolean;
  nextButtonText?: string;
  answerOptions?: string[];
  isMultiple?: boolean;
  answer?: string;
  answersOptionsProcessing?: Array<{ is_correct: boolean }>;
}
