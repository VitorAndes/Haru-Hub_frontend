import { Clock, Monitor, XCircle } from "lucide-react";
import type { Games } from "./CardGame";

type GamesProps = Games & {
	onClose: () => void;
};

export function GamesModal({
	name,
	header_image,
	short_description,
	onClose,
}: GamesProps) {
	return (
		<div className="transition-all flex gap-5 bg-primary border border-slate-400 rounded-2xl p-6 max-w-7xl w-full h-[740px] overflow-y-auto relative shadow shadow-secondary ">
			<div className="flex flex-col gap-5 w-[644px]">
				<figure>
					<img
						className="w-full h-96 rounded-lg"
						src={header_image}
						alt="game background"
					/>
				</figure>
				<div className="flex flex-col gap-5">
					<div className="flex items-center justify-between">
						<h1 className="font-title text-3xl font-semibold">{name}</h1>
						<div className="flex gap-4 ">
							<div>
								<h2 className="font-title inline-flex gap-2 items-center text-lg font-semibold">
									<Clock />
									tempo de jogo
								</h2>
								<p className="font-paragraph font-light">4,7 horas</p>
							</div>
							<div>
								<h2 className="inline-flex gap-2 items-center font-title text-lg font-semibold">
									<Monitor />
									Ultima sessão
								</h2>
								<p className="font-paragraph font-light">12 de fev</p>
							</div>
						</div>
					</div>
					<p className="font-paragraph text-xl font-light">
						{short_description}
					</p>
				</div>
			</div>
			<div>
				<h1 className="font-title text-3xl font-semibold">Conquistas</h1>
			</div>
			<button
				className="absolute top-3 right-1 text-red-500"
				type="button"
				onClick={onClose}
			>
				<XCircle size={34} />
			</button>
		</div>
	);
}
