import clsx from "clsx";
import { useCurrentLesson } from "../../model/lesson";
import { useCurrentCourse } from "@/entities/course";
import { useMemo, useState } from "react";
import { updateCurrentLesson } from "../../api/lesson";

export const LessonLink = ({ lesson, onChangeLesson }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { data: course } = useCurrentCourse();
  const [currentLesson = {}, setCurrentLesson] = useCurrentLesson();

  const handleClick = () => {
    if (currentLesson.id === lesson.id) return;
    setCurrentLesson(lesson);
    updateCurrentLesson({ lesson: lesson.id });
    onChangeLesson?.();
  };

  const is_active = useMemo(() => {
    if (!course.is_ordered_lessons) return true;
    return lesson?.user?.started;
  }, [course, lesson]);

  return (
    <div
      style={{
        color:
          currentLesson.id === lesson.id || isHovered
            ? course?.customization?.main?.activeLessonColor
            : course?.customization?.main?.disabledLessonColor,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onClick={handleClick}
      className={clsx(
        "cursor-pointer text-lg text-gray-900/80 transition-colors",
        currentLesson.id === lesson.id && "font-bold",
        !is_active && "pointer-events-none",
      )}
    >
      {lesson.name}
    </div>
  );
};
