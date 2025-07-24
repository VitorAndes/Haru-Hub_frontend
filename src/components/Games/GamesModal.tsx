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
    <div className="transition-all flex gap-5 bg-primary rounded-md max-w-3xl w-full h-[940px] overflow-hidden relative shadow shadow-secondary">
      <div className="flex flex-col gap-5 w-full">
        <figure className="border-b-2 border-accent">
          <img className="w-full" src={header_image} alt="game background" />
        </figure>
        <div className="flex flex-col gap-8 p-6">
          <div className="flex flex-col gap-5">
            <h1 className="font-title text-3xl font-semibold">{name}</h1>
            <div className="flex gap-4 ">
              <div className="flex items-center gap-2">
                <h2 className="font-paragraph inline-flex gap-2 items-center text-lg font-semibold">
                  <Clock />
                  tempo de jogo:
                </h2>
                <p className="font-paragraph font-light">4,7 horas</p>
              </div>
              <div className="flex items-center gap-2">
                <h2 className="inline-flex gap-2 items-center font-paragraph text-lg font-semibold">
                  <Monitor />
                  Ultima sessão:
                </h2>
                <p className="font-paragraph font-light">12 de fev</p>
              </div>
            </div>
          </div>
          <p className="font-paragraph text-lg font-light">
            {short_description}
          </p>
          <div>
            <h1 className="font-title text-3xl font-semibold">Conquistas</h1>
          </div>
        </div>
      </div>
      <button
        className="absolute top-2 right-2 text-white"
        type="button"
        onClick={onClose}
      >
        <XCircle size={34} />
      </button>
    </div>
  );
}
