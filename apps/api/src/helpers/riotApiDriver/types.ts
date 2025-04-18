import { RiotRole } from "./mappedTypes";

export type RiotSummonerAccount = {
  puuid: string;
  gameName: string;
  tagLine: string;
};

export type RiotSummonerProfile = {
  summonerLevel: number;
  profileIconId: number;
};

export type RiotSummonerLeagueEntry = {
  leagueId: string;
  puuid: string;
  queueType: 'RANKED_SOLO_5x5' | 'RANKED_FLEX_SR';
  tier: 'IRON' | 'BRONZE' | 'SILVER' | 'GOLD' |
        'PLATINUM' | 'EMERALD' | 'DIAMOND' |
        'MASTER' | 'GRANDMASTER' | 'CHALLENGER';
  rank: 'I' | 'II' | 'III' | 'IV';
  leaguePoints: number;
  wins: number;
  losses: number;
  hotStreak: boolean;
  veteran: boolean;
  freshBlood: boolean;
  inactive: boolean;
};

export type RiotChampionMastery = {
  puuid: string;
  championId: number;
  championLevel: number;
  championPoints: number;
  lastPlayTime: number;
  championPointsSinceLastLevel: number;
  championPointsUntilNextLevel: number;
  chestGranted: boolean;
  tokensEarned: number;
  summonerId: string;
}

export type RiotParticipant = {
  // player info
  puuid: string;
  riotIdGameName: string;
  riotIdTagline: string;

  // role and champion
  teamPosition: RiotRole;
  championId: number;
  championName: string;
  champLevel: number;

  // summoner spells and runes
  summoner1Id: number;
  summoner2Id: number;
  perks: {
    styles: {
      style: number;
      selections: {
        perk: number;
      }[];
    }[];
  };

  // result and stats
  win: boolean;
  kills: number;
  deaths: number;
  assists: number;
  totalMinionsKilled: number;
  neutralMinionsKilled: number;

  // items
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
