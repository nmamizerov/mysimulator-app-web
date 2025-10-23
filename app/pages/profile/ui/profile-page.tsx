import { useNavigate } from "react-router";
import { CharacterForm } from "@/widgets/character-form";
import { AppHeader } from "@/widgets/app-header";

export const ProfilePage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/");
  };

  return (
    <div>
      <AppHeader />
      <div className="container max-w-[896px] px-5 mt-10 mx-auto">
        <CharacterForm
          onSuccess={handleSuccess}
          title="Профиль персонажа"
          description="Вы можете изменить данные вашего персонажа"
          submitButtonText="Сохранить изменения"
        />
      </div>
    </div>
  );
};
