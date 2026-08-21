import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-32 w-full rounded-lg border border-border bg-elevated px-4 py-3 text-base text-fg shadow-[var(--shadow-border)] transition-[border-color,box-shadow] duration-150 placeholder:text-subtle focus-visible:border-fg/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:opacity-40 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
