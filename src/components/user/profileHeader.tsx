import { ExternalLink } from "lucide-react";
import type { UserProfileType } from "../../api/fetchUser";
import { getPersonaStateInfo } from "../../utils/getPersonaState";
import { ProfileAvatar } from "./profileAvatar";

const COUNTRY_FLAGS: Record<string, string> = {
  BR: "🇧🇷",
};

export function ProfileHeader({
  profile,
}: {
  profile: UserProfileType;
}) {
  const personaState = getPersonaStateInfo(
    profile.personastate,
  );
  const countryFlag =
    COUNTRY_FLAGS[profile.loccountrycode] || "";

  return (
    <div className="flex flex-col items-center text-center">
      <ProfileAvatar
        avatarUrl={profile.avatarfull}
        personaname={profile.personaname}
        isOnline={profile.personastate === 1}
      />

      <div className="mt-4 space-y-2">
        <a
          href={profile.profileurl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:text-secondary transition-all group"
        >
          <h1 className="font-title text-lg font-semibold line-clamp-2">
            {profile.personaname}
          </h1>
          {countryFlag && (
            <span className="text-sm">{countryFlag}</span>
          )}
          <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
        </a>
        <div className="flex items-center justify-center gap-2">
          <span
            className={`px-2 py-1 rounded-lg border text-xs ${
              profile.personastate === 1
                ? "bg-green-500/20 border-green-400  text-green-400"
                : "bg-red-500/20 border-red-400 text-red-400"
            }`}
          >
            {personaState.color} {personaState.label}
          </span>
        </div>
      </div>
    </div>
  );
}
