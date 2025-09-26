import { useState } from "react";
import placeholderImage from "../../assets/placeholder-game.webp";
import { GamesType } from "../../hooks/useGame";

export function GamesCard({
  game,
  onOpenModal,
}: {
  game: GamesType;
  onOpenModal: (game: GamesType) => void;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <figure
      className="w-[410px] lg:w-[400px] lg:h-60 relative group cursor-pointer"
      onClick={() => onOpenModal(game)}
    >
      <div className="relative w-full h-full overflow-hidden rounded-2xl bg-primary/80">
        <img
          className="w-full h-full transition-all duration-300 group-hover:scale-105"
          src={imageError ? placeholderImage : game.header_image}
          alt={game.name || "Jogo sem nome"}
          loading="lazy"
          onError={() => setImageError(true)}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <h3 className="text-white font-semibold text-lg line-clamp-2 drop-shadow-lg">
            {game.name}
          </h3>
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-secondary transition-colors duration-300" />
    </figure>
  );
}
