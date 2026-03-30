import { Calendar, Clock } from "lucide-react";
import type { UserProfileType } from "../../api/fetchUser";
import { formatDate, formatLastSeen } from "../../utils/formatDate";

export function ProfileStats({ profile }: { profile: UserProfileType }) {
  const accountCreated = formatDate(profile.timecreated, "en-US");
  const lastSeen = formatLastSeen(profile.lastlogoff);

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-text text-xs">
            Conta criada em:
          </span>
          <div className="flex gap-1 items-center">
            <Calendar className="size-5 text-secondary " />
            <p className="text-text/70 text-sm">{accountCreated}</p>
          </div>
        </div>
        {profile.personastate !== 1 && (
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-text text-xs  ">
              Última vez online:
            </span>
            <div className="flex gap-1 items-center ">
              <Clock className="size-5 text-secondary" />
              <p className="text-text/70 text-sm  ">{lastSeen}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
