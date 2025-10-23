import { Button, Chip, Input } from "@/shared/ui";
import { FemaleAvatars, MaleAvatars } from "@/shared/lib/avatars";
import clsx from "clsx";
import { useCharacterForm } from "../model/use-character-form";

interface CharacterFormProps {
  onSuccess?: () => void;
  title?: string;
  description?: string;
  submitButtonText?: string;
}

export const CharacterForm = ({
  onSuccess,
  title = "Создание персонажа",
  description = "Заполните форму для создания вашего персонажа",
  submitButtonText = "Создать персонажа",
}: CharacterFormProps) => {
  const { data, updateField, handleSubmit, isLoading, isValid } =
    useCharacterForm();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(onSuccess);
  };

  return (
    <div>
      <h1 className="text-h4 font-medium">{title}</h1>
      <div className="text-body">{description}</div>
      <form className="mt-5 flex flex-col gap-5" onSubmit={onSubmit}>
        <div className="flex md:flex-row flex-col gap-3">
          <Input
            id="first_name"
            label="Имя"
            placeholder="Введите ваше имя"
            value={data.first_name}
            onChange={(e) => updateField("first_name", e.target.value)}
          />
          <Input
            id="last_name"
            label="Фамилия"
            placeholder="Введите вашу фамилию"
            value={data.last_name}
            onChange={(e) => updateField("last_name", e.target.value)}
          />
        </div>
        <div>
          <div className="mb-1.5 text-sm font-medium">Ваш пол</div>
          <div className="flex gap-3">
            <Chip
              active={data.sex === "male"}
              onClick={() => updateField("sex", "male")}
            >
              Мужской
            </Chip>
            <Chip
              active={data.sex === "female"}
              onClick={() => updateField("sex", "female")}
            >
              Женский
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
                onClick={() => updateField("avatar", key)}
              />
            ))}
          </div>
        </div>
        <Button
          className="ml-auto"
          type="submit"
          variant="primary"
          disabled={!isValid || isLoading}
          isLoading={isLoading}
        >
          {submitButtonText}
        </Button>
      </form>
    </div>
  );
};
