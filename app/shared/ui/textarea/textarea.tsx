import { useState, useRef, type TextareaHTMLAttributes } from "react";

interface AutoResizeTextareaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "rows" | "onChange"
  > {
  onSend?: (value: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
}

export const Textarea = ({
  onSend,
  placeholder = "Напишите сообщение...",
  value: controlledValue,
  onChange: controlledOnChange,
  className = "",
  disabled,
  ...textareaProps
}: AutoResizeTextareaProps) => {
  const [internalValue, setInternalValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Определяем, контролируемый или неконтролируемый компонент
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  // Функция для автоматического изменения размера
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Сбрасываем высоту для корректного пересчета
    textarea.style.height = "auto";

    // Устанавливаем новую высоту на основе scrollHeight
    const newHeight = Math.min(textarea.scrollHeight, 120); // макс 120px (5 строк)
    textarea.style.height = `${newHeight}px`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }

    // Вызываем adjustHeight только после обновления значения
    requestAnimationFrame(() => {
      adjustHeight();
    });

    controlledOnChange?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    textareaProps.onKeyDown?.(e);
  };

  const handleSend = () => {
    if (value.trim() && onSend) {
      onSend(value);
      if (!isControlled) {
        setInternalValue("");
        // Сбрасываем высоту после очистки
        requestAnimationFrame(() => {
          if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
          }
        });
      }
    }
  };

  return (
    <div className="relative w-full">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className={`w-full resize-none overflow-y-auto px-4 py-3 pr-12 border border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        style={{
          lineHeight: "24px",
          minHeight: "48px", // минимальная высота (1 строка с padding)
          maxHeight: "120px", // максимальная высота (5 строк)
        }}
        {...textareaProps}
      />

      <button
        onClick={handleSend}
        disabled={!value.trim() || disabled}
        type="button"
        className={`flex cursor-pointer absolute right-1 bottom-[6px] items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 self-end mb-1 ${
          value.trim() && !disabled
            ? "text-white bg-primary"
            : "opacity-0 pointer-events-none cursor-not-allowed"
        }`}
        aria-label="Отправить сообщение"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </div>
  );
};
