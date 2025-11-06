import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export function LoadingState({ className }: { className?: string }) {
  return <div className={cn("skeleton-shimmer rounded-xl", className)} />;
}
