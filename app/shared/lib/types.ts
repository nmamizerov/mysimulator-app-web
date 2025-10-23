// Глобальные типы приложения

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
}

export interface Simulator {
  id: string;
  lessonId: string;
  title: string;
  description: string;
}
