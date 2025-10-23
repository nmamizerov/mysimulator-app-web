type SimulatorInLesson = { id: number; name: string };
type LessonUser = {
  completed: boolean;
  last_simulator: number | null;
  completed_simulators_count: number;
};

export type Lesson = {
  id: number;
  name: string;
  description: string;
  courseId: number;
  image?: string;
  is_available: boolean;
  simulators: SimulatorInLesson[];
  user?: LessonUser;
};
