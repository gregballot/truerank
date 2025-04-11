/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';

const SummonerPuuidContext = createContext<string | undefined>(undefined);

export function SummonerProfileProvider({
  puuid,
  children,
}: {
  puuid: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <SummonerPuuidContext.Provider value={puuid}>
      {children}
    </SummonerPuuidContext.Provider>
  );
}

export function useSummonerPuuid() {
  return useContext(SummonerPuuidContext);
}
