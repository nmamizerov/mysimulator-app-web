import { BlockItem } from "@/entities/block";
import { useGetCourseUserQuery } from "@/entities/course";
import { useGetLessonsQuery } from "@/entities/lesson";
import { useGetSimulatorQuery } from "@/entities/simulator";
import { useCourse, useMobileMenu } from "@/shared/lib";
import { SimulatorSidebar } from "@/widgets/simulator-sidebar";
import { MobileHeader } from "./mobile-header";
import { CompletionBanner } from "./completion-banner";
import { useCompletionNavigation } from "../model/use-completion-navigation";

interface SimulatorPageProps {
  lessonId: string;
  simulatorId: string;
}

export const SimulatorPage = ({
  lessonId,
  simulatorId,
}: SimulatorPageProps) => {
  // Загружаем данные через API
  const course = useCourse();
  const { data: courseUser } = useGetCourseUserQuery();
  const { data: lessons } = useGetLessonsQuery();
  const { data: simulator } = useGetSimulatorQuery({
    simulatorId: Number(simulatorId),
  });

  // Управление мобильным меню
  const { isOpen, toggle, close } = useMobileMenu();

  // Логика навигации после завершения симулятора
  const { completionType, handleNext } = useCompletionNavigation(
    lessons || [],
    lessonId,
    simulatorId
  );

  // Показываем загрузку, если данные еще не пришли
  if (!course || !lessons || !simulator) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-body text-gray-500">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 ">
      {/* Мобильный хедер - показываем только на мобилках */}
      <MobileHeader course={course} onMenuClick={toggle} />

      {/* Сайдбар слева */}
      <SimulatorSidebar
        course={course}
        courseUser={courseUser}
        lessons={lessons}
        currentLessonId={lessonId}
        currentSimulatorId={simulatorId}
        isMobileMenuOpen={isOpen}
        onMobileMenuClose={close}
      />

      {/* Основной контент */}
      <main className="flex-1 overflow-y-auto pt-16 lg:pt-0 simulator-complete">
        <div className="max-w-[896px] mx-auto px-4 sm:px-8 py-6 sm:py-12">
          {/* Название симулятора */}
          <h1 className="text-h4 sm:text-h3 text-gray-900 mb-6 sm:mb-8">
            {simulator.name}
          </h1>

          {/* Список пройденных блоков */}
          {simulator.user?.blocks && simulator.user.blocks.length > 0 ? (
            <div className="space-y-4">
              {simulator.user.blocks.map((userBlock) => (
                <BlockItem key={userBlock.id} block={userBlock} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-body text-gray-500">
                Вы еще не начали этот симулятор
              </p>
            </div>
          )}

          {/* Плашка завершения симулятора */}
          {simulator.user?.completed && completionType && (
            <div className="mt-8">
              <CompletionBanner type={completionType} onNext={handleNext} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
