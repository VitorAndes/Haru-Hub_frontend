import { RecentGamesType } from "../../api/fetchRecentGames";
import imgLoading from "../../assets/placeholder-game.webp";

const MAX_SCREENSHOTS = 2;

export function Carousel({ game }: { game: RecentGamesType }) {
  const {
    steam_appid,
    header_image,
    genres,
    name,
    screenshots,
    short_description,
  } = game;

  return (
    <div
      key={steam_appid}
      className="flex flex-col lg:flex-row w-full flex-shrink-0"
    >
      <figure className="w-full lg:max-w-[800px] relative">
        <img
          className="rounded-b-2xl lg:rounded-2xl shadow shadow-secondary bg-primary/80 w-full h-auto aspect-video "
          src={header_image || imgLoading}
          alt={`Imagem de ${name}`}
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = imgLoading;
          }}
        />

        <div className="flex flex-wrap gap-1 absolute right-3 bottom-3 font-bold">
          {genres.slice(0, 3).map((genre) => (
            <span
              key={genre.id}
              className="bg-primary/80 rounded-lg border border-secondary py-1 px-3 backdrop-blur drop-shadow text-xs md:text-sm"
            >
              {genre.description}
            </span>
          ))}
        </div>
      </figure>

      <div className="flex flex-1 flex-col gap-4 h-auto lg:h-full w-full lg:max-w-[460px] px-4">
        <div className="flex-1 p-3 lg:bg-primary/25 lg:backdrop-blur lg:shadow-md lg:shadow-secondary rounded-2xl lg:overflow-hidden">
          <h1 className="font-title text-xl md:text-2xl font-semibold text-accent line-clamp-2">
            {name}
          </h1>
          <p className="font-paragraph mt-2 text-text leading-relaxed text-sm md:text-base line-clamp-4">
            {short_description}
          </p>
        </div>

        <figure className="hidden lg:grid grid-cols-1 gap-2 w-full">
          {screenshots.slice(1, MAX_SCREENSHOTS).map((screenshot) => (
            <img
              key={screenshot.id}
              className="w-full h-auto rounded-2xl shadow shadow-secondary bg-primary/80 object-cover aspect-video"
              src={screenshot.path_thumbnail}
              alt={`Screenshot de ${name}`}
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = imgLoading;
              }}
            />
          ))}
        </figure>
      </div>
    </div>
  );
}
