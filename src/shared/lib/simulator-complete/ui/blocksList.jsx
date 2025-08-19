import { BaseBlock } from "./block/baseBlock";
import { useCompleteBlock } from "../model/block";
import { TextInput } from "./components/textInput";
import { useEffect, useRef, useState } from "react";
import { ColoredButton } from "./components/coloredButton";
import { AnswerOption } from "./components/answerOption";
import { useCompleteContext } from "../model/complete";

export const BlocksList = ({ blocks = [], refetch, customization = {} }) => {
  const [loading, setLoading] = useState(false);
  const lastBlock = blocks[blocks.length - 1];
  const [text, setText] = useState("");
  const lastBlockRef = useRef();
  const containerRef = useRef();
  const { onComplete } = useCompleteContext();

  const { mutateAsync } = useCompleteBlock();

  const completeBlock = async (block, answer) => {
    setText(answer);
    setLoading(true);
    await mutateAsync({ id: block.id, answer });
    const response = await refetch();
    if (response.data.user.completed) {
      onComplete();
    }
    setLoading(false);
    setText();
  };

  useEffect(() => {
    if (lastBlockRef.current) {
      const isInIframe = window.self !== window.top;
      if (isInIframe) {
        // Если мы в iframe, скроллим только контейнер
        containerRef.current.scrollTo({
          top: lastBlockRef.current.offsetTop,
          behavior: "smooth",
        });
      } else {
        // Если не в iframe, используем стандартное поведение
        lastBlockRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [blocks]);

  return (
    <div
      ref={containerRef}
      className="mt-10 flex h-[calc(100vh-80px)] flex-col gap-8 overflow-y-auto"
    >
      {blocks.map((block) => (
        <BaseBlock
          customization={customization.block}
          userAnswerCustomization={customization.user_answer}
          key={block.id}
          block={block}
        />
      ))}
      {lastBlock && !lastBlock.is_completed && (
        <div ref={lastBlockRef}>
          {lastBlock.block.complete_type === "button" && (
            <div>
              <ColoredButton
                onClick={() =>
                  completeBlock(lastBlock, lastBlock.block.next_button_text)
                }
                isLoading={loading}
                content={lastBlock.block.next_button_text}
                customization={customization.user_inputs.button}
              />
            </div>
          )}
          {lastBlock.block.complete_type === "text" && (
            <form
              onSubmit={(e) => {
                completeBlock(lastBlock, text);
                e.preventDefault();
              }}
              className="relative"
            >
              <TextInput
                value={text}
                loading={loading}
                customization={customization.user_inputs.textarea}
                onSubmit={() => completeBlock(lastBlock, text)}
                onChange={(e) => setText(e.target.value)}
              />
            </form>
          )}
          {lastBlock.block.complete_type === "answers" && (
            <div className="flex flex-col gap-4 md:flex-row">
              {(lastBlock.block["answer_options"] || []).map((option, idx) => (
                <AnswerOption
                  isLoading={loading && option === text}
                  isDisabled={loading}
                  text={option}
                  onClick={() => completeBlock(lastBlock, option)}
                  key={idx}
                  customization={customization.user_inputs.select}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
