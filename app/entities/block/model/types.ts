type Character = { id: number; name: string; role: string; image: string };

export type Block = {
  id: string;
  text: string;
  complete_type: "button" | "text" | "answers";
  is_task: boolean;
  next_button_text?: string;
  answer_options?: string[];
  character?: Character;
  tag?: string;
};

export type UserBlock = {
  id: number;
  is_completed: boolean;
  block: Block;
  answer?: string;
};
