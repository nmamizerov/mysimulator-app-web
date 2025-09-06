import { useCurrentCourse } from "@/entities/course";
import { ColoredButton } from "@/shared/lib/simulator-complete";
import { Input } from "@/shared/ui/input";
import { useState } from "react";
import { register } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/entities/session";

export const Register = () => {
  const { data: course } = useCurrentCourse();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { setAuthToken } = useAuth();

  const submit = async () => {
    setLoading(true);
    try {
      const response = await register(form);
      if (response?.access_token) {
        setAuthToken(response.access_token);
        // Перенаправляем на главную страницу курса после успешной регистрации
        navigate("/");
      }
    } catch (e) {
      if (e?.response?.data) {
        setErrors(e?.response?.data || {});
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-10 text-2xl font-bold">Регистрация</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="flex flex-col gap-5"
      >
        <Input
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          label="Имя пользователя"
          placeholder={"Введите имя пользователя"}
          error={errors?.username}
        />
        <Input
          value={form.password}
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          label="Пароль"
          placeholder={"Введите пароль"}
          error={errors?.password}
        />
        <div className="flex">
          <ColoredButton
            type={submit}
            isLoading={loading}
            customization={{
              buttonBackgroundColor: course.mainColor,
              buttonTextColor: "#fff",
            }}
            className="ml-auto"
            content={"Войти"}
          />
        </div>
        <Link
          style={{ color: course.mainColor }}
          className="text-sm"
          to="/auth/login"
        >
          Войти
        </Link>
      </form>
    </div>
  );
};
