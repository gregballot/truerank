// Summoner
export type SummonerData = {
    puuid: string;
    gameName: string;
    tagLine: string;
};

// Match
export type MatchMetadata = {
    gameDuration: number;
    gameMode: string;
    queue: string;
    gameId: string;
    gameCreation: Date;
};
  
export type MatchParticipant = {
    summoner: SummonerData;

    won: boolean;
    championId: number;
    championName: string;
    championLevel: number;

    kills: number;
    deaths: number;
    assists: number;
    totalMinionsKilled: number;

    items: number[];
    trinket: number;
};
  
export type MatchData = {
    metadata: MatchMetadata;
    redTeam: MatchParticipant[];
    blueTeam: MatchParticipant[];
    winnerSide: 'red' | 'blue';
};

// SummonerMatch
export type SummonerMatchData = {
    isWinner: boolean;
    match: MatchData;
    summoner: SummonerData;
};
