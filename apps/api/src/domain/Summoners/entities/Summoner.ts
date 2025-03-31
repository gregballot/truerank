export type SummonerDetails = {
  puuid: string;
  gameName: string;
  tagLine: string;
};

export class Summoner {
  constructor(private readonly data: SummonerDetails) {}

  get puuid(): string {
    return this.data.puuid;
  }

  get details(): SummonerDetails {
    return {
      puuid: this.puuid,
      gameName: this.data.gameName,
      tagLine: this.data.tagLine,
    };
  }
}
