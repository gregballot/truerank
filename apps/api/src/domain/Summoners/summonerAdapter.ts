import { Summoner } from './entities/Summoner';
import { RiotApiDriver } from '../../helpers/riotApiDriver';

export class SummonerAdapter {
  private readonly riotApi: RiotApiDriver;

  constructor(riotApiKey: string) {
    this.riotApi = new RiotApiDriver(riotApiKey, 'EUW');
  }

  async getSummonerByName(name: string, tag: string): Promise<Summoner> {
    const account = await this.riotApi.getSummonerByName(name, tag);

    return new Summoner(account);
  }
}
