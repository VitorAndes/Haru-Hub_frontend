import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

type GenreType = Record<"id" | "description", string>;
type screenshotsType = {
	id: number;
	path_thumbnail: string;
};

type GamesRecentlyType = Record<
	"short_description" | "header_image" | "name",
	string
> & {
	steam_appid: number;
	genres: GenreType[];
	screenshots: screenshotsType[];
};

interface ApiResponse {
	data: GamesRecentlyType;
}

export function GamesRecently() {
	const [current, setCurrent] = useState(0);
	const [carouselGames, setGamesRecently] = useState<GamesRecentlyType[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchRecentlyPlayedGames = async () => {
			try {
				const response = await fetch(
					"http://localhost:3333/recentlyPlayedGames",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					},
				);

				if (!response.ok) {
					throw new Error("Erro ao buscar os jogos");
				}

				const data: ApiResponse = await response.json();
				const gamesRecently = Object.values(data).map((item) => item.data);
				setGamesRecently(gamesRecently);
			} catch (error) {
				console.error("Erro ao buscar os jogos:", error);
				setError(error instanceof Error ? error.message : "Erro desconhecido");
			}
		};

		fetchRecentlyPlayedGames();
	}, []);

	if (error) {
		return <div>Erro: {error}</div>;
	}

	const previousSlide = () => {
		if (current === 0) setCurrent(carouselGames.length - 1);
		else setCurrent(current - 1);
	};
	const nextSlide = () => {
		if (current === carouselGames.length - 1) setCurrent(0);
		else setCurrent(current + 1);
	};

	return (
		<div className="flex flex-col items-center justify-center overflow-hidden">
			<div
				className={`flex gap-2 transition-all ease-out duration-700 translate-x-[${current * 100}%]`}
				style={{
					transform: `translateX(-${current * 100}%)`,
				}}
			>
				{carouselGames.map(
					({
						name,
						header_image,
						steam_appid,
						screenshots,
						short_description,
						genres,
					}) => {
						return (
							<div
								key={steam_appid}
								className="flex gap-2 flex-shrink-0 w-full"
							>
								<figure className="max-w-3xl h-96 relative">
									<img
										loading="lazy"
										className="rounded-lg border-text/50 border shadow-sm shadow-secondary w-full h-full"
										src={header_image}
										alt="Foto destaque do jogo"
									/>

									<div className="flex gap-x-1 absolute right-3 bottom-6 font-bold">
										{genres.slice(0, 3).map((genre) => {
											return (
												<span
													key={genre.id}
													className="bg-background/50 rounded-lg border border-secondary py-2 px-4 backdrop-blur drop-shadow"
												>
													{genre.description}
												</span>
											);
										})}
									</div>
								</figure>

								<div className="flex flex-col gap-4 w-96">
									<div className="flex-1 p-4 bg-gradient-to-b from-secondary to-background rounded-lg shadow-sm shadow-secondary border border-text/50 overflow-hidden">
										<h1 className="text-xl font-bold">{name}</h1>
										<p className="text-xs mt-2">{short_description}</p>
									</div>
									<figure className="flex flex-1 gap-2">
										{screenshots.slice(0, 2).map((screenshot) => {
											return (
												<img
													key={screenshot.id}
													className="w-full rounded-lg border-text/50 border shadow-sm shadow-secondary"
													src={screenshot.path_thumbnail}
													alt="Fotos dentro do jogo"
												/>
											);
										})}
									</figure>
								</div>
							</div>
						);
					},
				)}
			</div>
			<div className="flex items-center gap-4 mt-4">
				<button onClick={previousSlide} type="button">
					<ChevronLeft />
				</button>
				<div className="flex items-center gap-2">
					{carouselGames.map((_, i) => {
						return (
							// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
							<div
								onClick={() => {
									setCurrent(i);
								}}
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={`circle ${i}`}
								className={`rounded-full cursor-pointer size-3 transition-all duration-700 ${i === current ? "bg-secondary w-16" : "bg-white"}`}
							/>
						);
					})}
				</div>
				<button onClick={nextSlide} type="button">
					<ChevronRight />
				</button>
			</div>
		</div>
	);
}
