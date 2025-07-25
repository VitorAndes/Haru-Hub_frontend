import { Search } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Input } from "./components/common/Input";
import { CardGame } from "./components/Games/CardGame";
import { GamesRecently } from "./components/GamesRecently";
import { PlayerProfile } from "./components/PlayerProfile";

export function App() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex p-4 w-[1580px] h-[1000px] gap-4 relative  ">
      <aside>
        <PlayerProfile />
      </aside>
      <main className="px-8 overflow-hidden overflow-y-scroll bg-scroll rounded-lg flex flex-col ">
        <header className="flex items-center gap-2 justify-between">
          <h1 className="font-title text-3xl font-bold">
            Bem vindo ao Haru Hub!
          </h1>
        </header>
        <section className="h-96 mt-10">
          <GamesRecently />
        </section>
        <section className="flex flex-col gap-7 mt-64">
          <div className="flex items-baseline justify-between gap-5">
            <h1 className="font-title text-xl font-semibold mb-5">
              Todos os jogos
            </h1>

            <Input
              id="games-name"
              type="text"
              onChange={handleChange}
              icon={() => <Search size={32} />}
              placeholder="Procurar jogo..."
            />
          </div>

          <CardGame filterSearch={inputValue} />
        </section>
      </main>
    </div>
  );
}
