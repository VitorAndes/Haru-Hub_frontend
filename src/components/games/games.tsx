import { useCallback, useRef, useState } from "react";
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const frameRef = useRef<number | null>(null);

  const isModalOpen = selectedGame !== null;

  const openModal = useCallback((game: GamesType) => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    setSelectedGame(game);
    setIsModalVisible(false);

    frameRef.current = requestAnimationFrame(() => {
      setIsModalVisible(true);
      frameRef.current = null;
    });

    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleModalTransitionEnd = useCallback(() => {
    if (isModalVisible) {
      return;
    }

    setSelectedGame(null);
    document.body.style.overflow = "unset";
  }, [isModalVisible]);

  if (gamesError) {
    return <ErrorState error={gamesError} onRetry={refetch} />;
  }

  if (!isLoading && filteredGames.length === 0) {
    return <EmptyState hasSearch={Boolean(filterSearch.trim())} />;
  }

  return (
    <>
      <div className="w-full grid lg:grid-cols-3 gap-5">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <LoadingState key={index} className="w-[350px] h-40 lg:h-60" />
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
            onTransitionEnd={handleModalTransitionEnd}
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
