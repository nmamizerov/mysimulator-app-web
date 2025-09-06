import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useCurrentCourse } from "../../entities/course";
import { useEffect } from "react";
import { useAuth } from "../../entities/session";

export const CourseWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: course, isPending } = useCurrentCourse();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (course) {
      // Не делаем редирект если уже находимся на страницах аутентификации
      if (!isAuth && !location.pathname.startsWith("/auth")) {
        navigate("/auth/login");
      }
    }
  }, [course, isAuth, location.pathname]);

  if (isPending || !course) {
    return <div></div>;
  }

  return <Outlet />;
};
