import { useMemo } from "react";
import { GamesType } from "./useGame";

export function useGameFilter(games: GamesType[], filterSearch: string) {
  return useMemo(() => {
    if (!filterSearch.trim()) return games;

    return games.filter((game) =>
      game.name.toLowerCase().includes(filterSearch.toLowerCase())
    );
  }, [games, filterSearch]);
}
