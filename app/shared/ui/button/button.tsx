import type { ButtonHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { clsx } from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      fullWidth = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      className = "",
      disabled = false,
      type = "button",
      ...props
    },
    ref
  ) => {
    const buttonClasses = clsx(
      // Base styles
      "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 outline-none",
      // Focus styles
      "focus:ring-2 focus:ring-offset-2",
      // Variant styles
      {
        // Primary
        "bg-primary text-white hover:bg-primary/90 focus:ring-primary/50":
          variant === "primary",
        // Secondary
        "bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary/50":
          variant === "secondary",
        // Outline
        "border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary/50":
          variant === "outline",
        // Ghost
        "text-primary hover:bg-primary/10 focus:ring-primary/50":
          variant === "ghost",
        // Danger
        "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/50":
          variant === "danger",
      },
      // Size styles
      {
        "px-3 py-1.5 text-sm": size === "sm",
        "px-4 py-2.5 text-base": size === "md",
        "px-6 py-3 text-lg": size === "lg",
      },
      // Full width
      { "w-full": fullWidth },
      // Disabled/Loading styles
      {
        "opacity-60 cursor-not-allowed": disabled || isLoading,
        "cursor-wait": isLoading,
      },
      // Custom className
      className
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={buttonClasses}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {!isLoading && leftIcon && <span>{leftIcon}</span>}

        <span>{children}</span>

        {!isLoading && rightIcon && <span>{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
