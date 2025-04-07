export type RiotSummonerAccount = {
  puuid: string;
  gameName: string;
  tagLine: string;
};

export type RiotParticipant = {
  puuid: string;
  riotIdGameName: string;
  riotIdTagline: string;

  win: boolean;
  role: string;
  championId: number;
  championName: string;
  champLevel: number;

  kills: number;
  deaths: number;
  assists: number;
  totalMinionsKilled: number;

  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
};

export type RiotMatch = {
  info: {
    gameId: string;
    gameMode: string;
    gameDuration: number;
    gameCreation: number;
    queueId: number;
    participants: RiotParticipant[];
  };
};
