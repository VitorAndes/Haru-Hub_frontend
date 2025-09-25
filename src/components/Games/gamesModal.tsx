import { XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import placeholderImage from "../../assets/placeholder-game.webp";
import { Games } from "../../hooks/useGame";

type GamesModalProps = Games & {
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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-primary rounded-2xl max-w-[90vw] h-fit  lg:max-w-2xl lg:w-full lg:max-h-[90vh] overflow-hidden shadow-2xl border border-secondary/20"
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
            <h1 className="font-title text-3xl font-semibold text-accent line-clamp-2">
              {name}
            </h1>

            {genres && genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {genres.slice(0, 4).map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-secondary/20 border border-secondary/30 rounded-full text-sm text-text/90"
                  >
                    {genre.description}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="max-h-24 lg:max-h-32 overflow-y-auto">
            <p className="font-paragraph text-lg font-light leading-relaxed text-text/90">
              {short_description || "Descrição não disponível."}
            </p>
          </div>

          {screenshots && screenshots.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-accent">Screenshots</h3>
              <div className="grid grid-cols-1 gap-2 max-h-60 overflow-hidden">
                {screenshots.slice(0, 1).map((screenshot) => (
                  <img
                    key={screenshot.id}
                    src={screenshot.path_thumbnail}
                    alt="Screenshot do jogo"
                    className="rounded-lg object-cover w-full h-60 hover:scale-105 transition-transform"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          className="absolute top-12 right-9 lg:top-4 lg:right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
          type="button"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          <XCircle size={24} />
        </button>
      </div>
    </div>
  );
};
