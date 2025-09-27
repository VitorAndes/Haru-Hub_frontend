export type UserProfileType = {
  steamid: string;
  personaname: string;
  profileurl: string;
  avatarfull: string;
  loccountrycode: string;
  personastate: number;
  lastlogoff: number;
  timecreated: number;
};

export type ApiResponse = {
  response: {
    players: UserProfileType[];
  };
};

export async function fetchUser(): Promise<UserProfileType | null> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user`);

    if (!response.ok) {
      throw new Error("Error: " + response.status + ": " + response.statusText);
    }

    const data: ApiResponse = await response.json();

    if (!data.response?.players || data.response.players.length === 0) {
      throw new Error("Perfil de usuário não encontrado");
    }

    const playerProfile = data.response.players[0];

    console.log(
      "Perfil achado guys, olha meu nick ai: " + playerProfile.personaname
    );

    return playerProfile;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Erro desconhecido na rota /user";
    console.error("Deu erro ai mano: " + errorMessage);
    return null;
  }
}
