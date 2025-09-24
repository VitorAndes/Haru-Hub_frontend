import { useCallback, useEffect, useState } from "react";

const API_BASE_URL = "https://haru-hub-backend.onrender.com";

export type Games = {
  name: string;
  steam_appid: number;
  header_image: string;
  short_description: string;
  genres?: Array<{ id: string; description: string }>;
  screenshots?: Array<{ id: number; path_thumbnail: string }>;
};

type GameResponseType = {
  success: boolean;
  data: Games;
};

type ApiResponse = {
  totalGames: number;
  validGames: number;
  games: Record<string, GameResponseType>;
};

export function useGamesData() {
  const [games, setGames] = useState<Games[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGames = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/games`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const apiData: ApiResponse = await response.json();

      if (!apiData || typeof apiData !== "object") {
        throw new Error("Formato de resposta inválido da API");
      }

      const validGames = Object.values(apiData.games)
        .filter(
          (game): game is GameResponseType =>
            game &&
            typeof game === "object" &&
            game.success === true &&
            game.data &&
            typeof game.data === "object"
        )
        .map((game) => game.data)
        .filter((game): game is Games =>
          Boolean(game.name && game.steam_appid && game.header_image)
        );

      if (validGames.length === 0) {
        throw new Error("Nenhum jogo válido encontrado");
      }

      setGames(validGames);

      console.log(`✅ Carregados ${apiData.totalGames} jogos`);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      console.error("❌ Erro ao buscar jogos:", errorMessage);
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
