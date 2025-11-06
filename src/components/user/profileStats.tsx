import { Calendar, Clock } from "lucide-react";
import type { UserProfileType } from "../../api/fetchUser";
import { formatDate, formatLastSeen } from "../../utils/formatDate";

export function ProfileStats({ profile }: { profile: UserProfileType }) {
  const accountCreated = formatDate(profile.timecreated, "en-US");
  const lastSeen = formatLastSeen(profile.lastlogoff);

  return (
    <div className="space-y-4 text-lg">
      <div className="flex flex-col items-start gap-3">
        <div className="flex items-start gap-3">
          <Calendar className="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-semibold text-text">Conta criada em:</span>
            <p className="text-text/70">{accountCreated}</p>
          </div>
        </div>
        {profile.personastate !== 1 && (
          <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-semibold text-text">
                Última vez online:
              </span>
              <p className="text-text/70">{lastSeen}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
