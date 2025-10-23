import type { Course } from "@/entities/course";
import { useNavigate } from "react-router";

interface MobileHeaderProps {
  course: Course;
  onMenuClick: () => void;
}

/**
 * Мобильный хедер для страницы симулятора
 * Показывается только на экранах < 1024px
 */
export const MobileHeader = ({ course, onMenuClick }: MobileHeaderProps) => {
  const navigate = useNavigate();
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Логотип курса */}
        {course.logo && (
          <img
            onClick={() => navigate("/")}
            src={course.logo}
            alt={course.name}
            className="w-[80px] h-[45px] object-contain"
            aria-label="Логотип курса"
          />
        )}

        {/* Бургер-кнопка */}
        <button
          onClick={onMenuClick}
          className="p-2 -mr-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg transition-colors"
          aria-label="Открыть меню"
          tabIndex={0}
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
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};
