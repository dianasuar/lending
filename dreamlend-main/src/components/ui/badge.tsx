import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold leading-none whitespace-nowrap",
  {
    variants: {
      variant: {
        default:
          "bg-white/10 text-white/90 border border-white/15",
        secondary:
          "bg-white/6 text-white/80 border border-white/12",
        pink:
          "bg-[var(--magenta)]/18 text-[var(--magenta)] border border-[var(--magenta)]/35",
        ink:
          "bg-[var(--ink)]/18 text-[var(--ink)] border border-[var(--ink)]/35",
        success:
          "bg-emerald-500/15 text-emerald-300 border border-emerald-400/30",
        warning:
          "bg-amber-500/15 text-amber-300 border border-amber-400/30",
        danger:
          "bg-rose-500/15 text-rose-300 border border-rose-400/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
