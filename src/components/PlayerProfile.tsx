export function PlayerProfile() {
	return (
		<>
			<figure className="w-52 h-52">
				<img
					src="https://pm1.aminoapps.com/8008/2f7b01e0df0dd018d202e6b9a3ec0670ed6266cbr1-512-512v2_uhq.jpg"
					alt="Avatar do jogador"
					className="w-full h-full rounded-md shadow shadow-secondary"
				/>
			</figure>
			<div className="flex justify-between items-center mt-4">
				<h1 className="text-lg font-bold">Haru Moon</h1>
				<span>Offline</span>
			</div>
		</>
	);
}
