import SteamLogo from "../assets/SteamLogo.svg";
import { CardGame } from "./common/CardGame";
export function Games() {
	return (
		<>
			<img src={SteamLogo} alt="Steam logo" />
			<div className="flex gap-3 flex-wrap mt-2">
				<CardGame />
			</div>
		</>
	);
}
