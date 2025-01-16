import { SteamLogo } from "../assets/SteamLogo";
import { CardGame } from "./common/cardGame";
export function Games() {
	return (
		<>
			<SteamLogo />
			<div className="flex gap-3 flex-wrap mt-2">
				<CardGame />
			</div>
		</>
	);
}
