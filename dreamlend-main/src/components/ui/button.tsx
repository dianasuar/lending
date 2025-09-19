import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Minimal, anime-friendly button
 * - inline-flex centers icon + text
 * - whitespace-nowrap prevents label overflow
 * - leading-none avoids text poking out vertically
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap leading-none font-semibold rounded-xl transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-0",
  {
    variants: {
      variant: {
        /** NEW: neutral, non-shiny default */
        default:
          "bg-neutral-800 text-white border border-white/15 hover:bg-neutral-700 shadow-none",

        /** Optional accent you can use where you really want color */
        primary:
          "bg-cyan-400 text-slate-900 hover:bg-cyan-300 active:bg-cyan-200 border border-white/10 shadow-none",

        /** Keep your original themed variants if you still use them */
        pink: "bg-pink-400 text-black hover:bg-pink-300 border border-white/10",
        violet:
          "bg-violet-600 text-white hover:bg-violet-500 border border-white/10",
        sun: "bg-amber-300 text-black hover:bg-amber-200 border border-white/10",
        mint:
          "bg-emerald-300 text-black hover:bg-emerald-200 border border-white/10",

        outline:
          "bg-transparent text-white border border-white/30 hover:border-cyan-300/60",
        /** Better ghost on dark: faint tint + border so it never disappears */
        ghost:
          "bg-transparent text-white/90 border border-white/20 hover:bg-white/5 hover:border-white/30",
        link: "bg-transparent underline-offset-4 hover:underline text-cyan-300",
      },
      size: {
        default: "h-9 px-4 text-[12px]",
        sm: "h-8 px-3 text-[11px]",
        lg: "h-10 px-5 text-[13px]",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default", // <-- neutral by default (no neon)
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
