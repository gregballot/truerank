export type RiotSummonerAccount = {
  puuid: string;
  gameName: string;
  tagLine: string;
};

export type RiotParticipant = {
  puuid: string;
  riotIdGameName: string;
  riotIdTagline: string;
  championId: number;
  championName: string;
  championLevel: number;
  kills: number;
  deaths: number;
  assists: number;
  totalMinionsKilled: number;
  win: boolean;
};

export type RiotMatch = {
  info: {
    gameId: string;
    gameMode: string;
    gameDuration: number;
    gameCreation: number;
    queueId: number;
    participants: RiotParticipant[];
  }
};