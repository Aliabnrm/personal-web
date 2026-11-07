import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
export function Badge({
  children,
  outlined = false,
}: {
  children: ReactNode;
  outlined?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-md border border-transparent bg-accent px-[10px] py-[3px] text-xs leading-[1.95] text-primary",
        outlined && "border-primary",
      )}
    >
      {children}
    </span>
  );
}
