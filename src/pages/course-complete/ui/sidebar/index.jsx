import { useCurrentCourse } from "@/entities/course";
import { useLessons } from "../../model/lesson";
import { LessonLink } from "./lessonLink";

export const Sidebar = ({ onClose }) => {
  const { data: course } = useCurrentCourse();
  const { data: lessons } = useLessons();

  return (
    <div
      style={{
        backgroundColor: course.customization?.main?.sidebarColor,
        boxShadow: `5px 0 15px 0 ${course.customization?.main?.sidebarShadowColor}`,
      }}
      className="z-100 h-full w-full bg-white px-5 py-5 pt-12 sm:w-[300px] sm:pt-0 md:fixed"
    >
      <div className="flex flex-col gap-3">
        <div className="mt-5 mb-10 text-2xl font-bold">{course.name}</div>
        {(lessons || []).map((lesson) => (
          <LessonLink
            onChangeLesson={onClose}
            lesson={lesson}
            key={lesson.id}
          />
        ))}
      </div>
    </div>
  );
};
