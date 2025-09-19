import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // anime input: glass, neon focus
          "w-full h-10 px-3 rounded-xl",
          "bg-white/5 border border-white/12 text-white placeholder:text-white/50",
          "backdrop-saturate-125",
          "outline-none ring-0",
          "transition-colors",
          "focus:border-[var(--ink)] focus:shadow-[0_0_0_3px_rgba(14,239,255,.15)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "leading-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
