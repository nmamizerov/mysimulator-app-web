import { Link, useNavigate } from "react-router";
import { Progress } from "@/shared/ui/progress";
import type { Course, CourseUser } from "@/entities/course";
import type { Lesson } from "@/entities/lesson";
import { useSidebar } from "../model/use-sidebar";
import clsx from "clsx";
import { LockClosedIcon } from "@heroicons/react/16/solid";

interface SimulatorSidebarProps {
  course: Course;
  courseUser?: CourseUser;
  lessons: Lesson[];
  currentLessonId: string;
  currentSimulatorId: string;
}

export const SimulatorSidebar = ({
  course,
  courseUser,
  lessons,
  currentLessonId,
  currentSimulatorId,
}: SimulatorSidebarProps) => {
  const navigate = useNavigate();
  const { toggleLesson, isLessonExpanded } = useSidebar();

  return (
    <aside className="w-[320px] bg-white border-r border-gray-200 h-screen overflow-y-auto flex-shrink-0">
      <div className="p-6">
        {course.logo && (
          <div
            onClick={() => navigate(`/`)}
            className=" w-[160px] h-[90px] mb-6 cursor-pointer aspect-video rounded-lg overflow-hidden bg-gray-100"
          >
            <img
              src={course.logo}
              alt={course.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Название курса */}
        <h2 className="text-h5 text-primary mb-3">{course.name}</h2>

        <div className="mb-20 mt-5">
          <Progress progress={courseUser?.progress || 0} />
          <span className="text-caption text-gray-500">
            {courseUser?.progress || 0}% завершено
          </span>
        </div>

        {/* Список уроков */}
        <nav className="flex flex-col gap-5">
          {lessons.map((lesson) => {
            const isExpanded = isLessonExpanded(lesson.id);
            const isLessonActive = String(lesson.id) === currentLessonId;
            const isCompleted = lesson.user?.completed;
            const isAvailable = lesson.is_available;

            return (
              <div key={lesson.id} className="pb-5  border-b border-gray-200">
                {/* Заголовок урока */}
                <div
                  onClick={() => toggleLesson(lesson.id)}
                  className={clsx(
                    "w-full flex gap-3  items-center cursor-pointer  hover:text-primary  justify-between rounded-lg transition-colors text-left"
                  )}
                >
                  <div
                    className={clsx(
                      "w-6 h-6  flex items-center justify-center rounded-full border-2 border-primary",
                      isLessonActive && !isCompleted && "bg-white",
                      isCompleted && "bg-primary",
                      !isAvailable && "bg-primary/60 !border-none"
                    )}
                  >
                    {isCompleted && (
                      <svg
                        width="15"
                        height="12"
                        viewBox="0 0 15 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 5.28571L5.46875 10L14 1"
                          stroke="white"
                          stroke-width="2"
                        />
                      </svg>
                    )}
                    {!isAvailable && (
                      <LockClosedIcon className="w-[10px] h-[10px] text-white" />
                    )}
                  </div>
                  <span
                    className={clsx(
                      "text-subtitle-1 text-gray-700  flex-1",
                      isLessonActive && "text-primary",
                      !isAvailable && "!text-gray-400"
                    )}
                  >
                    {lesson.name}
                  </span>
                  <svg
                    width="10"
                    height="16"
                    viewBox="0 0 10 16"
                    fill="none"
                    className={clsx(
                      "transition-transform",
                      isExpanded && "rotate-90"
                    )}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1 15L8 8L1 1" stroke="#C0C0C0" stroke-width="2" />
                  </svg>
                </div>

                {/* Список симуляторов */}
                {isExpanded && (
                  <div className="pl-4 mt-5 pt-5 space-y-1 border-t border-gray-200">
                    {(lesson.simulators || []).map((simulator) => {
                      const isActive =
                        String(lesson.id) === currentLessonId &&
                        String(simulator.id) === currentSimulatorId;

                      return (
                        <Link
                          key={simulator.id}
                          to={`/lesson/${lesson.id}/simulator/${simulator.id}`}
                          className={clsx(
                            "block rounded-lg transition-colors text-body-sm",
                            isActive
                              ? " text-primary font-medium"
                              : "text-gray-700 hover:bg-red-500"
                          )}
                        >
                          {simulator.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
