import { Outlet, useNavigate } from "react-router-dom";
import { Login } from "./login";
import { Register } from "./register";
import { useCurrentCourse } from "@/entities/course";
import { useEffect } from "react";
import { useAuth } from "@/entities/session";

const AuthPage = () => {
  const { data: course, refetch } = useCurrentCourse();
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      navigate("/");
      refetch();
    }
  }, [isAuth]);

  return (
    <main
      style={{ backgroundColor: course.mainColor }}
      className="flex h-screen items-center justify-center"
    >
      <div className="w-[400px] rounded-lg bg-white px-10 py-10 shadow-lg">
        <Outlet />
      </div>
    </main>
  );
};

AuthPage.Login = Login;
AuthPage.Register = Register;
export default AuthPage;
