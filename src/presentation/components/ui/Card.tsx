import React from "react";
import { cn } from "@/presentation/utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card = ({ className, padding = "md", children, ...props }: CardProps) => {
  const paddings = {
    none: "p-0",
    sm: "p-sm",
    md: "p-md",
    lg: "p-lg",
  };

  return (
    <div
      className={cn(
        "bg-white rounded-3xl shadow-air overflow-hidden",
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-xs mb-md", className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-2xl font-semibold text-slate", className)} {...props}>
    {children}
  </h3>
);

export const CardContent = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("", className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-md pt-md border-t border-slate-light", className)} {...props}>
    {children}
  </div>
);
