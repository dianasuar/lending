import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "w-full min-h-[96px] rounded-xl p-3 leading-snug",
          "bg-white/5 border border-white/12 text-white placeholder:text-white/50",
          "backdrop-saturate-125 outline-none ring-0 transition-colors",
          "focus:border-[var(--ink)] focus:shadow-[0_0_0_3px_rgba(14,239,255,.15)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
