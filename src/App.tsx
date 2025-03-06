import { Search } from "lucide-react";
import { useRef } from "react";
import { CardGame } from "./components/Games/CardGame";
import { GamesRecently } from "./components/GamesRecently";
import { PlayerProfile } from "./components/PlayerProfile";
import { Input } from "./components/common/Input";

export function App() {
	const inputRef = useRef<HTMLInputElement>(null);

	// const handleRegisterSubmit = (event: FormEvent<HTMLFormElement>) => {
	// 	event.preventDefault();
	// 	console.log(inputRef.current?.value);
	// };

	return (
		<div className="flex p-4 w-[1550px] h-[1100px] gap-4 relative">
			<aside className="">
				<PlayerProfile />
			</aside>
			<main className="px-8 overflow-hidden overflow-y-scroll bg-scroll">
				<header className="flex items-center gap-2 justify-between">
					<h1 className="font-title text-5xl font-bold">
						Welcome to Haru Hub!
					</h1>
				</header>
				<section className="h-96 mt-10">
					<GamesRecently />
				</section>
				<section className="flex flex-col gap-7 mt-64">
					<div className="flex items-baseline justify-between gap-5">
						<h1 className="font-title text-3xl font-semibold mb-5">
							Todos os jogos
						</h1>
						<Input
							id="games-name"
							type="text"
							ref={inputRef}
							icon={() => <Search size={32} />}
							placeholder="Search game..."
						/>
					</div>

					<div>
						<CardGame />
					</div>
				</section>
			</main>
		</div>
	);
}
