import { useParams } from "react-router-dom";
import { useStartSimulator } from "../../model/simulator";
import { ColoredButton } from "./coloredButton";

export const WelcomeScreen = ({ welcomeScreen, customization, refetch }) => {
  const { simulatorId } = useParams();

  const { mutateAsync, isPending } = useStartSimulator();

  const startSimulator = async () => {
    await mutateAsync(simulatorId);
    refetch();
  };
  return (
    <div
      style={{
        backgroundColor: customization.backgroundColor,
      }}
      className="flex h-full flex-col items-center justify-center gap-5 bg-gray-100 p-5"
    >
      <div
        style={{
          color: customization.titleColor,
        }}
        className="text-2xl"
      >
        {welcomeScreen.title}
      </div>
      {welcomeScreen.image && (
        <img
          style={{
            width: `${customization.imageWidth}px`,
            height: `${customization.imageHeight}px`,
          }}
          className="w-[350px]"
          src={welcomeScreen.image}
        />
      )}

      <div
        style={{ color: customization.textColor }}
        className="max-w-[450px] text-center"
      >
        {welcomeScreen.text}
      </div>
      <ColoredButton
        isLoading={isPending}
        onClick={startSimulator}
        customization={customization}
        content={welcomeScreen.buttonText}
      />
    </div>
  );
};
