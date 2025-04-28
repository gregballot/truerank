import {
  ChampionMastery,
  SummonerData,
  SummonerDetails,
  SummonerLeague,
  SummonerLightDetails,
} from "@truerank/shared/types";

export class Summoner {
  constructor(
    private readonly data: SummonerData,
    private readonly soloRank?: SummonerLeague,
    private readonly flexRank?: SummonerLeague,
    private readonly championMasteries?: ChampionMastery[],
  ) {}

  get puuid(): string {
    return this.data.puuid;
  }

  get details(): SummonerDetails {
    return {
      ...this.data,
      soloRank: this.soloRank,
      flexRank: this.flexRank,
      championMasteries: this.championMasteries ?? [],
    }
  }

  get lightDetails(): SummonerLightDetails {
    return {
      puuid: this.puuid,
      gameName: this.data.gameName,
      tagLine: this.data.tagLine,
    };
  }
}
