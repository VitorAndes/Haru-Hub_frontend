import { createContext, ReactNode, useContext } from "react";
import { useAppData } from "../hooks/useAppData";

type AppDataContextType = ReturnType<typeof useAppData>;

const AppdDataContext = createContext<AppDataContextType | null>(null);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const appData = useAppData();

  return (
    <AppdDataContext.Provider value={appData}>
      {children}
    </AppdDataContext.Provider>
  );
}

export function useAppDataContext() {
  const context = useContext(AppdDataContext);
  if (!context) {
    throw new Error("useAppDataContext precisa estar dentro de um provider");
  }
  return context;
}
