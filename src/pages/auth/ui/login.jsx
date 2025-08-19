import { useCurrentCourse } from "@/entities/course";
import { ColoredButton } from "@/shared/lib/simulator-complete";
import { Input } from "@/shared/ui/input";
import { useState } from "react";
import { login } from "../api/auth";
import { Link } from "react-router-dom";
import { useAuth } from "@/entities/session";

export const Login = () => {
  const { data: course } = useCurrentCourse();
  const [loading, setLoading] = useState(false);
  const { setAuthToken } = useAuth();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const submit = async () => {
    setLoading(true);
    const response = await login(form);
    if (response?.token) {
      setAuthToken(response.token);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-10 text-2xl font-bold">Войдите</div>
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
        />
        <Input
          value={form.password}
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          label="Пароль"
          placeholder={"Введите пароль"}
        />
        <div className="flex">
          <ColoredButton
            type={submit}
            customization={{
              buttonBackgroundColor: course.mainColor,
              buttonTextColor: "#fff",
            }}
            isLoading={loading}
            className="ml-auto"
            content={"Войти"}
          />
        </div>
        <Link
          style={{ color: course.mainColor }}
          className="text-sm"
          to="/auth/register"
        >
          Создать аккаунт
        </Link>
      </form>
    </div>
  );
};
