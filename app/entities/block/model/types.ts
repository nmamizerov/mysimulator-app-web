type Character = { id: number; name: string; role: string; image: string };

type AnswerOptionProcessing = {
  is_correct: boolean;
};

export type Block = {
  id: string;
  text: string;
  complete_type: "button" | "text" | "answers";
  is_task: boolean;
  show_user_answer: boolean;
  text_after_answer?: string;
  check_type?: null | "single_choice" | "multiple_choice" | "gpt_check";
  next_button_text?: string;
  answer_options?: string[];
  character?: Character;
  tag?: string;
  answers_options_processing?: AnswerOptionProcessing[];
};

export type UserBlock = {
  id: number;
  is_completed: boolean;
  is_correct: boolean;
  block: Block;
  answer?: string;
};
