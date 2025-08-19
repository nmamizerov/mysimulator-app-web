import { Avatars } from "@/shared/lib/avatars";
import clsx from "clsx";

export const MessageBlock = ({ block, customization }) => {
  const character = block.character;

  return (
    <div className={clsx("flex gap-5", "lg:max-w-[60%]")}>
      <img
        src={Avatars[character.image] || character.image}
        alt={character.name}
        className="h-16 w-16 rounded-full"
        width={64}
        height={64}
      />

      <div
        style={{ backgroundColor: customization.backgroundColor }}
        className="message-shadow relative mb-8 w-full self-start rounded-lg p-3"
      >
        <div
          style={{
            borderRightColor: customization.backgroundColor,
          }}
          className="triangle-left absolute top-[12px] left-[-19px]"
        ></div>
        <div className="mb-5">
          <div
            style={{
              color: customization.characterNameColor,
              fontWeight: 600,
            }}
            className="text-base font-bold"
          >
            {character.name}
          </div>
          <div
            style={{
              color: customization.characterRoleColor,
              fontWeight: 300,
            }}
            className="text-sm"
          >
            {character.role}
          </div>
        </div>
        <div
          style={{ color: customization.textColor }}
          dangerouslySetInnerHTML={{ __html: block.text }}
          className="text-lg"
        ></div>
      </div>
    </div>
  );
};
