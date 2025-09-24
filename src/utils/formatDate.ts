export function formatDate(timestamp: number, locale = "pt-BR"): string {
  const date = new Date(timestamp * 1000);

  if (locale === "pt-BR") {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatLastSeen(timestamp: number): string {
  const lastSeen = new Date(timestamp * 1000);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - lastSeen.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 1) return "Agora mesmo";
  if (diffInHours < 24) return `${diffInHours}h atrás`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "Ontem";
  if (diffInDays < 7) return `${diffInDays} dias atrás`;

  return lastSeen.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
}
