import { Search } from "lucide-react";
import { type ChangeEvent, useState } from "react";

import { CarouselGames } from "./components/carousel/carouselGames";
import { Input } from "./components/common/Input";
import { LoadingState } from "./components/common/loadingState";
import { Games } from "./components/games/games";
import { PlayerProfile } from "./components/user/playerProfile";
import { ProfileAvatar } from "./components/user/profileAvatar";
import { useAppDataContext } from "./context/AppDataProvider";
import { getPersonaStateInfo } from "./utils/getPersonaState";

export function App() {
  const [inputValue, setInputValue] = useState("");
  const { playerProfile, isLoading } = useAppDataContext();
  const personaState = getPersonaStateInfo(playerProfile?.personastate ?? 0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex min-h-screen flex-col lg:h-screen lg:flex-row">
      <aside className="h-full lg:h-screen">
        <PlayerProfile />
      </aside>
      <main className="relative flex max-w-96 flex-col m-auto rounded-lg pb-8 lg:h-screen lg:min-h-0 lg:max-w-full lg:flex-1 lg:overflow-y-auto overflow-x-hidden lg:px-8 lg:pb-0">
        {isLoading ? (
          <LoadingState className="size-14 absolute top-1 right-2 z-10 lg:hidden" />
        ) : (
          <div
            className={`lg:hidden absolute top-1 right-1 z-10 rounded-full shadow-sm border ${personaState.bgColor}`}
          >
            <ProfileAvatar
              avatarUrl={playerProfile?.avatarfull ?? ""}
              personaname={playerProfile?.personaname ?? ""}
              isOnline={playerProfile?.personastate === 1}
            />
          </div>
        )}
        <section className="m-auto lg:mt-10 ">
          <CarouselGames />
        </section>
        <section className="flex flex-col lg:gap-7 mt-16 m-auto">
          <div className="flex flex-wrap items-baseline justify-between lg:gap-5 px-3 lg:px-0 w-full">
            <h2 className="font-title text-md lg:text-lg font-semibold mb-5">
              Todos os jogos
            </h2>

            <Input
              id="games-name"
              type="text"
              onChange={handleChange}
              icon={() => <Search className="lg:size-6" />}
              placeholder="Procurar jogo..."
            />
          </div>

          <Games filterSearch={inputValue} />
        </section>
      </main>
    </div>
  );
}
