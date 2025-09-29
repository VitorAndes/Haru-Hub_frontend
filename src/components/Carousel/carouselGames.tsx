import { useAppDataContext } from "../../context/AppDataProvider";
import { useCarousel } from "../../hooks/useCarousel";
import { ErrorState } from "../common/errorState";
import { LoadingState } from "../common/loadingState";
import { Carousel } from "./carousel";
import { CarouselControls } from "./carouselControls";

export function CarouselGames() {
  const { recentGames, isLoading, recentGamesError, refetch } =
    useAppDataContext();
  const { current, previousSlide, nextSlide, goToSlide } = useCarousel(
    recentGames.length
  );

  if (recentGamesError) {
    return (
      <div className="flex flex-col items-center gap-4 max-w-7xl">
        <ErrorState error={recentGamesError} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:items-center gap-4 w-full lg:max-w-[1280px] overflow-hidden">
      <h1 className="hidden lg:block font-title text-xl font-semibold self-start mb-5">
        Jogados recentemente
      </h1>

      {isLoading ? (
        <LoadingState className="lg:w-[1280px]" />
      ) : (
        <>
          <div
            className="flex transition-all ease-in-out duration-500 max-w-[800px] lg:max-w-[1280px]"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {recentGames.map((game) => (
              <Carousel key={game.steam_appid} game={game} />
            ))}
          </div>

          <CarouselControls
            games={recentGames}
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
