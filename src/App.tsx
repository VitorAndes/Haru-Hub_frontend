import { Search } from "lucide-react";
import { useRef } from "react";
import { Games } from "./components/Games";
import { GamesRecently } from "./components/GamesRecently";
import { PlayerProfile } from "./components/PlayerProfile";
import { Input } from "./components/common/Input";

export function App() {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<div className="flex gap-4 min-h-screen bg-background text-text">
			<aside className="bg-slate-background/50 shadow shadow-secondary p-4">
				<PlayerProfile />
			</aside>
			<main className="max-w-7xl mt-4 p-8">
				<header>
					<Input
						ref={inputRef}
						icon={() => <Search />}
						placeholder="Search game..."
					/>
				</header>
				<section className="flex h-96 gap-2 mt-9">
					<GamesRecently />
				</section>
				<section className="mt-20">
					<Games />
				</section>
			</main>
		</div>
	);
}
