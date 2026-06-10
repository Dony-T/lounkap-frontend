import React from "react";
import { cn } from "@/presentation/utils/cn";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "error" | "warning" | "info" | "neutral";
  size?: "sm" | "md";
}

export const Badge = ({
  className,
  variant = "neutral",
  size = "md",
  children,
  ...props
}: BadgeProps) => {
  const variants = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    success: "bg-status-success/10 text-status-success",
    error: "bg-status-error/10 text-status-error",
    warning: "bg-orange-500/10 text-orange-500",
    info: "bg-blue-500/10 text-blue-500",
    neutral: "bg-slate-light/50 text-slate-grey",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-sm py-[2px] text-[10px]",
  };

  return (
    <span
      className={cn(
        "rounded-full font-bold uppercase tracking-widest inline-flex items-center justify-center",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
