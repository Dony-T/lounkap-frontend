import React from "react";
import { cn } from "@/presentation/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: "bg-primary text-white hover:bg-primary-hover shadow-sm",
      secondary: "border border-slate-light text-slate hover:border-primary hover:text-primary bg-transparent",
      ghost: "text-slate-grey hover:bg-slate-light/10 hover:text-slate bg-transparent",
      danger: "bg-status-error text-white hover:bg-status-error/90 shadow-sm",
    };

    const sizes = {
      sm: "px-md py-xs text-xs",
      md: "px-lg py-sm text-sm",
      lg: "px-xl py-md text-base",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center rounded-2xl font-semibold transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
