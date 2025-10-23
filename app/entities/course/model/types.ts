export type CourseUser = {
  id: number;
  completed: boolean;
  last_lesson_id: number;
  progress?: number;
};
export type Course = {
  id: number;
  name: string;
  description: string;
  colors: Record<string, string>;
  logo?: string;
  favicon?: string;
};
