import { Summoner } from '../entities/Summoner';

export class SummonerAdapter {
  private readonly baseUrl = 'https://europe.api.riotgames.com';

  constructor(private readonly riotApiKey: string) {}

  async getSummonerByName(name: string, tag: string): Promise<Summoner> {
    const response = await fetch(
      `${this.baseUrl}/riot/account/v1/accounts/by-riot-id/${name}/${tag}`,
      {
        headers: {
          'X-Riot-Token': this.riotApiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch summoner ${name}#${tag}`);
    }

    const responseBody: {
      puuid: string;
      gameName: string;
      tagLine: string;
    } = await response.json();

    return new Summoner(responseBody);
  }
}
