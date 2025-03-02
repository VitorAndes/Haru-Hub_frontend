import { Search } from "lucide-react";
import { CardGame } from "./components/Games/CardGame";
import { GamesRecently } from "./components/GamesRecently";
import { PlayerProfile } from "./components/PlayerProfile";
import { Input } from "./components/common/Input";

export function App() {
	// const inputRef = useRef<HTMLInputElement>(null);

	// const handleRegisterSubmit = (event: FormEvent<HTMLFormElement>) => {
	// 	event.preventDefault();
	// 	console.log(inputRef.current?.value);
	// };

	return (
		<div className="flex p-4 max-w-[1520px] h-[1100px] gap-4  relative">
			<aside className="">
				<PlayerProfile />
			</aside>
			<main className="px-8 overflow-hidden overflow-y-scroll bg-scroll">
				<header className="flex items-center gap-2 justify-between">
					<h1 className="text-3xl font-bold">Welcome to Haru Hub!</h1>

					<Input
						id="games-name"
						type="text"
						// ref={inputRef}
						icon={() => <Search />}
						placeholder="Search game..."
					/>
				</header>
				<section className="h-96 mt-10">
					<GamesRecently />
				</section>
				<section className="mt-40">
					<div className="">
						<h1 className="text-3xl font-semibold mb-5">Todos os jogos - </h1>

						<div className="mt-12">
							<CardGame />
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
