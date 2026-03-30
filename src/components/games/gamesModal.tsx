import { XCircle } from "lucide-react";
import { useState } from "react";
import type { GamesType } from "../../api/fetchGames";
import placeholderImage from "../../assets/placeholder-game.webp";

type GamesModalProps = GamesType & {
  onClose: () => void;
};

export const GamesModal = ({
  name,
  header_image,
  short_description,
  genres,
  screenshots,
  onClose,
}: GamesModalProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="fixed inset-0 flex lg:items-center lg:justify-center z-50 lg:p-4"
      onClick={onClose}
    >
      <div
        className="bg-primary rounded-lg lg:max-w-2xl lg:h-[550px] overflow-y-auto shadow-lg border border-secondary/20 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            className="w-full h-64"
            src={imageError ? placeholderImage : header_image}
            alt={name || "Imagem do jogo"}
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <h1 className="font-title text-lg lg:text-2xl font-semibold text-secondary line-clamp-2">
              {name}
            </h1>

            {genres && genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {genres.slice(0, 4).map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-secondary/20 border border-secondary/30 rounded-lg text-sm text-text/90"
                  >
                    {genre.description}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="font-paragraph lg:text-md font-light leading-relaxed text-text/90">
              {short_description || "Descrição não disponível."}
            </p>
          </div>

          {screenshots && screenshots.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 overflow-hidden">
              {screenshots.slice(1, 4).map((screenshot) => (
                <img
                  key={screenshot.id}
                  src={screenshot.path_thumbnail}
                  alt="Screenshot do jogo"
                  className="rounded-md object-cover h-32 w-full lg:aspect-video hover:scale-105 transition-all duration-300"
                />
              ))}
            </div>
          )}
        </div>

        <button
          className="absolute top-1 right-1 p-2 hover:text-rose-500  rounded-full text-secondary transition-colors"
          type="button"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          <XCircle size={32} className="bg-backgroundPrimary/80 rounded-full" />
        </button>
      </div>
    </div>
  );
};
