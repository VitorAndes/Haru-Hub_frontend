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
    setDataState((prev) => ({ ...prev, isLoading: true, error: null }));

    const [userResult, gamesResult, recentResult] = await Promise.allSettled([
      fetchUser(),
      fetchGames(),
      fetchRecentGames(),
    ]);

    setDataState((prev) => ({
      ...prev,
      playerProfile:
        userResult.status === "fulfilled" ? userResult.value : null,
      games: gamesResult.status === "fulfilled" ? gamesResult.value : [],
      recentGames:
        recentResult.status === "fulfilled" ? recentResult.value : [],

      isLoading: false,

      userError: userResult.status === "rejected" ? userResult.reason : null,
      gamesError: gamesResult.status === "rejected" ? gamesResult.reason : null,
      recentGamesError:
        recentResult.status === "rejected" ? recentResult.reason : null,
      error: null,
    }));
  }, []);

  useEffect(() => {
    console.log("useAppData effect rodou");
    fetchAllData();
  }, []);

  return { ...dataState, refetch: fetchAllData };
}
