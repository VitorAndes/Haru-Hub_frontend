import { useCallback, useEffect, useState } from "react";

const API_BASE_URL = "https://haru-hub-backend.onrender.com";

export type GenreType = {
  id: string;
  description: string;
};

export type ScreenshotType = {
  id: number;
  path_thumbnail: string;
};

export type GameDataType = {
  steam_appid: number;
  short_description: string;
  header_image: string;
  name: string;
  genres: GenreType[];
  screenshots: ScreenshotType[];
};

export type GameResponseType = {
  success: boolean;
  data: GameDataType;
};

export type ApiResponse = {
  totalGames: number;
  games: Record<string, GameResponseType>;
};

export function useRecentlyPlayedGames() {
  const [games, setGames] = useState<GameDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGames = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/recentlyPlayedGames`);

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const apiData: ApiResponse = await response.json();

      const validGames = Object.values(apiData.games)
        .filter((game) => game.success && game.data)
        .map((game) => game.data)
        .reverse();

      if (validGames.length === 0) {
        throw new Error("Nenhum jogo encontrado");
      }

      setGames(validGames);
      console.log(`Carregados ${apiData.totalGames} jogos`);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      console.error("Erro ao buscar jogos:", errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  return {
    games,
    isLoading,
    error,
    refetch: fetchGames,
  };
}
