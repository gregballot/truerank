import {
  SummonerMatchesRecap,
  RecapAverageMetrics,
  MatchRole,
  RecapChampionAverageMetrics,
  RecapRoleAverageMetrics,
  MatchParticipant,
  RecapMetrics,
  QueueNames,
  QueueName,
} from '@truerank/shared/types';

import { SummonerMatch } from '../entities/SummonerMatch';

export class SummonerMatchesRecapBuilder {
  private _totals: RecapMetrics;
  private _championsTotalsMap: Map<number, RecapMetrics>;
  private _rolesTotalsMap: Map<MatchRole, RecapMetrics>;

  constructor(private readonly matches: SummonerMatch[]) {
    this._totals = this.initTotals();
    this._championsTotalsMap = new Map<number, RecapMetrics>();
    this._rolesTotalsMap = new Map<MatchRole, RecapMetrics>();
  }

  static fromMatches(matches: SummonerMatch[]): SummonerMatchesRecap {
    return new SummonerMatchesRecapBuilder(matches).build();
  }

  public build(): SummonerMatchesRecap {
    this.calcTotals();
    const championsAverageMetrics = this.aggregateFromMap<
      number,
      RecapChampionAverageMetrics[]
    >(this._championsTotalsMap, "championId", this.matches.length);

    const rolesAverageMetrics = this.aggregateFromMap<
      MatchRole,
      RecapRoleAverageMetrics[]
    >(this._rolesTotalsMap, "roleId", this.matches.length);

    return {
      overall: this.calcAverageMetrics(this._totals),
      champions: championsAverageMetrics,
      roles: rolesAverageMetrics,
    };
  }

  private initTotals(): RecapMetrics {
    return {
      matchesCount: 0,
      wins: 0,
      losses: 0,
      kills: 0,
      deaths: 0,
      assists: 0,
    };
  }

  private addToTotals(
    totals: RecapMetrics,
    summonerData: MatchParticipant,
    isWinner: boolean,
  ): void {
    totals.matchesCount++;

    if (isWinner) {
      totals.wins++;
    } else {
      totals.losses++;
    }
    
    totals.kills += summonerData.kills;
    totals.deaths += summonerData.deaths;
    totals.assists += summonerData.assists;
  }

  private calcTotals(): void {
    for (const match of this.matches) {
      const summonerData = match.summonerData;
      const supportedModes: QueueName[] = [
        QueueNames.NORMAL_DRAFT,
        QueueNames.RANKED_SOLODUO,
        QueueNames.NORMAL_BLIND,
        QueueNames.RANKED_FLEX,
        QueueNames.SWIFTPLAY,
      ];

      const queueName = match.details.match.metadata.queueName;
      const isMatchSupported = supportedModes.includes(queueName);
      if (!summonerData || !isMatchSupported) {
        console.log(`Recap Skip: summSet: ${!!summonerData}, queue: ${queueName}: ${isMatchSupported}`);
        continue;
      }
      
      const championTotals = this._championsTotalsMap.get(summonerData.championId) ?? this.initTotals();
      const roleTotals = this._rolesTotalsMap.get(summonerData.role) ?? this.initTotals();

      this.addToTotals(this._totals, summonerData, match.isWinner);
      this.addToTotals(championTotals!, summonerData, match.isWinner);
      this.addToTotals(roleTotals!, summonerData, match.isWinner);
      this._championsTotalsMap.set(summonerData.championId, championTotals!);
      this._rolesTotalsMap.set(summonerData.role, roleTotals!);
    }
  }

  private calcAverageMetrics(metrics: RecapMetrics): RecapAverageMetrics {
    return {
      matchesCount: metrics.matchesCount,
      wins: metrics.wins,
      losses: metrics.losses,
      winrate: (metrics.wins / metrics.matchesCount) * 100,

      averageKills: metrics.kills / metrics.matchesCount,
      averageDeaths: metrics.deaths / metrics.matchesCount,
      averageAssists: metrics.assists / metrics.matchesCount,

      averageKda: (metrics.kills + metrics.assists) / metrics.deaths,
    };
  }

  private aggregateFromMap<K, R>(
    mapToAggregate: Map<K, RecapMetrics>,
    aggregatedValue: string,
    totalMatchesCount: number,
  ): R {
    return Array.from(mapToAggregate).map(([mapKey, metrics]) => {
      const averageMetrics = this.calcAverageMetrics(metrics);
      return {
        [aggregatedValue]: mapKey,
        share: (metrics.matchesCount / totalMatchesCount) * 100,
        ...averageMetrics,
      };
    }).filter(e => e.matchesCount > 0).sort((a, b) => b.matchesCount - a.matchesCount) as R;
  }
}
