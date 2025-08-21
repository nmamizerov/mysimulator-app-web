import { WelcomeScreen } from "./components/welcomeScreen";
import { CompleteContext } from "../model/complete";
import {
  useCurrentSimulator,
  useResetSimulatorCompletion,
} from "../model/simulator";
import { BlocksList } from "./blocksList";
import { useEffect, useState } from "react";
import { ColoredButton } from "..";
import { Spinner } from "@/shared/ui/spinner";

export const SimulatorComplete = ({
  simulatorId,
  screenWidth,
  customization,
  onComplete,
  isCreator,
}) => {
  const { data: simulator, refetch } = useCurrentSimulator(simulatorId);
  const [isMobile, setIsMobile] = useState(false);
  const [maxWidth, setMaxWidth] = useState(1024);
  const [loading, setLoading] = useState(false);

  const { mutateAsync } = useResetSimulatorCompletion();

  useEffect(() => {
    setIsMobile(screenWidth < 500);
    if (simulator) {
      const customization = simulator.customize?.[0];
      if (screenWidth < 500) {
        setMaxWidth(customization.main.maxPhoneWidth);
      } else if (screenWidth < 900) {
        setMaxWidth(customization.main.maxTabletWidth);
      } else {
        setMaxWidth(customization.main.maxDesktopWidth);
      }
    }
  }, [screenWidth, simulator]);

  const handleComplete = () => {
    onComplete?.();
  };

  const handleReset = async () => {
    setLoading(true);
    await mutateAsync(simulatorId);
    await refetch();
    setLoading(false);
  };

  if (!simulator) {
    return <div></div>;
  }

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-5">
        {" "}
        <Spinner color="#10B1FC" />
      </div>
    );
  }

  return (
    <div
      className="py-2"
      style={{
        backgroundColor:
          customization?.main?.backgroundColor ||
          simulator.customize?.[0]?.main?.backgroundColor,
      }}
    >
      <div
        style={{
          maxWidth: `${maxWidth}px`,
        }}
        className="mx-auto px-5"
      >
        <CompleteContext.Provider
          value={{ isMobile, onComplete: handleComplete }}
        >
          {!simulator.user.started && simulator.show_welcome_screen ? (
            <WelcomeScreen
              refetch={refetch}
              welcomeScreen={simulator.welcome_screen_settings}
              customization={simulator.customize?.[0]?.welcome_screen}
            />
          ) : (
            <div>
              <BlocksList
                customization={customization || simulator.customize?.[0]}
                refetch={refetch}
                blocks={simulator?.user?.blocks}
              />
            </div>
          )}

          {isCreator && (
            <div className="my-10 text-center">
              <ColoredButton
                onClick={handleReset}
                className={"mx-auto"}
                customization={{
                  buttonBackgroundColor: "#10B1FC",
                  buttonTextColor: "#fff",
                }}
                content={"Повторить прохождение"}
              />
            </div>
          )}
        </CompleteContext.Provider>
      </div>
    </div>
  );
};
