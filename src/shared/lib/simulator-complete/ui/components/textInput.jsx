import { useEffect, useRef, useState } from "react";
import { SendButton } from "./sendButton";

export const TextInput = ({
  onChange,
  value,
  loading,
  onSubmit,
  customization = {},
  ...props
}) => {
  const textAreaRef = useRef(null);
  const [height, setHeight] = useState("auto");
  const [areaStyle, setAreaStyle] = useState();

  const handleInput = (event) => {
    const textarea = textAreaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setHeight(`${textarea.scrollHeight}px`);

    if (onChange && event) {
      onChange(event);
    }
  };

  const handleFocus = () => {
    setAreaStyle({ color: customization.color, isFocused: true });
  };

  const handleBlur = () => {
    setAreaStyle({ color: customization.color, isFocused: false });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (event.shiftKey || event.metaKey) {
        // Разрешаем новую строку
        return;
      }
      // Сабмит формы
      event.preventDefault();
      const form = textAreaRef.current.closest("form");
      if (form) {
        form.requestSubmit(); // Сабмитим форму
      }
    }
  };

  useEffect(() => {
    handleInput();
  }, []);

  return (
    <>
      {value?.length > 0 && (
        <div className="absolute top-2 right-1">
          <SendButton
            loading={loading}
            onClick={onSubmit}
            customization={{ color: customization.iconColor }}
          />
        </div>
      )}
      <textarea
        ref={textAreaRef}
        onInput={handleInput}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder="Ваш ответ"
        rows={1}
        onBlur={handleBlur}
        style={{
          height,
          outline: "none",
          borderColor: customization.color,
          borderWidth: areaStyle?.isFocused ? "2px" : "1px",
        }}
        className={
          "w-full resize-none overflow-hidden rounded-lg border-[1px] p-3 pr-10 transition-colors"
        }
        {...props}
      />
    </>
  );
};
