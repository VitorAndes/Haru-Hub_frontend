import { XCircle } from "lucide-react";
import { useState } from "react";
import type { GamesType } from "../../api/fetchGames";
import placeholderImage from "../../assets/placeholder-game.webp";
import { Badge } from "../common/badge";

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
        className="bg-primary rounded-lg lg:max-w-xl lg:max-h-[620px] overflow-y-auto shadow-lg border border-secondary/20 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            className="w-full h-64"
            src={
              imageError ? placeholderImage : header_image
            }
            alt={name || "Imagem do jogo"}
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
          {genres && genres.length > 0 && (
            <div className="flex flex-wrap gap-2 absolute bottom-3 left-6">
              {genres.map((genre) => (
                <Badge key={genre.id}>
                  {genre.description}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 space-y-5">
          <h1 className="font-title text-xl font-semibold text-secondary line-clamp-2">
            {name}
          </h1>

          <div>
            <p className="font-paragraph text-sm font-light leading-relaxed text-text/80">
              {short_description ||
                "Descrição não disponível."}
            </p>
          </div>

          {screenshots && screenshots.length > 0 && (
            <div className="flex gap-3 overflow-x-auto overflow-y-hidden">
              {screenshots.map((screenshot) => (
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
          className="absolute top-1 right-1 p-2 hover:text-rose-500 hover:scale-105 active:scale-95 rounded-full text-secondary duration-300 transition-colors"
          type="button"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          <XCircle
            size={32}
            className="bg-backgroundPrimary/80 rounded-full"
          />
        </button>
      </div>
    </div>
  );
};
