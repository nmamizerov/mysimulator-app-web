import {
  type CreateCharacterRequest,
  useCreateCharacterMutation,
} from "@/entities/session";
import { Button, Chip, Input } from "@/shared/ui";
import { useState } from "react";
import { FemaleAvatars, MaleAvatars } from "@/shared/lib/avatars";
import clsx from "clsx";
import { useCourse } from "@/shared/lib";
import { useNavigate } from "react-router";

export const CharacterPage = () => {
  const navigate = useNavigate();
  const course = useCourse();
  const [data, setData] = useState<CreateCharacterRequest>({
    first_name: "",
    last_name: "",
    sex: "male",
    avatar: "",
  });
  const [createCharacter, { isLoading }] = useCreateCharacterMutation();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createCharacter(data);
    navigate("/");
  };

  return (
    <div className="container max-w-[896px] px-5 mt-10 mx-auto">
      <h1 className="text-h4 font-medium">
        Добро пожаловать на курс {course?.name || ""}
      </h1>
      <div className="text-body">
        Для начала обучения вам необходимо создать вашего персонажа.
      </div>
      <form className="mt-5 flex flex-col gap-5" onSubmit={submit}>
        <div className="flex gap-3">
          <Input
            id="first_name"
            label="Имя"
            placeholder="Введите ваше имя"
            value={data.first_name}
            onChange={(e) => setData({ ...data, first_name: e.target.value })}
          />
          <Input
            id="last_name"
            label="Фамилия"
            placeholder="Введите вашу фамилию"
            value={data.last_name}
            onChange={(e) => setData({ ...data, last_name: e.target.value })}
          />
        </div>
        <div>
          <div className="mb-1.5 text-sm font-medium">Ваш пол</div>
          <div className="flex gap-3">
            <Chip
              active={data.sex === "male"}
              onClick={() => setData({ ...data, sex: "male" })}
            >
              М
            </Chip>
            <Chip
              active={data.sex === "female"}
              onClick={() => setData({ ...data, sex: "female" })}
            >
              Ж
            </Chip>
          </div>
        </div>
        <div>
          <div className="mb-1.5 text-sm font-medium">Выберите ваш аватар</div>
          <div className="flex gap-3 flex-wrap">
            {Object.entries(
              data.sex === "male" ? MaleAvatars : FemaleAvatars
            ).map(([key, value]) => (
              <img
                key={key}
                src={value}
                alt={key}
                className={clsx(
                  "w-12 h-12 rounded-full cursor-pointer hover:scale-110 transition-transform",
                  data.avatar === key && "scale-110"
                )}
                onClick={() => setData({ ...data, avatar: key })}
              />
            ))}
          </div>
        </div>
        <Button
          className="ml-auto "
          type="submit"
          variant="primary"
          disabled={
            !data.first_name || !data.last_name || !data.avatar || isLoading
          }
          isLoading={isLoading}
        >
          Создать персонажа
        </Button>
      </form>
    </div>
  );
};
