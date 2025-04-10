import { Summoner } from './entities/Summoner';
import { RiotApiDriver } from '../../helpers/riotApiDriver';

export class SummonerAdapter {
  private readonly riotApi: RiotApiDriver;

  constructor(riotApiKey: string) {
    this.riotApi = new RiotApiDriver(riotApiKey, 'EUW');
  }

  async getSummonerByName(
    name: string,
    tag: string,
    invalidateCache?: boolean,
): Promise<Summoner> {
    const account = await this.riotApi.getSummonerByName(name, tag, invalidateCache);
    const profile = await this.riotApi.getSummonerProfile(account.puuid, invalidateCache);

    return new Summoner({
      puuid: account.puuid,
      gameName: account.gameName,
      tagLine: account.tagLine,
      icon: profile.profileIconId,
      level: profile.summonerLevel,
    });
  }

  async getLightSummonerByName(name: string, tag: string): Promise<Summoner> {
    const account = await this.riotApi.getSummonerByName(name, tag);

    return new Summoner({
      puuid: account.puuid,
      gameName: account.gameName,
      tagLine: account.tagLine,
    });
  }
}
