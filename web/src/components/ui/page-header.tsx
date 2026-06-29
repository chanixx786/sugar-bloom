"use client";

import { LucideIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  buttonLabel?: string;
  onButtonClick?: () => void;
  className?: string;
}

export function PageHeader({
  title,
  description,
  icon: Icon,
  buttonLabel,
  onButtonClick,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-primary/20",
        className
      )}
    >
      {/* Title & Description */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          {title}
          {Icon && <Icon className="size-5 text-primary animate-pulse" />}
        </h1>
        {description && (
          <p className="text-sm text-accent-foreground">{description}</p>
        )}
      </div>

      {/* Action Button */}
      {buttonLabel && (
        <Button
          onClick={onButtonClick}
          className="bg-gradient-to-r from-[#d44876] to-[#f6bc9c] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          <Plus className="size-4" />
          {buttonLabel}
        </Button>
      )}
    </div>
  );
}