import { Search } from "lucide-react";
import { type FormEvent, useRef } from "react";
import { CardGame } from "./components/Games/CardGame";
import { GamesRecently } from "./components/GamesRecently";
import { PlayerProfile } from "./components/PlayerProfile";
import { Input } from "./components/common/Input";

export function App() {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleRegisterSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(inputRef.current?.value);
	};

	return (
		<div className="flex flex-col p-4 items-center w-[1280px] gap-4 min-h-screen relative">
			<main className="mt-4 px-8">
				<section className="w-full">
					<PlayerProfile />
				</section>

				<section className="h-96 mt-24">
					<GamesRecently />
				</section>
				<section className="mt-40">
					<div className="">
						<h1 className="text-3xl font-semibold mb-5">Todos os jogos - </h1>
						<form
							className="flex gap-2 items-center"
							action=""
							onSubmit={(e) => handleRegisterSubmit(e)}
						>
							<Input
								id="games-name"
								type="text"
								ref={inputRef}
								icon={() => <Search />}
								placeholder="Search game..."
							/>
							<button type="submit">click</button>
						</form>
						<div className="mt-12">
							<CardGame />
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
