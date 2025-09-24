import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { Games, useGamesData } from "../../hooks/useGame";
import { useGameFilter } from "../../hooks/useGameFilter";
import { EmptyState } from "../common/emptyState";
import { ErrorState } from "../common/errorState";
import { LoadingState } from "../common/loadingState";
import { GameCard } from "./gameCard";
import { GamesModal } from "./gamesModal";

interface CardGameProps {
  filterSearch: string;
}

export function CardGame({ filterSearch }: CardGameProps) {
  const { games, isLoading, error, refetch } = useGamesData();
  const filteredGames = useGameFilter(games, filterSearch);
  const [selectedGame, setSelectedGame] = useState<Games | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback((game: Games) => {
    setSelectedGame(game);
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedGame(null);
    // Restore body scroll
    document.body.style.overflow = "unset";
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  if (filteredGames.length === 0) {
    return <EmptyState hasSearch={Boolean(filterSearch.trim())} />;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {filteredGames.map((game) => (
          <GameCard
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              className="w-full h-full flex items-center justify-center"
            >
              <GamesModal {...selectedGame} onClose={closeModal} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
