import React from "react";
import { cn } from "@/presentation/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-xs w-full">
        {label && (
          <label className="text-sm font-medium text-slate-grey ml-1 uppercase tracking-wider text-[11px]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full border border-slate-light rounded-2xl px-md py-sm outline-none transition-all",
            "focus:border-primary focus:ring-4 focus:ring-primary/10",
            "placeholder:text-slate-grey/50 text-slate",
            error && "border-status-error focus:ring-status-error/10",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs text-status-error ml-1">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
