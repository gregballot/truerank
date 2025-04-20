import {
  SummonerMatchesRecap,
  RecapAverageMetrics,
  MatchRole,
  RecapChampionAverageMetrics,
  RecapRoleAverageMetrics,
  MatchParticipant,
  RecapMetrics,
} from '@truerank/shared/types';

import { SummonerMatch } from '../entities/SummonerMatch';

export class SummonerMatchesRecapBuilder {
  private _totals: RecapMetrics;
  private _championsTotalsMap: Map<number, RecapMetrics>;
  private _rolesTotalsMap: Map<MatchRole, RecapMetrics>;
  private _skipped = 0;

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
      if (!summonerData) {
        this._skipped++;
        continue;
      }

      if (!this._championsTotalsMap.has(summonerData.championId)) {
        this._championsTotalsMap.set(summonerData.championId, this.initTotals());
      }
      
      if (!this._rolesTotalsMap.has(summonerData.role)) {
        this._rolesTotalsMap.set(summonerData.role, this.initTotals());
      }
      
      const championTotals = this._championsTotalsMap.get(summonerData.championId);
      const roleTotals = this._rolesTotalsMap.get(summonerData.role);

      this.addToTotals(this._totals, summonerData, match.isWinner);
      this.addToTotals(championTotals!, summonerData, match.isWinner);
      this.addToTotals(roleTotals!, summonerData, match.isWinner);
      this._championsTotalsMap.set(summonerData.championId, championTotals!);
      this._rolesTotalsMap.set(summonerData.role, roleTotals!);
    }
  }

  private calcAverageMetrics(metrics: RecapMetrics): RecapAverageMetrics {
    const trueTotal = metrics.matchesCount - this._skipped;
    return {
      matchesCount: trueTotal,
      wins: metrics.wins,
      losses: metrics.losses,
      winrate: (metrics.wins / trueTotal) * 100,

      averageKills: metrics.kills / trueTotal,
      averageDeaths: metrics.deaths / trueTotal,
      averageAssists: metrics.assists / trueTotal,

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
    }).sort((a, b) => b.matchesCount - a.matchesCount) as R;
  }
}
