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
  /** Для мобильной версии - открыто ли меню */
  isMobileMenuOpen?: boolean;
  /** Для мобильной версии - callback закрытия меню */
  onMobileMenuClose?: () => void;
}

export const SimulatorSidebar = ({
  course,
  courseUser,
  lessons,
  currentLessonId,
  currentSimulatorId,
  isMobileMenuOpen = false,
  onMobileMenuClose,
}: SimulatorSidebarProps) => {
  const navigate = useNavigate();
  const { toggleLesson, isLessonExpanded } = useSidebar();

  const handleLinkClick = () => {
    // Закрываем мобильное меню при клике на ссылку
    if (onMobileMenuClose) {
      onMobileMenuClose();
    }
  };

  return (
    <>
      {/* Оверлей для мобильной версии */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onMobileMenuClose}
          aria-hidden="true"
        />
      )}

      {/* Сайдбар */}
      <aside
        className={clsx(
          // Десктоп: всегда виден слева
          "lg:w-[320px] lg:relative lg:translate-x-0",
          // Мобайл: fixed + анимация
          "fixed top-0 left-0 h-screen w-[320px] z-50",
          "bg-white border-r border-gray-200 overflow-y-auto shrink-0",
          "transition-transform duration-300 ease-in-out",
          // Управление видимостью на мобилке
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-6">
          {/* Кнопка закрытия для мобильной версии */}
          <div className="lg:hidden flex justify-end mb-4">
            <button
              onClick={onMobileMenuClose}
              className="p-2 -mr-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg transition-colors"
              aria-label="Закрыть меню"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {course.logo && (
            <div
              onClick={() => {
                navigate(`/`);
                handleLinkClick();
              }}
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
                        !isAvailable && "bg-primary/60 border-none!"
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
                        !isAvailable && "text-gray-400!"
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
                      <path
                        d="M1 15L8 8L1 1"
                        stroke="#C0C0C0"
                        stroke-width="2"
                      />
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
                            onClick={handleLinkClick}
                            className={clsx(
                              "block hover:text-primary rounded-lg transition-colors text-body-sm",
                              isActive
                                ? "text-primary font-medium"
                                : "text-gray-700"
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
    </>
  );
};
