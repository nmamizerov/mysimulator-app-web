import { useNavigate } from "react-router";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useCourse } from "@/shared/lib";

export const AppHeader = () => {
  const navigate = useNavigate();
  const course = useCourse();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <header className="min-h-16 px-5 py-4 border-b border-gray-200">
      <div className="container max-w-4xl mx-auto flex items-center justify-between">
        <img
          src={course?.logo}
          alt={course?.name}
          className="w-[80px] h-[45px] cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleLogoClick}
          aria-label="Перейти на главную"
        />
        <button
          onClick={handleProfileClick}
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors cursor-pointer"
          aria-label="Перейти в профиль"
        >
          <UserCircleIcon className="w-8 h-8" />
        </button>
      </div>
    </header>
  );
};
