import {
  MatchRole,
  RecapAverageMetrics,
  RecapMetrics,
  SummonerMatches,
  SummonerMatchesRecap,
} from "@truerank/shared/types";

export function mergeRecaps(pages: SummonerMatches[]): SummonerMatchesRecap {
  const total: RecapMetrics = {
    matchesCount: 0,
    wins: 0,
    losses: 0,
    kills: 0,
    deaths: 0,
    assists: 0,
  };

  const championMap = new Map<number, RecapMetrics>();
  const roleMap = new Map<MatchRole, RecapMetrics>();

  function addToMap<K, T extends RecapAverageMetrics>(
    map: Map<K, RecapMetrics>,
    items: T[],
    keyExtractor: (item: T) => K
  ) {
    for (const item of items) {
      const key = keyExtractor(item);
      const existing = map.get(key) ?? {
        matchesCount: 0,
        wins: 0,
        losses: 0,
        kills: 0,
        deaths: 0,
        assists: 0,
      };

      map.set(key, {
        matchesCount: existing.matchesCount + item.matchesCount,
        wins: existing.wins + item.wins,
        losses: existing.losses + item.losses,
        kills: existing.kills + item.averageKills * item.matchesCount,
        deaths: existing.deaths + item.averageDeaths * item.matchesCount,
        assists: existing.assists + item.averageAssists * item.matchesCount,
      });
    }
  }

  for (const page of pages) {
    const recap = page.recap;

    total.matchesCount += recap.overall.matchesCount;
    total.wins += recap.overall.wins;
    total.losses += recap.overall.losses;
    total.kills += recap.overall.averageKills * recap.overall.matchesCount;
    total.deaths += recap.overall.averageDeaths * recap.overall.matchesCount;
    total.assists += recap.overall.averageAssists * recap.overall.matchesCount;

    addToMap(championMap, recap.champions, (item) => item.championId);
    addToMap(roleMap, recap.roles, (item) => item.roleId);
  }

  const toAverageMetrics = (metrics: RecapMetrics): RecapAverageMetrics => ({
    matchesCount: metrics.matchesCount,
    wins: metrics.wins,
    losses: metrics.losses,
    winrate: (metrics.wins / metrics.matchesCount) * 100,
    averageKills: metrics.kills / metrics.matchesCount,
    averageDeaths: metrics.deaths / metrics.matchesCount,
    averageAssists: metrics.assists / metrics.matchesCount,
    averageKda: (metrics.kills + metrics.assists) / (metrics.deaths || 1),
  });

  const champions = Array.from(championMap.entries())
    .map(([championId, metrics]) => ({
      championId,
      share: (metrics.matchesCount / total.matchesCount) * 100,
      ...toAverageMetrics(metrics),
    }))
    .sort((a, b) => b.matchesCount - a.matchesCount);

  const roles = Array.from(roleMap.entries())
    .map(([roleId, metrics]) => ({
      roleId,
      share: (metrics.matchesCount / total.matchesCount) * 100,
      ...toAverageMetrics(metrics),
    }))
    .sort((a, b) => b.matchesCount - a.matchesCount);

  return {
    overall: toAverageMetrics(total),
    champions,
    roles,
  };
}
