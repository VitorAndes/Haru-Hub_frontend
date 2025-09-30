import { Search } from "lucide-react";
import { ChangeEvent, useState } from "react";

import { CarouselGames } from "./components/Carousel/carouselGames";
import { Input } from "./components/common/Input";
import { Games } from "./components/Games/games";
import { PlayerProfile } from "./components/user/playerProfile";
import { ProfileAvatar } from "./components/user/profileAvatar";
import { useAppDataContext } from "./context/AppDataProvider";
import { getPersonaStateInfo } from "./utils/getPersonaState";

export function App() {
  const [inputValue, setInputValue] = useState("");
  const { playerProfile } = useAppDataContext();
  const personaState = getPersonaStateInfo(playerProfile?.personastate!);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex lg:p-4 h-full lg:w-[1580px] lg:h-[1000px] lg:gap-4">
      <aside>
        <PlayerProfile />
      </aside>
      <main className="max-w-96 lg:max-w-full lg:px-8 lg:overflow-hidden lg:overflow-y-scroll lg:bg-scroll rounded-lg flex flex-col relative ">
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
        <section className="m-auto lg:mt-10 ">
          <CarouselGames />
        </section>
        <section className="flex flex-col lg:gap-7 mt-16">
          <div className="flex flex-wrap items-baseline justify-between lg:gap-5 px-3 lg:px-0">
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
