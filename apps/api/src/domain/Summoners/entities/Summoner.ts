import { SharedTypes } from "@truerank/shared";

export class Summoner {
  constructor(
    private readonly data: SharedTypes.SummonerData
  ) {}

  get puuid(): string {
    return this.data.puuid;
  }

  get details(): SharedTypes.SummonerData {
    return {
      puuid: this.puuid,
      gameName: this.data.gameName,
      tagLine: this.data.tagLine,
    };
  }
}
