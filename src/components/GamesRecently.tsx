export function GamesRecently() {
	return (
		<>
			<figure className="max-w-2xl h-96 relative">
				<img
					className="rounded-lg border-text/50 border shadow-sm shadow-secondary w-full h-full"
					src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiL1ksBmiZYz4gD4YGAboCyIVJ9Zl_QjY9BUGoELsLDaXl7dRr4HGzIlcpLDaANbqsMi9PDLDS3dJDGTvVeokUGVuPUO7_HmRmG9a0Wl15XgpVf94t9BFcF8u0Zy9ktvcz5bBlt3SbRmxld/s1600/hollow-knight-capa-01.jpg"
					alt="Foto destaque do jogo"
				/>

				<div className="flex gap-x-1 absolute right-3 bottom-6 font-bold">
					<span className="bg-background/50 rounded-lg border border-secondary py-2 px-4 backdrop-blur drop-shadow">
						Indie
					</span>
					<span className="bg-background/50 rounded-lg border border-secondary py-2 px-4 backdrop-blur drop-shadow">
						Ação
					</span>
					<span className="bg-background/50 rounded-lg border border-secondary py-2 px-4 backdrop-blur drop-shadow">
						Aventura
					</span>
				</div>
			</figure>

			<div className="flex flex-col gap-4 flex-1">
				<div className="flex-1 p-4 bg-gradient-to-b from-secondary to-background rounded-lg shadow-sm shadow-secondary border border-text/50 overflow-hidden">
					<h1 className="text-xl font-bold">Hollow knight</h1>
					<p className="text-xs mt-2">
						Hollow Knight é uma aventura de ação clássica em estilo 2D por um
						vasto mundo interligado. Explore cavernas serpenteantes, cidades
						antigas e ermos mortais; lute contra criaturas malignas e alie-se a
						insetos bizarros, e solucione mistérios antigos no centro do reino.
					</p>
				</div>
				<figure className="flex flex-1 gap-2">
					<img
						className="w-full rounded-lg border-text/50 border shadow-sm shadow-secondary"
						src="https://uploads.jovemnerd.com.br/wp-content/uploads/2020/06/hollow-knight-e-um-metroidvania-poetico-e-sombrio-com-alma-de-souls-like.jpg"
						alt="Fotos dentro do jogo"
					/>
					<img
						className="w-full rounded-lg border-text/50 border shadow-sm shadow-secondary"
						src="https://criticalhits.com.br/wp-content/uploads/2018/07/%C3%9Altimo-DLC-Hollow-Knight.jpg"
						alt="Fotos dentro do jogo"
					/>
				</figure>
			</div>
		</>
	);
}
