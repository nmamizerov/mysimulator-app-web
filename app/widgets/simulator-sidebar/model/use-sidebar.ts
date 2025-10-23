import { useState, useCallback } from "react";

export const useSidebar = () => {
  const [expandedLessons, setExpandedLessons] = useState<number[]>([]);

  const toggleLesson = useCallback((lessonId: number) => {
    setExpandedLessons((prev) => {
      if (prev.includes(lessonId)) {
        return prev.filter((id) => id !== lessonId);
      }
      return [...prev, lessonId];
    });
  }, []);

  const isLessonExpanded = useCallback(
    (lessonId: number) => expandedLessons.includes(lessonId),
    [expandedLessons]
  );

  return { expandedLessons, toggleLesson, isLessonExpanded };
};
