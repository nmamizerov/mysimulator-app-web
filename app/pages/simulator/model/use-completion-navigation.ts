import { useMemo } from "react";
import { useNavigate } from "react-router";
import { useStartLessonMutation, type Lesson } from "@/entities/lesson";
import { useStartSimulatorMutation } from "@/entities/simulator";

type CompletionType = "next-simulator" | "next-lesson" | "course-completed";

interface UseCompletionNavigationReturn {
  completionType: CompletionType | null;
  handleNext: () => void;
}

/**
 * Хук для определения логики навигации после завершения симулятора
 *
 * @param lessons - Массив уроков курса
 * @param currentLessonId - ID текущего урока
 * @param currentSimulatorId - ID текущего симулятора
 * @returns Тип завершения и функция для навигации к следующему шагу
 */
export const useCompletionNavigation = (
  lessons: Lesson[],
  currentLessonId: string,
  currentSimulatorId: string
): UseCompletionNavigationReturn => {
  const navigate = useNavigate();

  const [startLesson, { isLoading: isStartingLesson }] =
    useStartLessonMutation();
  const [startSimulator, { isLoading: isStartingSimulator }] =
    useStartSimulatorMutation();

  const navigationData = useMemo(() => {
    // Находим текущий урок
    const currentLessonIndex = lessons.findIndex(
      (lesson) => lesson.id === Number(currentLessonId)
    );

    if (currentLessonIndex === -1) {
      return { completionType: null, nextUrl: null };
    }

    const currentLesson = lessons[currentLessonIndex];

    // Находим текущий симулятор в уроке
    const currentSimulatorIndex = currentLesson.simulators.findIndex(
      (sim) => sim.id === Number(currentSimulatorId)
    );

    if (currentSimulatorIndex === -1) {
      return { completionType: null, nextUrl: null };
    }

    // Проверяем, есть ли следующий симулятор в текущем уроке
    const hasNextSimulator =
      currentSimulatorIndex < currentLesson.simulators.length - 1;

    if (hasNextSimulator) {
      // Есть следующий симулятор в текущем уроке
      const nextSimulator = currentLesson.simulators[currentSimulatorIndex + 1];
      return {
        completionType: "next-simulator" as CompletionType,
        nextUrl: `/lesson/${currentLessonId}/simulator/${nextSimulator.id}`,
        preAction: async () => {
          await startSimulator({
            simulator_id: nextSimulator.id,
            lesson_user_id: currentLesson.user?.id!,
          });
        },
      };
    }

    // Текущий симулятор последний в уроке, проверяем следующий урок
    const hasNextLesson = currentLessonIndex < lessons.length - 1;

    if (hasNextLesson) {
      // Есть следующий урок
      const nextLesson = lessons[currentLessonIndex + 1];
      const firstSimulator = nextLesson.simulators[0];

      if (firstSimulator) {
        return {
          completionType: "next-lesson" as CompletionType,
          nextUrl: `/lesson/${nextLesson.id}/simulator/${firstSimulator.id}`,
          preAction: async () => {
            await startLesson({ lessonId: nextLesson.id });
          },
        };
      }
    }

    // Это последний симулятор в последнем уроке - курс завершен
    return {
      completionType: "course-completed" as CompletionType,
      nextUrl: null,
    };
  }, [lessons, currentLessonId, currentSimulatorId]);

  const handleNext = async () => {
    if (navigationData.nextUrl) {
      navigate(navigationData.nextUrl);
    }
  };

  return {
    completionType: navigationData.completionType,
    handleNext,
  };
};
