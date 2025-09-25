import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export function LoadingState({
  className,
  loadingTitle = "jogos",
}: {
  className?: string;
  loadingTitle?: string;
}) {
  return (
    <div
      className={cn("flex items-center justify-center h-[470px]", className)}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin" />
        <p className="text-text">Carregando {loadingTitle}...</p>
      </div>
    </div>
  );
}
