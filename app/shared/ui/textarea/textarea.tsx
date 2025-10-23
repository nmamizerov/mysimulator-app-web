import type { TextareaHTMLAttributes, ReactNode } from "react";
import { forwardRef, useState } from "react";
import { clsx } from "clsx";

interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onSubmit"> {
  error?: boolean;
  helperText?: string;
  rightElement?: ReactNode;
  onSubmit?: (value: string) => void;
  autoExpand?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      error = false,
      helperText,
      rightElement,
      className = "",
      disabled = false,
      onSubmit,
      autoExpand = false,
      rows: initialRows = 1,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const [rows, setRows] = useState(initialRows);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Автоматическое расширение при нажатии Enter
      if (
        autoExpand &&
        e.key === "Enter" &&
        !e.shiftKey &&
        !e.ctrlKey &&
        !e.metaKey
      ) {
        e.preventDefault();
        setRows((prev) => prev + 1);
      }

      // Отправка формы при Cmd/Ctrl + Enter
      if (onSubmit && e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        const value = (e.target as HTMLTextAreaElement).value;
        if (value.trim()) {
          onSubmit(value.trim());
        }
      }

      // Вызываем переданный onKeyDown, если есть
      onKeyDown?.(e);
    };

    const textareaClasses = clsx(
      // Base styles
      "w-full px-4 py-3 bg-white border rounded-lg text-body text-gray-900 placeholder-gray-400 transition-all duration-200",
      // Focus styles
      "focus:outline-none focus:ring-2 focus:border-transparent",
      // Normal state
      { "border-gray-200 focus:ring-orange-500": !error && !disabled },
      // Error state
      { "border-red-500 focus:ring-red-500": error && !disabled },
      // Disabled state
      { "opacity-50 cursor-not-allowed bg-gray-50": disabled },
      // Right element padding
      { "pr-12": rightElement },
      // Resize
      "resize-none",
      // Custom className
      className
    );

    return (
      <div className="relative">
        <textarea
          ref={ref}
          disabled={disabled}
          rows={rows}
          onKeyDown={handleKeyDown}
          className={textareaClasses}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 bottom-3">{rightElement}</div>
        )}
        {helperText && (
          <p
            className={clsx("mt-1.5 text-caption", {
              "text-red-500": error,
              "text-gray-500": !error,
            })}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
