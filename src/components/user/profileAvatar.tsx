export function ProfileAvatar({
  avatarUrl,
  personaname,
  isOnline,
}: {
  avatarUrl: string;
  personaname: string;
  isOnline: boolean;
}) {
  return (
    <div className="relative">
      <figure className="w-50 h-50 rounded-2xl overflow-hidden border-2 border-secondary/30">
        <img
          src={avatarUrl}
          alt={`Avatar de ${personaname}`}
          className="w-full h-full object-cover"
        />
      </figure>

      <div
        className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center text-xs ${
          isOnline ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {isOnline ? "🟢" : "🔴"}
      </div>
    </div>
  );
}
