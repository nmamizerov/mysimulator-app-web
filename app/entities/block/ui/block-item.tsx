import { AllAvatars, MaleAvatars } from "@/shared/lib/avatars";
import type { UserBlock } from "../model/types";
import { AnswerField } from "./answer-field";
import { useUserInfoQuery } from "@/entities/session";
import clsx from "clsx";

interface BlockItemProps {
  block: UserBlock;
}

export const BlockItem = ({ block }: BlockItemProps) => {
  const { data: user } = useUserInfoQuery();

  const { character } = block.block;

  // Блок без персонажа - просто HTML текст
  if (!character) {
    return (
      <>
        <div
          className={clsx(
            "mb-4",
            block.block.tag && "bg-gray-200/80 p-4 rounded-2xl md:mb-6 mb-4"
          )}
        >
          {block.block.tag && (
            <div className="font-medium mb-4 text-primary">
              {block.block.tag}
            </div>
          )}
          <div
            className="text-body text-gray-900"
            dangerouslySetInnerHTML={{ __html: block.block.text }}
          />
        </div>
        {block.is_completed && block.answer && (
          <div className="flex gap-2 mb-6 items-end justify-end">
            <div className="md:w-auto w-full md:mb-8 mb-4">
              <div className="bg-white border border-gray-200 rounded-2xl md:rounded-br-none p-4 ">
                <div className="flex gap-2 items-end font-medium mb-5  md:mb-3">
                  <img
                    src={AllAvatars[user?.avatar as keyof typeof AllAvatars]}
                    alt={user?.first_name + " " + user?.last_name}
                    className="w-12 h-12 md:hidden  rounded-full object-cover"
                  />
                  <div className=" text-gray-900 ">
                    {user?.first_name} {user?.last_name},
                  </div>
                  <div className=" text-gray-500">Это вы</div>
                </div>
                <div
                  className="text-body text-gray-800"
                  dangerouslySetInnerHTML={{ __html: block.answer }}
                />
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src={AllAvatars[user?.avatar as keyof typeof AllAvatars]}
                alt={user?.first_name + " " + user?.last_name}
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
          </div>
        )}
        {!block.is_completed && (
          <div className="flex justify-end">
            <AnswerField
              userBlockId={block.id}
              completeType={block.block.complete_type}
              nextButtonText={block.block.next_button_text}
              answerOptions={block.block.answer_options}
            />
          </div>
        )}
      </>
    );
  }

  // Блок с персонажем - аватарка + бабл
  return (
    <>
      <div
        className={clsx(
          block.block.tag && "bg-gray-200/80 p-4 rounded-2xl md:mb-6 mb-4"
        )}
      >
        {block.block.tag && (
          <div className="font-medium mb-4 text-primary">{block.block.tag}</div>
        )}
        <div
          className={clsx(
            "flex gap-2 items-end",
            !block.block.tag && "md:mb-6 mb-4"
          )}
        >
          <div className="hidden md:block">
            <img
              src={
                character.image.includes("http")
                  ? character.image
                  : AllAvatars[character.image as keyof typeof AllAvatars]
              }
              alt={character.name}
              className="w-16 h-16 min-w-16 min-h-16 rounded-full object-cover"
            />
          </div>
          <div className="w-full md:w-auto md:mb-8 mb-4">
            {/* Бабл с контентом */}
            <div className="bg-white border border-gray-200 rounded-2xl md:rounded-bl-none p-4 ">
              <div className="flex gap-2 items-end font-medium mb-5 md:mb-3">
                <img
                  src={
                    character.image.includes("http")
                      ? character.image
                      : AllAvatars[character.image as keyof typeof AllAvatars]
                  }
                  alt={character.name}
                  className="w-12 h-12 md:hidden  rounded-full object-cover"
                />
                <div className=" text-gray-900 ">{character.name},</div>
                {/* Роль персонажа */}
                <div className=" text-gray-500">{character.role}</div>
              </div>
              {/* Текст блока */}
              <div
                className="text-body text-gray-800"
                dangerouslySetInnerHTML={{ __html: block.block.text }}
              />
            </div>

            {/* Поле ответа */}
          </div>
        </div>
      </div>
      {block.is_completed && block.answer && (
        <div className="flex gap-2 mb-6 items-end justify-end">
          <div className="md:w-auto w-full md:mb-8 mb-4">
            <div className="bg-white border border-gray-200 rounded-2xl md:rounded-br-none p-4 ">
              <div className="flex gap-2 items-end font-medium mb-5  md:mb-3">
                <img
                  src={AllAvatars[user?.avatar as keyof typeof AllAvatars]}
                  alt={user?.first_name + " " + user?.last_name}
                  className="w-12 h-12 md:hidden  rounded-full object-cover"
                />
                <div className=" text-gray-900 ">
                  {user?.first_name} {user?.last_name},
                </div>
                <div className=" text-gray-500">Это вы</div>
              </div>
              <div
                className="text-body text-gray-800"
                dangerouslySetInnerHTML={{ __html: block.answer }}
              />
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src={AllAvatars[user?.avatar as keyof typeof AllAvatars]}
              alt={character.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
        </div>
      )}
      {!block.is_completed && (
        <div className="flex justify-end">
          <AnswerField
            userBlockId={block.id}
            completeType={block.block.complete_type}
            nextButtonText={block.block.next_button_text}
            answerOptions={block.block.answer_options}
          />
        </div>
      )}
    </>
  );
};
