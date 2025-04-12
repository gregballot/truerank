import { SharedTypes } from "@truerank/shared";

export class Summoner {
  constructor(
    private readonly data: SharedTypes.SummonerData,
    private readonly soloRank?: SharedTypes.SummonerLeague,
    private readonly flexRank?: SharedTypes.SummonerLeague,
  ) {}

  get puuid(): string {
    return this.data.puuid;
  }

  get details(): SharedTypes.SummonerDetails {
    return {
      ...this.data,
      soloRank: this.soloRank,
      flexRank: this.flexRank,
    }
  }

  get lightDetails(): SharedTypes.SummonerLightDetails {
    return {
      puuid: this.puuid,
      gameName: this.data.gameName,
      tagLine: this.data.tagLine,
    };
  }
}
