import type { InputHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { clsx } from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    variant?: "default" | "filled";
    inputSize?: "sm" | "md" | "lg";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            helperText,
            leftIcon,
            rightIcon,
            variant = "default",
            inputSize = "md",
            className = "",
            disabled = false,
            type = "text",
            ...props
        },
        ref
    ) => {
        const inputClasses = clsx(
            // Base styles
            "w-full rounded-lg border transition-all duration-200 outline-none",
            // Placeholder styles
            "placeholder:text-gray-400",
            // Variant styles
            {
                "bg-white": variant === "default",
                "bg-gray-50": variant === "filled",
            },
            // Size styles
            {
                "px-3 py-1.5 text-sm": inputSize === "sm",
                "px-4 py-2 text-base": inputSize === "md",
                "px-5 py-3 text-lg": inputSize === "lg",
            },
            // State styles
            {
                "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200": error,
                "border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20": !error,
            },
            // Disabled styles
            {
                "opacity-50 cursor-not-allowed bg-gray-100": disabled,
                "hover:border-gray-400": !disabled,
            },
            // Icon padding
            {
                "pl-10": leftIcon,
                "pr-10": rightIcon,
            },
            // Custom className
            className
        );

        const labelClasses = clsx(
            "block mb-1.5 text-sm font-medium",
            error ? "text-red-600" : "text-gray-700"
        );

        return (
            <div className="w-full">
                {label && (
                    <label className={labelClasses}>
                        {label}
                    </label>
                )}

                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            {leftIcon}
                        </div>
                    )}

                    <input
                        ref={ref}
                        type={type}
                        disabled={disabled}
                        className={inputClasses}
                        aria-invalid={error ? "true" : "false"}
                        aria-describedby={
                            error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined
                        }
                        {...props}
                    />

                    {rightIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                            {rightIcon}
                        </div>
                    )}
                </div>

                {error && (
                    <p
                        id={`${props.id}-error`}
                        className="mt-1.5 text-sm text-red-600"
                        role="alert"
                    >
                        {error}
                    </p>
                )}

                {!error && helperText && (
                    <p
                        id={`${props.id}-helper`}
                        className="mt-1.5 text-sm text-gray-500"
                    >
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

