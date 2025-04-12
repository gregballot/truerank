import * as SharedTypes from '@truerank/shared/types';

import { RiotApiDriver } from '../../helpers/riotApiDriver';
import { RiotSummonerLeagueEntry } from '../../helpers/riotApiDriver/types';
import { rankDivisionsMapping } from '../../helpers/riotApiDriver/mappedTypes';

import { Summoner } from './entities/Summoner';

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
    const account = await this.riotApi.getSummonerByName(name, tag);
    const profile = await this.riotApi.getSummonerProfile(account.puuid, invalidateCache);
    const leagueEntries = await this.riotApi.getSummonerRankInfo(account.puuid, invalidateCache);

    const mapLeagueEntry = (
      leagueEntry?: RiotSummonerLeagueEntry
    ): SharedTypes.SummonerLeague | undefined => {
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

    const soloRank = mapLeagueEntry(leagueEntries.find(e =>
      e.queueType === SharedTypes.QueueTypeRankedSolo
    ));

    const flexRank = mapLeagueEntry(leagueEntries.find(e =>
      e.queueType === SharedTypes.QueueTypeRankedFlex
    ));

    return new Summoner(
      {
        puuid: account.puuid,
        gameName: account.gameName,
        tagLine: account.tagLine,
        icon: profile.profileIconId,
        level: profile.summonerLevel,
      },
      soloRank,
      flexRank,
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
