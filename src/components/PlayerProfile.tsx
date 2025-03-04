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
		<div className="flex flex-col items-center p-3 gap-4 w-44 h-full rounded-2xl bg-aside/50 shadow-md shadow-secondary border border-slate-500 backdrop-blur-sm">
			<div className="flex flex-col items-center gap-5 w-full">
				<figure className="w-36 h-36 rounded-full">
					<img
						src={playerProfile?.avatarfull}
						alt="Avatar do jogador"
						className="w-full h-full rounded-3xl shadow shadow-secondary"
					/>
				</figure>
				<div className="flex flex-col gap-8 justify-between">
					<div>
						<div className="flex flex-col gap-2 justify-between">
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
							</a>
							<span>
								<span className="font-paragraph text-lg font-semibold">
									{playerProfile?.personastate === 1
										? "Online 🟢"
										: "Offline 🔴"}
								</span>
							</span>
						</div>

						<p className="font-paragraph font-light mt-4">No mundo da lua</p>
					</div>

					<div className="flex flex-col gap-3">
						<p className="flex flex-col text-lg ">
							<span className="font-title font-semibold">Conta criada em</span>
							<span className="font-paragraph text-accent">
								{playerAccountCreatedAt?.toLocaleString("en", {
									month: "short",
									day: "numeric",
									year: "numeric",
								})}
							</span>
						</p>
						<p className="flex flex-col text-lg">
							<span className="font-title font-semibold">Última vez on</span>
							<span className="font-paragraph text-accent">
								{lastlogoff?.toLocaleString("pt-BR", {
									weekday: "long",
								})}
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
