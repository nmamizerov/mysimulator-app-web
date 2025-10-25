import { AllAvatars } from "@/shared/lib/avatars";
import type { UserBlock } from "../model/types";
import { AnswerField } from "./answer-field/answer-field";
import { useUserInfoQuery } from "@/entities/session";
import clsx from "clsx";

// ============================================================================
// ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ
// ============================================================================

/**
 * Обёртка с тегом для блока
 */
const BlockWrapper = ({
  tag,
  children,
}: {
  tag?: string;
  children: React.ReactNode;
}) => {
  if (!tag) {
    return <>{children}</>;
  }

  return (
    <div className="bg-gray-200/80 p-4 rounded-2xl md:mb-6 mb-4">
      <div className="font-medium mb-4 text-primary">{tag}</div>
      {children}
    </div>
  );
};

/**
 * Аватар персонажа или пользователя
 */
const Avatar = ({
  src,
  alt,
  size = "md",
  className = "",
}: {
  src: string;
  alt: string;
  size?: "sm" | "md";
  className?: string;
}) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16 min-w-16 min-h-16",
  };

  return (
    <img
      src={src}
      alt={alt}
      className={clsx(
        sizeClasses[size],
        "rounded-full object-cover",
        className
      )}
    />
  );
};

/**
 * Сообщение от персонажа
 */
const CharacterMessage = ({
  character,
  text,
}: {
  character: { name: string; role: string; image: string };
  text: string;
}) => {
  const avatarSrc = character.image.includes("http")
    ? character.image
    : AllAvatars[character.image as keyof typeof AllAvatars];

  return (
    <div className="flex gap-2 items-end md:mb-6 mb-4">
      {/* Десктопный аватар */}
      <div className="hidden md:block">
        <Avatar src={avatarSrc} alt={character.name} size="md" />
      </div>

      {/* Бабл с сообщением */}
      <div className="w-full md:w-auto md:mb-8 mb-4">
        <div className="bg-white border border-gray-200 rounded-2xl md:rounded-bl-none p-4">
          <div className="flex gap-2 items-end font-medium mb-5 md:mb-3">
            {/* Мобильный аватар */}
            <Avatar
              src={avatarSrc}
              alt={character.name}
              size="sm"
              className="md:hidden"
            />
            <div className="text-gray-900">{character.name},</div>
            <div className="text-gray-500">{character.role}</div>
          </div>
          <div
            className="text-body text-gray-800"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Простой текстовый блок без персонажа
 */
const TextMessage = ({ text }: { text: string }) => {
  return (
    <div className="mb-4">
      <div
        className="text-body text-gray-900"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
};

/**
 * Сообщение от пользователя (ответ)
 */
const UserMessage = ({
  answer,
  user,
}: {
  answer: string;
  user?: {
    first_name: string | null;
    last_name: string | null;
    avatar: string | null;
  };
}) => {
  if (!user || !user.first_name || !user.last_name || !user.avatar) return null;

  const avatarSrc = AllAvatars[user.avatar as keyof typeof AllAvatars];
  const fullName = `${user.first_name} ${user.last_name}`;

  return (
    <div className="flex gap-2 mb-6 items-end justify-end">
      {/* Бабл с ответом */}
      <div className="md:w-auto w-full md:mb-8 mb-4">
        <div className="bg-white border border-gray-200 rounded-2xl md:rounded-br-none p-4">
          <div className="flex gap-2 items-end font-medium mb-5 md:mb-3">
            {/* Мобильный аватар */}
            <Avatar
              src={avatarSrc}
              alt={fullName}
              size="sm"
              className="md:hidden"
            />
            <div className="text-gray-900">{fullName},</div>
            <div className="text-gray-500">Это вы</div>
          </div>
          <div
            className="text-body text-gray-800"
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        </div>
      </div>

      {/* Десктопный аватар */}
      <div className="hidden md:block">
        <Avatar src={avatarSrc} alt={fullName} size="md" />
      </div>
    </div>
  );
};

/**
 * Поле для ввода ответа
 */
const AnswerSection = ({
  userBlockId,
  completeType,
  nextButtonText,
  answerOptions,
  checkType,
  answer,
  answersOptionsProcessing,
}: {
  userBlockId: number;
  completeType: "text" | "button" | "answers";
  nextButtonText?: string;
  answerOptions?: string[];
  checkType?: "single_choice" | "multiple_choice" | "gpt_check";
  answer?: string;
  answersOptionsProcessing?: Array<{ is_correct: boolean }>;
}) => {
  return (
    <div className={clsx(!checkType && "mt-4")}>
      <AnswerField
        isFill={!!checkType}
        userBlockId={userBlockId}
        completeType={completeType}
        nextButtonText={nextButtonText}
        answerOptions={answerOptions}
        isMultiple={checkType === "multiple_choice"}
        answer={answer}
        answersOptionsProcessing={answersOptionsProcessing}
      />
    </div>
  );
};

// ============================================================================
// ОСНОВНОЙ КОМПОНЕНТ
// ============================================================================

interface BlockItemProps {
  block: UserBlock;
}

export const BlockItem = ({ block }: BlockItemProps) => {
  const { data: user } = useUserInfoQuery();
  const { character } = block.block;

  const checkType = block.block.check_type;
  const blockData = block.block;

  return (
    <>
      <BlockWrapper tag={blockData.tag || (checkType ? "Задание" : undefined)}>
        {character ? (
          <CharacterMessage character={character} text={blockData.text} />
        ) : (
          <TextMessage text={blockData.text} />
        )}
        {checkType && checkType !== "gpt_check" && (
          <AnswerSection
            checkType={checkType}
            userBlockId={block.id}
            completeType={blockData.complete_type}
            nextButtonText={blockData.next_button_text}
            answerOptions={blockData.answer_options}
            answer={block.is_completed ? block.answer : undefined}
            answersOptionsProcessing={
              block.is_completed
                ? blockData.answers_options_processing
                : undefined
            }
          />
        )}
        {checkType === "gpt_check" &&
          block.is_completed &&
          block.answer &&
          blockData.show_user_answer && (
            <UserMessage answer={block.answer} user={user} />
          )}
        {blockData.text_after_answer && (
          <div
            className="border-primary mt-5 border-l-3 pl-2 text-gray-800"
            dangerouslySetInnerHTML={{ __html: blockData.text_after_answer }}
          ></div>
        )}
      </BlockWrapper>

      {block.is_completed &&
        block.answer &&
        !checkType &&
        blockData.show_user_answer && (
          <UserMessage answer={block.answer} user={user} />
        )}

      {!block.is_completed && !checkType && (
        <AnswerSection
          userBlockId={block.id}
          completeType={blockData.complete_type}
          nextButtonText={blockData.next_button_text}
          answerOptions={blockData.answer_options}
        />
      )}
    </>
  );
};
