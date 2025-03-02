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
	playtime_forever: number;
};

interface ApiResponse {
	data: GamesRecentlyType;
}

export function GamesRecently() {
	const [current, setCurrent] = useState(0);
	const [carouselGames, setGamesRecently] = useState<GamesRecentlyType[]>([]);
	const [error, setError] = useState<string | null>(null);

	const url = "https://haru-hub-backend.onrender.com/";

	useEffect(() => {
		async function fetchRecentlyPlayedGames() {
			try {
				const response = await fetch(`${url}recentlyPlayedGames`);

				if (!response.ok) {
					throw new Error("Erro ao buscar os jogos");
				}

				const data: ApiResponse = await response.json();
				const gamesRecently = Object.values(data)
					.map((item) => item.data)
					.reverse();
				setGamesRecently(gamesRecently);
			} catch (error) {
				console.error("Erro ao buscar os jogos:", error);
				setError(error instanceof Error ? error.message : "Erro desconhecido");
			}
		}

		fetchRecentlyPlayedGames();
	}, []);

	if (error) {
		return <div>Erro: {error}</div>;
	}

	setTimeout(() => {
		if (current === carouselGames.length - 1) setCurrent(0);
		else setCurrent(current + 1);
	}, 3000);

	const previousSlide = () => {
		if (current === 0) setCurrent(carouselGames.length - 1);
		else setCurrent(current - 1);
	};
	const nextSlide = () => {
		if (current === carouselGames.length - 1) setCurrent(0);
		else setCurrent(current + 1);
	};

	return (
		<div className="flex flex-col items-center gap-4 max-w-7xl overflow-hidden">
			<h1 className="text-3xl font-semibold self-start">
				Jogados recentemente
			</h1>
			<div
				className={"flex gap-2 ml-44 transition-all ease-out duration-700"}
				style={{
					transform: `translateX(-${current * 100}%)`,
				}}
			>
				{carouselGames.map(
					({
						steam_appid,
						header_image,
						genres,
						name,
						screenshots,
						short_description,
						playtime_forever,
					}) => {
						return (
							<div
								key={steam_appid}
								className="flex gap-2 flex-shrink-0 w-full"
							>
								<figure className="max-w-3xl relative">
									<img
										loading="lazy"
										className="rounded-2xl shadow shadow-secondary bg-primary/80 border border-slate-400 w-full h-[450px]"
										src={header_image}
										alt="Foto destaque do jogo"
									/>

									<div className="flex gap-x-1 absolute right-3 bottom-6 font-bold">
										{genres.slice(0, 3).map((genre) => {
											return (
												<span
													key={genre.id}
													className="bg-primary/80 rounded-lg border border-secondary py-2 px-4 backdrop-blur drop-shadow"
												>
													{genre.description}
												</span>
											);
										})}
									</div>
								</figure>

								<div className="flex flex-col gap-4 h-full w-[460px]">
									<div className="p-4 bg-primary/80 backdrop-blur shadow shadow-secondary border border-slate-400 rounded-2xl overflow-hidden h-56">
										<h1 className="text-xl font-semibold">{name}</h1>
										<p className=" font-light mt-2">{short_description}</p>
										<span>{playtime_forever}</span>
									</div>
									<figure className="flex w-[227px] h-[207px] overflow-hidden xl:overflow-visible gap-2">
										{screenshots.slice(0, 2).map((screenshot) => {
											return (
												<img
													key={screenshot.id}
													className="w-full rounded-2xl shadow shadow-secondary bg-primary/80 border border-slate-400"
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
								className={`rounded-full cursor-pointer size-3 transition-all duration-700 ${i === current ? "bg-secondary w-16 border border-white " : "bg-white"}`}
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
