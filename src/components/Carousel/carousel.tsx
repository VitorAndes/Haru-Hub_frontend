import imgLoading from "../../assets/placeholder-game.webp";
import { GameDataType } from "../../hooks/useRecentlyPlayedGames";

const MAX_SCREENSHOTS = 2;

export function Carousel({ game }: { game: GameDataType }) {
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
      className="flex flex-col lg:flex-row gap-2 flex-shrink-0 ml-0 lg:ml-6"
    >
      <figure className="w-[440px] lg:w-[800px] relative">
        <img
          loading="lazy"
          className="rounded-b-2xl lg:rounded-2xl shadow shadow-secondary bg-primary/80 w-full h-[204px] lg:h-[490px]"
          src={header_image || imgLoading}
          alt={`Imagem de ${name}`}
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = imgLoading;
          }}
        />

        <div className="flex gap-x-1 absolute right-3 bottom-6 font-bold">
          {genres.slice(0, 3).map((genre) => (
            <span
              key={genre.id}
              className="bg-primary/80 rounded-lg border border-secondary py-2 px-4 backdrop-blur drop-shadow  text-xs md:text-sm"
            >
              {genre.description}
            </span>
          ))}
        </div>
      </figure>

      <div className="flex flex-col gap-4 h-[160px] lg:h-full w-[440px]">
        <div className="p-3 lg:bg-primary/25 lg:backdrop-blur lg:shadow-md lg:shadow-secondary rounded-2xl lg:overflow-hidden h-56">
          <h1 className="font-title text-2xl font-semibold text-accent line-clamp-2">
            {name}
          </h1>
          <p className="font-paragraph mt-2 text-text leading-relaxed text-sm line-clamp-4">
            {short_description}
          </p>
        </div>

        <figure className="hidden lg:block w-full h-[230px] overflow-hidden xl:overflow-visible gap-2">
          {screenshots.slice(1, MAX_SCREENSHOTS).map((screenshot) => (
            <img
              key={screenshot.id}
              className="w-full rounded-2xl shadow shadow-secondary bg-primary/80 object-cover"
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
