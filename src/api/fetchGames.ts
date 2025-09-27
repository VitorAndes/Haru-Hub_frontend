export type GamesType = {
  name: string;
  steam_appid: number;
  header_image: string;
  short_description: string;
  genres?: Array<{ id: string; description: string }>;
  screenshots?: Array<{ id: number; path_thumbnail: string }>;
};

type GameResponseType = {
  success: boolean;
  data: GamesType;
};

type ApiResponse = {
  totalGames: number;
  validGames: number;
  games: Record<string, GameResponseType>;
};

export async function fetchGames(): Promise<GamesType[]> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/games`);

    if (!response.ok) {
      throw new Error("Error: " + response.status + ": " + response.statusText);
    }

    const data: ApiResponse = await response.json();

    const games = Object.values(data.games).map((game) => game.data);

    if (games.length === 0) throw new Error("Nenhum jogo encontrado");

    console.log("Jogos carregados: " + data.totalGames);

    return games;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Erro desconhecido na rota /games";
    console.error("Deu erro ai mano: " + errorMessage);
    return [];
  }
}
