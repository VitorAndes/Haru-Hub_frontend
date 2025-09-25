import { useCarousel } from "../../hooks/useCarousel";
import { useRecentlyPlayedGames } from "../../hooks/useRecentlyPlayedGames";
import { ErrorState } from "../common/errorState";
import { LoadingState } from "../common/loadingState";
import { CarouselControls } from "./carouselControls";
import { GameCarousel } from "./gameCarousel";

export function GamesRecently() {
  const { games, isLoading, error, refetch } = useRecentlyPlayedGames();
  const { current, previousSlide, nextSlide, goToSlide } = useCarousel(
    games.length
  );

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 max-w-7xl">
        <ErrorState error={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:items-center gap-4 w-[440px] lg:w-[1280px] overflow-hidden">
      <h1 className="hidden lg:block font-title text-xl font-semibold self-start mb-5">
        Jogados recentemente
      </h1>

      {isLoading ? (
        <LoadingState className="lg:w-[1280px]" />
      ) : (
        <>
          <div
            className="flex lg:gap-2 transition-all ease-out duration-700 w-[440px] lg:w-[1280px]"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {games.map((game) => (
              <GameCarousel key={game.steam_appid} game={game} />
            ))}
          </div>

          <CarouselControls
            games={games}
            current={current}
            onPrevious={previousSlide}
            onNext={nextSlide}
            onGoTo={goToSlide}
          />
        </>
      )}
    </div>
  );
}
