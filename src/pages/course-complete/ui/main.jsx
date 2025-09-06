import { useCurrentCourse } from "@/entities/course";
import { useCurrentLesson, useLessons } from "../model/lesson";
import { Sidebar } from "./sidebar";
import { useEffect, useState } from "react";
import { LessonCompletion } from "./lessonCompletion";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useAuth } from "@/entities/session";

import { darkenColor } from "@/shared/lib/simulator-complete";

export const CourseComplete = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const { data: course } = useCurrentCourse();
  const { isAuth } = useAuth();
  // Загружаем lessons только если пользователь аутентифицирован
  const { data: lessons } = useLessons();
  const [currentLesson, setCurrentLesson] = useCurrentLesson();

  useEffect(() => {
    if (lessons && lessons.length > 0 && course && course.user) {
      if (course.user.last_lesson)
        setCurrentLesson(
          lessons.find((lesson) => lesson.id === course.user.last_lesson),
        );
      else setCurrentLesson(lessons[0]);
    }
  }, [lessons, course]);

  // Не рендерим компонент если пользователь не аутентифицирован
  if (!isAuth) {
    return <div></div>;
  }

  if (!course || !lessons) {
    return <div></div>;
  }

  return (
    <div
      style={{
        color: course.customization?.main?.textColor,
      }}
      className="flex h-full min-h-screen w-full"
    >
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div
        className="fixed z-100 h-full overflow-hidden break-words transition-all duration-300"
        style={{
          width: showDrawer ? "100%" : 0,
        }}
      >
        <div
          onClick={() => setShowDrawer(false)}
          className="absolute top-2 right-2 text-3xl"
        >
          <IoClose />
        </div>
        <Sidebar onClose={() => setShowDrawer(false)} />
      </div>
      <div
        style={{
          backgroundColor: course.customization?.main?.backgroundColor,
        }}
        className="w-full bg-gray-100 pb-[300px] md:pl-[300px]"
      >
        {currentLesson && <LessonCompletion />}
      </div>

      <div
        style={{
          backgroundColor: darkenColor(
            course.customization?.main?.backgroundColor,
            5,
          ),
        }}
        onClick={() => setShowDrawer(!showDrawer)}
        className="message-shadow fixed top-2 left-2 z-50 flex h-8 w-8 items-center justify-center rounded-full md:hidden"
      >
        <IoMdMenu fontSize={30} />
      </div>
    </div>
  );
};
