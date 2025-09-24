import { useCallback, useEffect, useState } from "react";

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

const API_BASE_URL = "https://haru-hub-backend.onrender.com";

export function usePlayer() {
  const [playerProfile, setPlayerProfile] = useState<UserProfileType>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/user`);

      if (!response.ok) {
        throw new Error("Error" + response.status + ": " + response.statusText);
      }

      const data = await response.json();

      if (!data.response?.players || data.response.players.length === 0) {
        throw new Error("Perfil de usuário não encontrado");
      }

      const userProfile = data.response.players[0];

      if (!userProfile.steamid || !userProfile.personaname) {
        throw new Error("Dados do perfil incompletos");
      }

      setPlayerProfile(userProfile);
      setIsLoading(false);
      console.log("Perfil carregado com sucesso:", userProfile.personaname);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      console.log("Erro ao buscar perfil:", errorMessage);
      setError(errorMessage);
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return {
    playerProfile,
    isLoading,
    error,
    refetch: fetchUserProfile,
  };
}
