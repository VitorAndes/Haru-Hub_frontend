import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { GamesModal } from "./GamesModal";

export type Games = {
  name: string | null;
  steam_appid: number;
  header_image: string;
  short_description: string;
};

interface ApiResponse {
  [key: string]: { data: Games };
}

interface CardGameProps {
  filterSearch: string;
}

export function CardGame({ filterSearch }: CardGameProps) {
  const [games, setGames] = useState<Games[]>([]);
  const [filteredGames, setFilteredGames] = useState<Games[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState<Games | null>(null);

  const [isAnimating, setIsAnimating] = useState(false);

  const url = "https://haru-hub-backend.onrender.com/";

  useEffect(() => {
    const controller = new AbortController();

    async function fetchGames() {
      try {
        setIsLoading(true);
        const response = await fetch(`${url}games`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Erro ao buscar os jogos: ${response.status} ${response.statusText}`
          );
        }

        const data: ApiResponse = await response.json();

        if (!data || typeof data !== "object") {
          throw new Error("Formato de resposta inválido");
        }

        const allGames = Object.values(data).map((item) => item.data);
        setGames(allGames);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.log("Requisição cancelada");
          return;
        }
        console.error("Erro ao buscar os jogos:", error);
        setError(error instanceof Error ? error.message : "Erro desconhecido");
      } finally {
        setIsLoading(false);
      }
    }

    fetchGames();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (filterSearch.trim() != "") {
      const filteredGames = games.filter((game) =>
        game.name?.toLowerCase().includes(filterSearch.toLowerCase())
      );
      setFilteredGames(filteredGames);
    } else {
      setFilteredGames(games);
    }
  }, [filterSearch, games]);

  const openModal = (game: Games) => {
    setSelectedGame(game);
    setIsAnimating(true);
  };

  const closeModal = () => {
    setIsAnimating(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary" />
      </div>
    );
  }

  if (error) {
    return null;
  }

  if (filteredGames.length === 0) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="p-4 bg-primary/80 border border-slate-400 backdrop-blur">
          <p>Nenhum jogo encontrado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-5 flex-wrap">
      {filteredGames.map((game) => (
        <figure
          key={game.steam_appid}
          className="w-[400px] h-60 relative"
          onClick={() => openModal(game)}
        >
          {game.header_image ? (
            <img
              className="rounded-2xl bg-primary/80 w-full h-full hover:scale-105 hover:border-secondary hover:-translate-y-2 active:scale-95 active:translate-y-2 duration-300 cursor-pointer transition-all shadow-md shadow-secondary"
              src={game.header_image}
              alt={game.name || "Jogo sem nome"}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "../../assets/placeholder-game.webp";
                e.currentTarget.alt = "Imagem não disponível";
              }}
            />
          ) : (
            <div className="rounded-2xl border bg-primary border-text w-full h-full flex items-center justify-center">
              <p className="text-gray-400">Imagem não disponível</p>
            </div>
          )}
        </figure>
      ))}

      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-primary/80"
            key="modal"
          >
            <GamesModal
              short_description={selectedGame?.short_description ?? ""}
              name={selectedGame?.name ?? null}
              steam_appid={selectedGame?.steam_appid ?? 0}
              header_image={selectedGame?.header_image ?? ""}
              onClose={closeModal}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
