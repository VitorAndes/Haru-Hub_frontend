import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import { useEffect, useState } from "react";
import imgLoading from "../assets/placeholder-game.webp";

type GenreType = Record<"id" | "description", string>;
type screenshotsType = {
  id: number;
  path_thumbnail: string;
};

type GamesRecentlyType = Record<
  "short_description" | "header_image" | "name",
  string
> & {
  steam_appid: number;
  genres: GenreType[];
  screenshots: screenshotsType[];
  playtime_forever: number;
};

interface ApiResponse {
  data: GamesRecentlyType;
}

export function GamesRecently() {
  const [current, setCurrent] = useState(0);
  const [carouselGames, setGamesRecently] = useState<GamesRecentlyType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const totalSlides = carouselGames.length;

  const url = "https://haru-hub-backend.onrender.com/";

  const previousSlide = () => {
    if (current === 0) setCurrent(totalSlides - 1);
    else setCurrent(current - 1);
  };
  const nextSlide = () => {
    if (current === totalSlides - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  useEffect(() => {
    async function fetchRecentlyPlayedGames() {
      try {
        setIsLoading(true);
        const response = await fetch(`${url}recentlyPlayedGames`);

        if (!response.ok) {
          throw new Error("Erro ao buscar os jogos");
        }

        const data: ApiResponse = await response.json();
        const gamesRecently = Object.values(data)
          .map((item) => item.data)
          .reverse();
        setGamesRecently(gamesRecently);
      } catch (error) {
        console.error("Erro ao buscar os jogos:", error);
        setError(error instanceof Error ? error.message : "Erro desconhecido");
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecentlyPlayedGames();
  }, []);

  if (error) {
    return <div>Erro: {error}</div>;
  }

  useEffect(() => {
    if (totalSlides === 0) return;

    const timeout = setTimeout(() => {
      if (current === totalSlides - 1) setCurrent(0);
      else setCurrent(current + 1);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [totalSlides, current]);

  return (
    <div className="flex flex-col items-center gap-4 w-[1280px] overflow-hidden">
      <h1 className="font-title text-xl font-semibold self-start mb-5">
        Jogados recentemente
      </h1>
      <div
        className={"flex gap-2 transition-all ease-out duration-700 w-[1280px]"}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {carouselGames.map(
          ({
            steam_appid,
            header_image,
            genres,
            name,
            screenshots,
            short_description,
            playtime_forever,
          }) => {
            return (
              <div key={steam_appid} className="flex gap-2 flex-shrink-0">
                <figure className="max-w-3xl relative">
                  <img
                    loading="lazy"
                    className="rounded-2xl shadow shadow-secondary bg-primary/80 w-full h-[470px]"
                    src={`${isLoading ? imgLoading : header_image}`}
                    alt="Foto destaque do jogo"
                  />

                  <div className="flex gap-x-1 absolute right-3 bottom-6 font-bold">
                    {genres.slice(0, 3).map((genre) => {
                      return (
                        <span
                          key={genre.id}
                          className="bg-primary/80 rounded-lg border border-secondary py-2 px-4 backdrop-blur drop-shadow"
                        >
                          {genre.description}
                        </span>
                      );
                    })}
                  </div>
                </figure>

                <div className="flex flex-col gap-4 h-full w-[460px]">
                  <div className="p-3 bg-primary/25 backdrop-blur shadow-md shadow-secondary  rounded-2xl overflow-hidden h-56 ">
                    <h1 className="font-title text-2xl font-semibold text-accent">
                      {name}
                    </h1>
                    <p className="font-paragraph mt-2 text-text">
                      {short_description}
                    </p>
                    <span>{playtime_forever}</span>
                  </div>
                  <figure className="flex w-full h-[230px] overflow-hidden xl:overflow-visible gap-2">
                    {screenshots.slice(1, 2).map((screenshot) => {
                      return (
                        <img
                          key={screenshot.id}
                          className="w-full rounded-2xl shadow shadow-secondary bg-primary/80"
                          src={screenshot.path_thumbnail}
                          alt="Fotos dentro do jogo"
                        />
                      );
                    })}
                  </figure>
                </div>
              </div>
            );
          }
        )}
      </div>

      <div className="flex items-center gap-4 mt-4">
        <button
          className="hover:text-secondary rounded-full transition-all hover:scale-105 hover:-translate-x-2 duration-300"
          onClick={previousSlide}
          type="button"
        >
          <ChevronLeftCircle size={32} />
        </button>
        <div className="flex items-center gap-2">
          {carouselGames.map((_, i) => {
            return (
              // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
              <div
                onClick={() => {
                  setCurrent(i);
                }}
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={`circle ${i}`}
                className={`rounded-full cursor-pointer size-4 transition-all duration-700 hover:opacity-40 ${
                  i === current ? "bg-secondary w-20" : "bg-white"
                }`}
              />
            );
          })}
        </div>
        <button
          className="hover:text-secondary rounded-full transition-all hover:scale-105 hover:translate-x-2 duration-300"
          onClick={nextSlide}
          type="button"
        >
          <ChevronRightCircle size={32} />
        </button>
      </div>
    </div>
  );
}
