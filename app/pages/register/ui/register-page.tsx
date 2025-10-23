import {
  useLoginMutation,
  useRegisterMutation,
  type RegisterRequest,
} from "@/entities/session";
import { Button, Input } from "@/shared/ui";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useCourse } from "@/shared/lib";

export const RegisterPage = () => {
  const course = useCourse();
  const navigate = useNavigate();
  const [data, setData] = useState<RegisterRequest>({
    username: "",
    password: "",
  });
  const [rePassword, setRePassword] = useState("");
  const [register, { isLoading, error }] = useRegisterMutation();
  const validated = useMemo(() => {
    if (!data.username || !data.password || !rePassword) return false;
    return data.password === rePassword;
  }, [data, rePassword]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.password === rePassword) {
      await register(data);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {/* Заголовок */}
          <div className="mb-8 text-center">
            <h1 className="text-h3 text-gray-900 mb-2">Создание аккаунта</h1>
            <p className="text-body-sm text-gray-600">
              Добро пожаловать{" "}
              {course?.name ? (
                <>
                  на курс <b>{course.name}</b>
                </>
              ) : (
                ""
              )}
            </p>
          </div>

          {/* Форма */}
          <form className="space-y-5" onSubmit={submit}>
            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="Ваш email"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />

            <Input
              id="password"
              type="password"
              label="Пароль"
              placeholder="••••••••"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <Input
              id="re-password"
              type="password"
              label="Повторите пароль"
              placeholder="••••••••"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="primary"
              disabled={!validated}
              fullWidth
            >
              Создать аккаунт
            </Button>
          </form>

          {/* Разделитель */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="text-caption bg-white px-4 text-gray-500">
                или
              </span>
            </div>
          </div>

          {/* Регистрация */}
          <div className="text-center">
            <p className="text-body-sm text-gray-600">
              Уже есть аккаунт?{" "}
              <Link
                to="/login"
                className="text-primary font-medium hover:text-primary/80 transition-colors"
              >
                Войти
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
