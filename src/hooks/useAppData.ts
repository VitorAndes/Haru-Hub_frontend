import { useCallback, useEffect, useRef, useState } from "react";
import { GamesType, fetchGames } from "../api/fetchGames";
import { RecentGamesType, fetchRecentGames } from "../api/fetchRecentGames";
import { UserProfileType, fetchUser } from "../api/fetchUser";

type AppDataState = {
  playerProfile: UserProfileType | null;
  games: GamesType[];
  recentGames: RecentGamesType[];
  isLoading: boolean;
  userError: string | null;
  gamesError: string | null;
  recentGamesError: string | null;
  error: string | null;
};

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

  const hasFetched = useRef(false);

  const fetchAllData = useCallback(async () => {
    setDataState((prev) => ({
      ...prev,
      isLoading: true,
      userError: null,
      gamesError: null,
      recentGamesError: null,
      error: null,
    }));

    if (import.meta.env.DEV) {
      console.log(" Iniciando fetch de dados...");
    }

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

    if (import.meta.env.DEV) {
      console.log("Fetch concluído");
    }
  }, []);

  useEffect(() => {
    if (hasFetched.current) {
      if (import.meta.env.DEV) {
        console.log("useAppData: Fetch já executado, pulando...");
      }
      return;
    }

    hasFetched.current = true;

    if (import.meta.env.DEV) {
      console.log("useAppData: Primeira execução");
    }

    fetchAllData();
  }, [fetchAllData]);

  return { ...dataState, refetch: fetchAllData };
}
