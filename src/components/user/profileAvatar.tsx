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
      <figure className="size-12 rounded-full  lg:size-24 lg:rounded-lg border overflow-hidden border-secondary/20">
        <img
          src={avatarUrl}
          alt={`Avatar de ${personaname}`}
          className="w-full h-full"
        />
      </figure>

      <div
        className={`absolute bottom-1 right-1 size-2 lg:w-6 lg:h-6 rounded-full border border-primary flex items-center justify-center text-xs ${
          isOnline ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {isOnline ? "🟢" : "🔴"}
      </div>
    </div>
  );
}
