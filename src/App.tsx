import { Search } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { CarouselGames } from "./components/Carousel/carouselGames";
import { Input } from "./components/common/Input";
import { Games } from "./components/Games/games";
import { PlayerProfile } from "./components/user/playerProfile";
import { ProfileAvatar } from "./components/user/profileAvatar";
import { usePlayer } from "./hooks/usePlayer";
import { getPersonaStateInfo } from "./utils/getPersonaState";

export function App() {
  const [inputValue, setInputValue] = useState("");
  const { playerProfile } = usePlayer();
  const personaState = getPersonaStateInfo(playerProfile?.personastate!);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex lg:p-4 h-full lg:w-[1580px] lg:h-[1000px] lg:gap-4">
      <aside>
        <PlayerProfile />
      </aside>
      <main className="px-4 lg:px-8 lg:overflow-hidden lg:overflow-y-scroll lg:bg-scroll rounded-lg flex flex-col relative ">
        <div
          className={`lg:hidden absolute top-1 right-2 z-10 shadow-sm rounded-2xl border ${personaState.bgColor}`}
        >
          <ProfileAvatar
            avatarUrl={playerProfile?.avatarfull!}
            personaname={playerProfile?.personaname!}
            isOnline={playerProfile?.personastate === 1}
          />
        </div>
        <header className="hidden lg:flex items-center gap-2 justify-between relative">
          <h1 className="font-title text-3xl font-bold">
            Bem vindo ao Haru Hub!
          </h1>
        </header>
        <section className="h-96 lg:mt-10 ">
          <CarouselGames />
        </section>
        <section className="flex flex-col lg:gap-7 mt-16 lg:mt-64">
          <div className="flex items-baseline justify-between lg:gap-5 p-3">
            <h1 className="font-title text-lg lg:text-xl font-semibold mb-5">
              Todos os jogos
            </h1>

            <Input
              id="games-name"
              type="text"
              onChange={handleChange}
              icon={() => <Search className="lg:size-8" />}
              placeholder="Procurar jogo..."
            />
          </div>

          <Games filterSearch={inputValue} />
        </section>
      </main>
    </div>
  );
}
