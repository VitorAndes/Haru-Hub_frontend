import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

type userProfileType = Record<
  | "steamid"
  | "personaname"
  | "profileurl"
  | "avatarfull"
  | "loccountrycode"
  | "realname",
  string
> & {
  personastate: number;
  lastlogoff: number;
  timecreated: number;
};

interface ApiResponse {
  response: {
    players: userProfileType[];
  };
}

export function PlayerProfile() {
  const [playerProfile, setPlayerProfile] = useState<userProfileType | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const url = "https://haru-hub-backend.onrender.com/";

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await fetch(`${url}user`);

        if (!response.ok) {
          throw new Error("Erro ao buscar os jogos");
        }

        const data: ApiResponse = await response.json();
        const userProfile = data.response.players;
        setPlayerProfile(userProfile[0]);
      } catch (error) {
        console.error("Erro ao buscar os jogos:", error);
        setError(error instanceof Error ? error.message : "Erro desconhecido");
      }
    }

    fetchUserProfile();
  }, []);

  const playerAccountCreatedAt: Date | null = playerProfile?.timecreated
    ? new Date(playerProfile.timecreated * 1000)
    : null;
  const lastlogoff: Date | null = playerProfile?.lastlogoff
    ? new Date(playerProfile.lastlogoff * 1000)
    : null;

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div
      className={`flex flex-col items-center justify-between p-3 gap-4 w-56 h-full rounded-2xl shadow-lg backdrop-blur-sm bg-primary/25 transition-colors overflow-hidden ${
        playerProfile?.personastate === 1
          ? "shadow-emerald-900"
          : " shadow-rose-900"
      }`}
    >
      <div className="flex-1">
        <figure className="">
          <img
            src={playerProfile?.avatarfull}
            alt="Avatar do jogador"
            className="w-full h-full rounded-full"
          />
        </figure>
        <div className="flex flex-col gap-3 mt-4">
          <a
            className="inline-flex items-center gap-2 hover:text-secondary transition-all"
            href={playerProfile?.profileurl}
            target="_black"
          >
            <h1 className="font-title text-2xl font-semibold">
              {playerProfile?.personaname}
            </h1>
            {playerProfile?.loccountrycode === "BR" && "#🇧🇷"}
            <ExternalLink />
            <span className="font-paragraph text-sm font-semibold">
              {playerProfile?.personastate === 1 ? "🟢" : "🔴"}
            </span>
          </a>
          <p className="font-paragraph">No mundo da lua</p>
        </div>
      </div>
      <div className="flex flex-col gap-8 flex-shrink-0">
        <div className="flex flex-col gap-3 h-full">
          <p className="flex flex-col ">
            <span className="font-title text-lg">Conta criada em:</span>
            <span className="font-paragraph text-slate-300">
              {playerAccountCreatedAt?.toLocaleString("en", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </p>
          <p className="flex flex-col">
            <span className="font-title text-lg">Última vez online:</span>
            <span className="font-paragraph text-slate-300">
              {lastlogoff?.toLocaleString("pt-BR", {
                weekday: "long",
              })}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
