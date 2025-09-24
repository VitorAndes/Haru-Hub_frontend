import { useMemo } from "react";
import { Games } from "./useGame";

export function useGameFilter(games: Games[], filterSearch: string) {
  return useMemo(() => {
    if (!filterSearch.trim()) return games;

    return games.filter((game) =>
      game.name.toLowerCase().includes(filterSearch.toLowerCase())
    );
  }, [games, filterSearch]);
}
