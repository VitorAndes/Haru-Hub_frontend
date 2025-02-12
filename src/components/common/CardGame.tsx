type Game = {
	id: number;
	url: string;
	name: string;
};

const games: Game[] = [
	{
		id: 1,
		url: "https://upload.wikimedia.org/wikipedia/pt/e/ee/Terraria_capa.png",
		name: "Terraria",
	},
	{
		id: 2,
		url: "https://sm.ign.com/ign_br/cover/c/celeste/celeste_y4wf.jpg",
		name: "Celeste",
	},
	{
		id: 3,
		url: "https://notadogame.com/uploads/game/cover/250x/5ef66cfd08ad6.jpg",
		name: "Noita",
	},
	{
		id: 4,
		url: "https://image.api.playstation.com/cdn/UP2456/CUSA06840_00/0WuZecPtRr7aEsQPv2nJqiPa2ZvDOpYm.png",
		name: "Stardew valley",
	},
];

export function CardGame() {
	return (
		<>
			{games.map((game) => (
				<figure key={game.id} className="w-52 h-72">
					<img
						className="rounded-lg border border-text/50 shadow-sm shadow-secondary w-full h-full"
						src={game.url}
						alt={game.name}
					/>
				</figure>
			))}
		</>
	);
}
