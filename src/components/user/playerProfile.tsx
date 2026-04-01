import { useAppDataContext } from "../../context/AppDataProvider";
import { getPersonaStateInfo } from "../../utils/getPersonaState";
import { ErrorState } from "../common/errorState";
import { LoadingState } from "../common/loadingState";
import { ProfileHeader } from "./profileHeader";
import { ProfileStats } from "./profileStats";

export function PlayerProfile() {
  const { error, isLoading, playerProfile, refetch } =
    useAppDataContext();

  if (isLoading) {
    return (
      <LoadingState className="hidden lg:block h-full w-28" />
    );
  }

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  if (!playerProfile) {
    return (
      <div className="flex items-center justify-center w-56 h-full p-6 bg-primary/25 backdrop-bluc-sm rounded-2xl">
        <p className="text-text/70 text-center">
          Perfil não encontrado
        </p>
      </div>
    );
  }

  const personaState = getPersonaStateInfo(
    playerProfile.personastate,
  );

  return (
    <div
      className={`hidden lg:flex flex-col justify-between p-2 gap-6 w-32 h-full shadow-md lg:border-l-0 lg:border-t-0 lg:border-b-0 border  backdrop-blur-sm bg-primary/85 transition-all duration-300 ${personaState.bgColor}`}
    >
      <ProfileHeader profile={playerProfile} />
      <ProfileStats profile={playerProfile} />
    </div>
  );
}
