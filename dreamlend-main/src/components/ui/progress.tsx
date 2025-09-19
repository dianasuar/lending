import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: number; // 0..100
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "h-2 w-full overflow-hidden rounded-full",
          "bg-white/10 border border-white/12 anime-card",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "h-full rounded-full",
            "bg-gradient-to-r from-[var(--magenta)] via-[var(--ink)] to-[var(--mint)]",
            "transition-[width] duration-300 ease-out"
          )}
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
