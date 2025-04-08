import { RiotRole } from "./mappedTypes";

export type RiotSummonerAccount = {
  puuid: string;
  gameName: string;
  tagLine: string;
};

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
