import { useCallback, useState } from "react";
import type { GamesType } from "../../api/fetchGames";
import { useAppDataContext } from "../../context/AppDataProvider";
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
  const { games, isLoading, gamesError, refetch } =
    useAppDataContext();
  const filteredGames = useGameFilter(games, filterSearch);
  const [selectedGame, setSelectedGame] =
    useState<GamesType | null>(null);
  const [isModalVisible, setIsModalVisible] =
    useState(false);

  const openModal = useCallback((game: GamesType) => {
    setSelectedGame(game);
    setIsModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
    setTimeout(() => {
      setSelectedGame(null);
    }, 300);
  }, []);

  if (gamesError) {
    return (
      <ErrorState error={gamesError} onRetry={refetch} />
    );
  }

  if (!isLoading && filteredGames.length === 0) {
    return (
      <EmptyState
        hasSearch={Boolean(filterSearch.trim())}
      />
    );
  }

  return (
    <>
      <div className="w-full grid lg:grid-cols-3 gap-5">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <LoadingState
                key={index}
                className="w-full h-40 lg:h-60"
              />
            ))
          : filteredGames.map((game) => {
              return (
                <GamesCard
                  key={game.steam_appid}
                  game={game}
                  onOpenModal={openModal}
                />
              );
            })}
      </div>

      <div
        className={`
          fixed inset-0 z-40 flex items-center justify-center
          bg-black/50 backdrop-blur-sm
          transition-opacity duration-200
          ${isModalVisible && selectedGame ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        <div
          className={`
            w-full h-full flex items-center justify-center
            transition-all duration-300 ease-out
            ${
              isModalVisible && selectedGame
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-4"
            }
          `}
        >
          {selectedGame && (
            <GamesModal
              {...selectedGame}
              onClose={closeModal}
            />
          )}
        </div>
      </div>
    </>
  );
}
