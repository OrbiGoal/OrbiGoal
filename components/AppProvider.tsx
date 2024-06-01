import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchData, getLocalData } from '@/hooks/firebaseConfig';

const AppContext = createContext<any>(null);

const teams2223Collection = "Football Team Stats 2022-2023";
const players2223Collection = "Football Player Stats 2022-2023";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [teamData2223, setTeamData2223] = useState<any[]>([]);
  const [playerData2223, setPlayerData2223] = useState<any[]>([]);

  useEffect(() => {
    const fetchAllData = async () => {
      let team2223 = await getLocalData(teams2223Collection);
      if (!team2223) {
        team2223 = await fetchData(teams2223Collection);
      }
      setTeamData2223(team2223);

      let player2223 = await getLocalData(players2223Collection);
      if (!player2223) {
        player2223 = await fetchData(players2223Collection);
      }
      setPlayerData2223(player2223);
    };
    fetchAllData();
  }, []);

  const memoTeam2223 = useMemo(() => teamData2223, [teamData2223]);
  const memoPlayer2223 = useMemo(() => playerData2223, [playerData2223]);

  return (
    <AppContext.Provider value={{ team2223: memoTeam2223, player2223: memoPlayer2223 }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);