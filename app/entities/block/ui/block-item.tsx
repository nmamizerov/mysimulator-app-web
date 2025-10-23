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
      <div className="mb-4">
        <div
          className="text-body text-gray-900"
          dangerouslySetInnerHTML={{ __html: block.block.text }}
        />
        {!block.is_completed && (
          <AnswerField
            userBlockId={block.id}
            completeType={block.block.complete_type}
            nextButtonText={block.block.next_button_text}
            answerOptions={block.block.answer_options}
          />
        )}
      </div>
    );
  }

  // Блок с персонажем - аватарка + бабл
  return (
    <>
      <div
        className={clsx(
          block.block.tag && "bg-gray-200/80 p-4 rounded-2xl mb-6"
        )}
      >
        {block.block.tag && (
          <div className="font-medium mb-4 text-primary">{block.block.tag}</div>
        )}
        <div
          className={clsx("flex gap-2 items-end", !block.block.tag && "mb-6")}
        >
          {/* Аватарка персонажа слева снизу */}
          <div>
            <img
              src={
                character.image.includes("http")
                  ? character.image
                  : AllAvatars[character.image as keyof typeof AllAvatars]
              }
              alt={character.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>

          {/* Контент справа */}
          <div className="w-auto mb-8">
            {/* Бабл с контентом */}
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-4 ">
              <div className="flex gap-2 font-medium mb-3">
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
          <div className="w-auto mb-8">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-br-none p-4 ">
              <div className="flex gap-2 font-medium mb-3">
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
          <div>
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
