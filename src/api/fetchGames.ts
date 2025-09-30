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
  const response = await fetch(`${import.meta.env.VITE_API_URL}/games`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data: ApiResponse = await response.json();
  const games = Object.values(data.games).map((game) => game.data);

  if (import.meta.env.DEV) {
    console.log("Jogos carregados:", data.totalGames);
  }

  return games;
}
