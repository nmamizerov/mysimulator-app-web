import { useMemo } from "react";
import { MessageBlock } from "./messageBlock";
import { useCompleteContext } from "../../model/complete";
import { UserAnswer } from "../components/userAnswer";

export const BaseBlock = ({
  block,
  customization,
  userAnswerCustomization,
}) => {
  const blockData = block.block;
  const isCompleted = block.is_completed;
  const { isMobile } = useCompleteContext();

  const blockContent = useMemo(() => {
    if (blockData.character && blockData.character.id) {
      return (
        <MessageBlock
          customization={customization?.message || {}}
          isMobile={isMobile}
          block={blockData}
        />
      );
    }
    const customize = customization?.base || {};
    return (
      <div
        className="inline-block text-lg"
        style={{
          color: customize.textColor,
        }}
        dangerouslySetInnerHTML={{ __html: blockData.text }}
      ></div>
    );
  }, [blockData, customization, isMobile]);

  return (
    <div className="flex flex-col gap-8">
      {blockContent}

      {isCompleted && (
        <UserAnswer
          text={block.answer}
          customization={userAnswerCustomization}
        />
      )}
    </div>
  );
};
