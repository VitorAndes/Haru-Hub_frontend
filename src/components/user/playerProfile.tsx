import { usePlayer } from "../../hooks/usePlayer";
import { getPersonaStateInfo } from "../../utils/getPersonaState";
import { ErrorState } from "../common/errorState";
import { LoadingState } from "../common/loadingState";
import { ProfileHeader } from "./profileHeader";
import { ProfileStats } from "./profileStats";

export function PlayerProfile() {
  const { error, isLoading, playerProfile, refetch } = usePlayer();

  if (isLoading) {
    return <LoadingState className="h-full w-60" loadingTitle={"perfil"} />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  if (!playerProfile) {
    return (
      <div className="flex items-center justify-center w-56 h-full p-6 bg-primary/25 backdrop-bluc-sm rounded-2xl">
        <p className="text-text/70 text-center">Perfil não encontrado</p>
      </div>
    );
  }

  const personaState = getPersonaStateInfo(playerProfile.personastate);

  return (
    <div
      className={`flex flex-col justify-between p-4 gap-6 w-56 h-full rounded-2xl shadow-md border backdrop-blur-sm bg-primary/25 transition-all duration-300 ${personaState.bgColor}`}
    >
      <ProfileHeader profile={playerProfile} />
      <ProfileStats profile={playerProfile} />
    </div>
  );
}
