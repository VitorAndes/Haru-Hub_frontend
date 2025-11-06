import { useCallback, useEffect, useRef, useState } from "react";
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
  const { games, isLoading, gamesError, refetch } = useAppDataContext();
  const filteredGames = useGameFilter(games, filterSearch);
  const [selectedGame, setSelectedGame] = useState<GamesType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const timeoutRef = useRef(null);

  const openModal = useCallback((game: GamesType) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setSelectedGame(game);
    setIsModalOpen(true);

    requestAnimationFrame(() => {
      setIsModalVisible(true);
    });
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsModalVisible(false);

    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedGame(null);
    }, 1000);
    document.body.style.overflow = "unset";
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (gamesError) {
    return <ErrorState error={gamesError} onRetry={refetch} />;
  }

  if (!isLoading && filteredGames.length === 0) {
    return <EmptyState hasSearch={Boolean(filterSearch.trim())} />;
  }

  return (
    <>
      <div className="w-full flex flex-col lg:grid lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <LoadingState key={index} className="lg:w-[400px] h-40 lg:h-60" />
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

      {isModalOpen && selectedGame && (
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-100 ${
            isModalVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`w-full h-full transition-all duration-300 ease-out ${
              isModalVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          >
            <GamesModal {...selectedGame} onClose={closeModal} />
          </div>
        </div>
      )}
    </>
  );
}
