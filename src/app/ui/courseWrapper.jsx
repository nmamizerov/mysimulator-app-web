import { Outlet, useNavigate } from "react-router-dom";
import { useCurrentCourse } from "../../entities/course";
import { useEffect } from "react";
import { useAuth } from "../../entities/session";

export const CourseWrapper = () => {
  const navigate = useNavigate();
  const { data: course, isPending } = useCurrentCourse();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (course) {
      if (!isAuth) {
        navigate("/auth/login");
      }
    }
  }, [course]);

  if (isPending || !course) {
    return <div></div>;
  }

  return <Outlet />;
};
