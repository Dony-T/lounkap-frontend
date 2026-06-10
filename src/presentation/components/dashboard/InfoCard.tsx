import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/presentation/utils/cn";

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export const InfoCard = ({ icon: Icon, title, description, className }: InfoCardProps) => {
  return (
    <div className={cn(
      "bg-[#f0f3ff] rounded-3xl p-lg flex flex-col gap-md border border-slate-light/10",
      className
    )}>
      <div className="w-10 h-10 bg-[#e7eeff] border border-slate-light/20 rounded-xl flex items-center justify-center text-slate shadow-sm">
        <Icon size={20} strokeWidth={1.5} className="text-[#a68928]" />
      </div>
      <div className="flex flex-col gap-sm">
        <h3 className="text-xl font-bold text-slate tracking-tight">{title}</h3>
        <p className="text-sm text-slate-grey leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
