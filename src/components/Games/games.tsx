import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { GamesType, useGamesData } from "../../hooks/useGame";
import { useGameFilter } from "../../hooks/useGameFilter";
import { EmptyState } from "../common/emptyState";
import { ErrorState } from "../common/errorState";
import { LoadingState } from "../common/loadingState";
import { GamesCard } from "./gamesCard";
import { GamesModal } from "./gamesModal";

interface CardGameProps {
  filterSearch: string;
}

export function Games({ filterSearch }: CardGameProps) {
  const { games, isLoading, error, refetch } = useGamesData();
  const filteredGames = useGameFilter(games, filterSearch);
  const [selectedGame, setSelectedGame] = useState<GamesType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback((game: GamesType) => {
    setSelectedGame(game);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedGame(null);
    document.body.style.overflow = "unset";
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (isLoading) {
    return <LoadingState className=" lg:w-[1280px]" />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  if (filteredGames.length === 0) {
    return <EmptyState hasSearch={Boolean(filterSearch.trim())} />;
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
        {filteredGames.map((game) => (
          <GamesCard
            key={game.steam_appid}
            game={game}
            onOpenModal={openModal}
          />
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                duration: 0.1,
                ease: "easeOut",
              }}
              className="w-full h-full "
            >
              <GamesModal {...selectedGame} onClose={closeModal} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
