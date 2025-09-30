import { useCallback, useEffect, useState } from "react";
import { fetchGames, GamesType } from "../api/fetchGames";
import { fetchRecentGames, RecentGamesType } from "../api/fetchRecentGames";
import { fetchUser, UserProfileType } from "../api/fetchUser";

interface AppDataState {
  playerProfile: UserProfileType | null;
  games: GamesType[];
  recentGames: RecentGamesType[];

  isLoading: boolean;
  userError: string | null;
  gamesError: string | null;
  recentGamesError: string | null;
  error: string | null;
}

export function useAppData() {
  const [dataState, setDataState] = useState<AppDataState>({
    playerProfile: null,
    games: [],
    recentGames: [],
    isLoading: true,
    userError: null,
    gamesError: null,
    recentGamesError: null,
    error: null,
  });

  const fetchAllData = useCallback(async () => {
    setDataState((prev) => ({
      ...prev,
      isLoading: true,
      userError: null,
      gamesError: null,
      recentGamesError: null,
      error: null,
    }));

    const [userResult, gamesResult, recentResult] = await Promise.allSettled([
      fetchUser(),
      fetchGames(),
      fetchRecentGames(),
    ]);

    setDataState({
      playerProfile:
        userResult.status === "fulfilled" ? userResult.value : null,
      games: gamesResult.status === "fulfilled" ? gamesResult.value : [],
      recentGames:
        recentResult.status === "fulfilled" ? recentResult.value : [],
      isLoading: false,
      userError:
        userResult.status === "rejected"
          ? userResult.reason instanceof Error
            ? userResult.reason.message
            : String(userResult.reason)
          : null,
      gamesError:
        gamesResult.status === "rejected"
          ? gamesResult.reason instanceof Error
            ? gamesResult.reason.message
            : String(gamesResult.reason)
          : null,
      recentGamesError:
        recentResult.status === "rejected"
          ? recentResult.reason instanceof Error
            ? recentResult.reason.message
            : String(recentResult.reason)
          : null,
      error: null,
    });
  }, []);

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log("useAppData: Carregando dados...");
    }
    fetchAllData();
  }, [fetchAllData]);

  return { ...dataState, refetch: fetchAllData };
}
