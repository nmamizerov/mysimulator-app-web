export type CourseUser = {
  id: number;
  completed: boolean;
  lastLessonId: number;
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
