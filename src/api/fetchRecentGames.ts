export type GenreType = {
  id: string;
  description: string;
};

export type ScreenshotType = {
  id: number;
  path_thumbnail: string;
};

export type RecentGamesType = {
  steam_appid: number;
  short_description: string;
  header_image: string;
  name: string;
  genres: GenreType[];
  screenshots: ScreenshotType[];
};

export type GameResponseType = {
  success: boolean;
  data: RecentGamesType;
};

export type ApiResponse = {
  totalGames: number;
  games: Record<string, GameResponseType>;
};

export async function fetchRecentGames(): Promise<RecentGamesType[]> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/recentlyPlayedGames`
    );

    if (!response.ok) {
      throw new Error("Error: " + response.status + ": " + response.statusText);
    }

    const data: ApiResponse = await response.json();

    const recentGames = Object.values(data.games)
      .map((game) => game.data)
      .reverse();

    if (recentGames.length === 0) throw new Error("Nenhum jogo encontrado");

    console.log("Jogos recentes carregados: " + data.totalGames);
    return recentGames;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Erro desconhecido na rota /recentlyPlayedGames";
    console.error("Deu erro ai mano: " + errorMessage);
    return [];
  }
}
