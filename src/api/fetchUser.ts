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
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data: ApiResponse = await response.json();

  if (!data.response?.players || data.response.players.length === 0) {
    return null;
  }

  const playerProfile = data.response.players[0];

  if (import.meta.env.DEV) {
    console.log("Perfil encontrado:", playerProfile.personaname);
  }

  return playerProfile;
}
