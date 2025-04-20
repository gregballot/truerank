import * as SharedTypes from '@truerank/shared/types';

import { RiotApiDriver } from '../../helpers/riotApiDriver';
import { RiotChampionMastery, RiotSummonerLeagueEntry } from '../../helpers/riotApiDriver/types';
import { rankDivisionsMapping } from '../../helpers/riotApiDriver/mappedTypes';

import { Summoner } from './entities/Summoner';

export class SummonerAdapter {
  private readonly riotApi: RiotApiDriver;

  constructor(riotApiKey: string) {
    this.riotApi = new RiotApiDriver(riotApiKey, 'EUW');
  }

  private mapLeagueEntry(
    leagueEntries: RiotSummonerLeagueEntry[],
    queueType: SharedTypes.QueueType
  ): SharedTypes.SummonerLeague | undefined {
    const leagueEntry = leagueEntries.find(e => e.queueType === queueType);
    if (!leagueEntry) {
      return undefined;
    }

    return {
      leagueId: leagueEntry.leagueId,
      queueType: leagueEntry.queueType,
      rank: leagueEntry.tier,
      division: rankDivisionsMapping[leagueEntry.rank],
      lpAmount: leagueEntry.leaguePoints,
      wins: leagueEntry.wins,
      losses: leagueEntry.losses,
    };
  };

  private mapChampionMasteries(
    championMasteries: RiotChampionMastery[]
  ): SharedTypes.ChampionMastery[] {
    return championMasteries.map(
      mastery => ({
        championId: mastery.championId,
        masteryLevel: mastery.championLevel,
        masteryPoints: mastery.championPoints,
        lastPlayTime: new Date(mastery.lastPlayTime),
      })
    );
  }

  async getSummonerByName(
    name: string,
    tag: string,
    invalidateCache?: boolean,
): Promise<Summoner> {
    const account = await this.riotApi.getSummonerByName(name, tag);

    const [profile, leagueEntries, allChampionMasteries] = await Promise.all([
      this.riotApi.getSummonerProfile(account.puuid, invalidateCache),
      this.riotApi.getSummonerRankInfo(account.puuid, invalidateCache),
      this.riotApi.getChampionMasteries(account.puuid, invalidateCache),
    ]);

    const topChampionMasteries = allChampionMasteries.sort(
      (a, b) => b.championLevel - a.championLevel
    ).slice(0, 30);

    return new Summoner(
      {
        puuid: account.puuid,
        gameName: account.gameName,
        tagLine: account.tagLine,
        icon: profile.profileIconId,
        level: profile.summonerLevel,
      },
      this.mapLeagueEntry(leagueEntries, SharedTypes.QueueTypeRankedSolo),
      this.mapLeagueEntry(leagueEntries, SharedTypes.QueueTypeRankedFlex),
      this.mapChampionMasteries(topChampionMasteries),
    );
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
