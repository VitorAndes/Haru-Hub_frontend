import type { SyntheticEvent } from "react";
import type { RecentGamesType } from "../../api/fetchRecentGames";
import imgLoading from "../../assets/placeholder-game.webp";

const MAX_GENRES = 3;
const MAX_SCREENSHOTS = 2;
const FIRST_SCREENSHOT_INDEX = 1;

type CarouselProps = {
  game: RecentGamesType;
};

const setFallbackImage = (
  event: SyntheticEvent<HTMLImageElement>,
) => {
  event.currentTarget.src = imgLoading;
};

export function Carousel({ game }: CarouselProps) {
  const {
    header_image,
    genres,
    name,
    screenshots,
    short_description,
  } = game;
  const visibleGenres = genres.slice(0, MAX_GENRES);
  const visibleScreenshots = screenshots.slice(
    FIRST_SCREENSHOT_INDEX,
    MAX_SCREENSHOTS,
  );

  return (
    <div className="flex w-full flex-shrink-0 flex-col gap-2 lg:flex-row">
      <figure className="flex-1 relative">
        <img
          loading="lazy"
          fetchPriority="high"
          className=" rounded-b-2xl lg:rounded-lg shadow shadow-secondary bg-primary/80 w-full h-full "
          src={header_image || imgLoading}
          alt={`Imagem de ${name}`}
          onError={setFallbackImage}
        />

        <div className="flex flex-wrap gap-1 absolute right-3 bottom-3 font-bold">
          {visibleGenres.map((genre) => (
            <span
              key={genre.id}
              className="px-3 py-1 bg-backgroundPrimary/70 border border-secondary/80 backdrop-blur-sm rounded-md text-xs text-text/90"
            >
              {genre.description}
            </span>
          ))}
        </div>
      </figure>

      <div className="flex flex-col flex-1 gap-4 max-w-96">
        <div className="w-full p-3 px-0 lg:p-3 lg:bg-primary/25 lg:backdrop-blur lg:shadow-md lg:shadow-secondary rounded-lg lg:overflow-hidden flex-1">
          <h1 className="font-title text-md md:text-lg font-semibold text-secondary line-clamp-2">
            {name}
          </h1>
          <p className="font-paragraph mt-2 text-text leading-relaxed text-xs line-clamp-4">
            {short_description}
          </p>
        </div>

        <figure className="hidden lg:flex flex-1">
          {visibleScreenshots.map((screenshot) => (
            <img
              key={screenshot.id}
              className="w-full h-auto rounded-lg shadow shadow-secondary bg-primary/80 object-cover aspect-video"
              src={screenshot.path_thumbnail}
              alt={`Screenshot de ${name}`}
              onError={setFallbackImage}
            />
          ))}
        </figure>
      </div>
    </div>
  );
}
