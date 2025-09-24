const PERSONA_STATES = {
  0: {
    label: "Offline",
    color: "🔴",
    bgColor: "border-red-500 shadow-red-900",
  },
  1: {
    label: "Online",
    color: "🟢",
    bgColor: "border-green-500 shadow-green-900",
  },
} as const;

export function getPersonaStateInfo(state: number) {
  return (
    PERSONA_STATES[state as keyof typeof PERSONA_STATES] || PERSONA_STATES[0]
  );
}
