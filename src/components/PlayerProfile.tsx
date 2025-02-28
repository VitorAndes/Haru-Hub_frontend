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
		null,
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
		<div className="flex gap-4 w-full">
			<div className="flex gap-4 w-full">
				<figure className="w-64 h-64">
					<img
						src={playerProfile?.avatarfull}
						alt="Avatar do jogador"
						className="w-full h-full rounded-3xl shadow shadow-secondary"
					/>
				</figure>
				<div className="flex flex-col gap-2 justify-between">
					<div>
						<div className="flex gap-2 items-center justify-between">
							<a
								className="inline-flex items-center gap-2 hover:text-secondary transition-all"
								href={playerProfile?.profileurl}
								target="_black"
							>
								<h1 className="text-3xl font-semibold">
									{playerProfile?.personaname}
								</h1>
								{playerProfile?.loccountrycode === "BR" && "🇧🇷"}
								<ExternalLink />
							</a>
							<span>
								<span className="text-lg font-semibold">
									{playerProfile?.personastate === 1
										? "Online 🟢"
										: "Offline 🔴"}
								</span>
							</span>
						</div>

						<p className="font-light mt-4">No mundo da lua</p>
					</div>

					<div className="flex flex-col">
						<p>
							Conta steam criada em - {""}
							{playerAccountCreatedAt?.toLocaleString("pt-BR", {
								month: "short",
								day: "numeric",
								year: "numeric",
							})}
						</p>
						<span className="text-lg font-semibold">
							Jogando pela ultima vez - {""}
							{lastlogoff?.toLocaleString("pt-BR", {
								weekday: "long",
								minute: "numeric",
								second: "numeric",
								hour: "numeric",
							})}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
