import { SimulatorComplete } from "@/shared/lib/simulator-complete";
import { useCurrentLesson, useLessons } from "../model/lesson";
import { useCurrentCourse } from "@/entities/course";
import { useEffect, useState } from "react";
import Tooltip from "@/shared/ui/tooltip";
import clsx from "clsx";
import { updateCurrentSimulator } from "../api/lesson";

export const LessonCompletion = () => {
  const { data: course, refetch: refetchCourse } = useCurrentCourse();
  const { refetch: refetchLessons } = useLessons();
  const [lesson, setCurrentLesson] = useCurrentLesson();

  const [maxWidth, setMaxWidth] = useState(1024);

  const screenWidth = window.innerWidth;

  const handleSimulatorComplete = async () => {
    refetchCourse();
    refetchLessons();
  };

  const handleChangeSimulator = (simulatorId) => {
    if (lesson.user.last_simulator === simulatorId) return;
    setCurrentLesson({
      ...lesson,
      user: { ...lesson.user, last_simulator: simulatorId },
    });
    updateCurrentSimulator({ simulator: simulatorId, lesson: lesson.id });
  };

  useEffect(() => {
    if (course) {
      const customization = course.customization;
      if (!customization) return;
      if (screenWidth < 500) {
        setMaxWidth(customization.main.maxPhoneWidth);
      } else if (screenWidth < 900) {
        setMaxWidth(customization.main.maxTabletWidth);
      } else {
        setMaxWidth(customization.main.maxDesktopWidth);
      }
    }
  }, [course]);

  return (
    <div
      className="mx-auto pt-10 md:px-10"
      style={{ maxWidth: `${maxWidth}px` }}
    >
      <div className="mb:mt-0 mt-5 px-5">
        <div className="text-2xl font-bold">{lesson.name}</div>
        <div className="mt-10 flex">
          {lesson.simulators.map((simulator) => (
            <Tooltip text={simulator.name} key={simulator.id}>
              <div
                onClick={
                  simulator.started &&
                  (() => handleChangeSimulator(simulator.id))
                }
                style={{
                  backgroundColor: simulator.completed
                    ? course.customization?.main?.completedSimulatorColor
                    : simulator.id === lesson.user.last_simulator
                      ? course.customization?.main?.activeSimulatorColor
                      : course.customization?.main?.disabledSimulatorColor,
                }}
                className={clsx(
                  "h-[6px] w-full cursor-pointer rounded-sm",
                  !simulator.started && "pointer-events-none",
                )}
              ></div>
            </Tooltip>
          ))}
        </div>
      </div>
      <SimulatorComplete
        onComplete={handleSimulatorComplete}
        screenWidth={screenWidth}
        customization={{
          ...course.customization,
          main: {
            ...course.customization?.main,
            backgroundColor: "transparent",
          },
        }}
        simulatorId={lesson.user.last_simulator}
      />
    </div>
  );
};
