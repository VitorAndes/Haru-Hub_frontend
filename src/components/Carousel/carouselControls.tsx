import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import { GamesType } from "../../api/fetchGames";

export function CarouselControls({
  games,
  current,
  onPrevious,
  onNext,
  onGoTo,
}: {
  games: GamesType[];
  current: number;
  onPrevious: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
}) {
  return (
    <div className="flex items-center gap-4 px-7 lg:px-0 lg:mt-4">
      <button
        className="hidden lg:block hover:text-secondary rounded-full transition-all hover:scale-105 hover:-translate-x-2 duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onPrevious}
        disabled={games.length === 0}
        type="button"
        aria-label="Slide anterior"
      >
        <ChevronLeftCircle size={32} />
      </button>

      <div className="flex items-center gap-2">
        {games.map((_, i) => (
          <button
            key={`dot-${i}`}
            onClick={() => onGoTo(i)}
            className={`rounded-full cursor-pointer h-4 transition-all duration-700 hover:opacity-40 ${
              i === current ? "bg-secondary w-20" : "bg-white w-4"
            }`}
            aria-label={`Ir para slide ${i + 1}`}
          />
        ))}
      </div>

      <button
        className="hidden lg:block hover:text-secondary rounded-full transition-all hover:scale-105 hover:translate-x-2 duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onNext}
        disabled={games.length === 0}
        type="button"
        aria-label="Próximo slide"
      >
        <ChevronRightCircle size={32} />
      </button>
    </div>
  );
}
