import { Link, useNavigate } from "react-router";
import { useCourse } from "@/shared/lib";
import {
  useGetCourseUserQuery,
  useSetCurrentLessonMutation,
} from "@/entities/course";
import { useUserInfoQuery } from "@/entities/session";
import {
  useGetLessonsQuery,
  useStartLessonMutation,
  type Lesson,
} from "@/entities/lesson";
import { Card, Progress } from "@/shared/ui/";
import { AppHeader } from "@/widgets/app-header";
import clsx from "clsx";
import { LockClosedIcon } from "@heroicons/react/24/solid";

export const StartButton = ({
  onClick,
  size = "md",
  disabled = false,
}: {
  onClick: () => void;
  size?: "md" | "sm";
  disabled?: boolean;
}) => {
  return (
    <button
      className={clsx(
        "text-button cursor-pointer hover:bg-primary/80 transition-all duration-300 bg-primary text-white flex items-center justify-center  rounded-full",
        size === "sm"
          ? "w-[40px] h-[40px]"
          : " md:w-[55px] md:h-[55px] w-[45px] h-[45px]",
        disabled && "bg-primary/60 pointer-events-none"
      )}
      onClick={onClick}
    >
      <svg
        width={size === "sm" ? "10" : "12"}
        height={size === "sm" ? "16" : "20"}
        viewBox={size === "sm" ? "0 0 10 16" : "0 0 12 20"}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={size === "sm" ? "M1 1L8 8L1 15" : "M1 1L10 10L1 19"}
          stroke="white"
          stroke-width="2"
        />
      </svg>
    </button>
  );
};

export const HomePage = () => {
  const course = useCourse();
  const navigate = useNavigate();
  const { data: courseUser } = useGetCourseUserQuery();
  const { data: user } = useUserInfoQuery();
  const { data: lessons } = useGetLessonsQuery();

  const [startLesson] = useStartLessonMutation();
  const [setCurrentLesson] = useSetCurrentLessonMutation();
  const handleStartLesson = async (lessonId: number) => {
    const response = await startLesson({ lessonId });
    if (response.data?.last_simulator_id) {
      navigateToSimulator(lessonId, response.data.last_simulator_id);
    }
  };

  const continueCourse = () => {
    if (courseUser?.last_lesson_id) {
      const lessonUser = lessons?.find(
        (lesson) => lesson.id === courseUser.last_lesson_id
      )?.user;
      if (lessonUser) {
        navigateToSimulator(
          courseUser.last_lesson_id,
          lessonUser.last_simulator!
        );
      }
    } else {
      handleStartLesson(lessons?.[0]?.id!);
    }
  };

  const handleClickLesson = async (lesson: Lesson) => {
    if (!lesson.user && lesson.is_available) {
      await handleStartLesson(lesson.id);
    }
    if (lesson.user) {
      setCurrentLesson({ lesson_id: lesson.id });
      navigateToSimulator(lesson.id, lesson.user.last_simulator!);
    }
  };

  const navigateToSimulator = (lessonId: number, simulatorId: number) => {
    navigate(`/lesson/${lessonId}/simulator/${simulatorId}`);
  };

  if (!courseUser || !user || !lessons || !course) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <AppHeader />
      <div className="container max-w-4xl mx-auto px-5">
        <h1 className="text-h3 !font-extralight mt-10 mb-6">
          Добро пожаловать, {user.first_name}!
        </h1>
        <Card className="mb-5  shadow-[3px_3px_5px_0px_rgba(149,149,149,0.25)]">
          <h2 className="text-h5 pt-2 text-primary !font-bold mb-1">
            {course.name}
          </h2>
          <p className="text-caption text-[#6A6B70] mb-4">
            {course.description}
          </p>
          <div className="flex justify-between items-end">
            <div className="md:w-[336px] w-1/2 mb-4">
              <Progress progress={courseUser.progress || 0} />
            </div>
            <StartButton onClick={continueCourse} />
          </div>
        </Card>
        <h5 className="text-xl font-light text-gray-600 mb-5">
          Программа обучения
        </h5>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          {lessons.map((lesson) => (
            <Card size="sm" key={lesson.id} className="h-full">
              <div className="flex flex-col h-full">
                {lesson.image ? (
                  <img
                    src={lesson.image}
                    alt={lesson.name}
                    className="w-full h-[150px] object-cover rounded-xl mb-5"
                  />
                ) : (
                  <div className="mb-5 h-[150px] rounded-xl bg-gray-200"></div>
                )}
                <h6
                  className={clsx(
                    "text-h6 mb-2",
                    !lesson.is_available && "text-gray-500"
                  )}
                >
                  {lesson.name}
                </h6>
                <p
                  className={clsx(
                    "text-body-sm mb-7 flex-1",
                    lesson.is_available ? "text-gray-600" : "text-gray-400"
                  )}
                >
                  {lesson.description}
                </p>

                <div className="flex justify-between items-center">
                  {/* Подпись статуса урока */}
                  {lesson.user?.completed ? (
                    <p className="text-caption text-primary">Урок пройден</p>
                  ) : lesson.user && !lesson.user.completed ? (
                    <p className="text-caption text-primary">
                      Пройдено симуляторов{" "}
                      {lesson.user.completed_simulators_count}/
                      {lesson.simulators.length}
                    </p>
                  ) : !lesson.is_available ? (
                    <div className="flex items-center gap-1.5">
                      <LockClosedIcon className="w-3.5 h-3.5 text-gray-400" />
                      <p className="text-caption text-gray-400">
                        Вам недоступен этот урок
                      </p>
                    </div>
                  ) : (
                    <div></div>
                  )}

                  <StartButton
                    size="sm"
                    disabled={!lesson.is_available}
                    onClick={() => handleClickLesson(lesson)}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
