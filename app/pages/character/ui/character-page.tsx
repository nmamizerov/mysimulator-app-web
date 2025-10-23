import { useNavigate } from "react-router";
import { useCourse } from "@/shared/lib";
import { CharacterForm } from "@/widgets/character-form";

export const CharacterPage = () => {
  const navigate = useNavigate();
  const course = useCourse();

  const handleSuccess = () => {
    navigate("/");
  };

  return (
    <div className="container max-w-[896px] px-5 mt-10 mx-auto">
      <CharacterForm
        onSuccess={handleSuccess}
        title={`Добро пожаловать на курс ${course?.name || ""}`}
        description="Для начала обучения вам необходимо создать вашего персонажа."
        submitButtonText="Создать персонажа"
      />
    </div>
  );
};
