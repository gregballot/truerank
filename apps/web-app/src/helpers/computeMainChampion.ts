import {
  ChampionMastery,
  RecapChampionAverageMetrics,
} from "@truerank/shared/types";

type ChampionScore = {
  masteryScore: number;
  matchesScore: number;
  lastPlayed: Date | null;
};

export function computeMainChampion(
  championMasteries: ChampionMastery[],
  recapChampions: RecapChampionAverageMetrics[],
): number {
  const scoresMap = new Map<number, ChampionScore>();

  const now = Date.now();
  const maxMasteryPoints = Math.max(...championMasteries.map(m => m.masteryPoints));
  const oldestLastPlayTime = Math.min(...championMasteries.map(m => new Date(m.lastPlayTime).getTime()));

  // populate from masteries
  for (const mastery of championMasteries) {
    const masteryScore =
      Math.log2(mastery.masteryPoints + 1) / Math.log2(maxMasteryPoints + 1);

    scoresMap.set(mastery.championId, {
      masteryScore,
      matchesScore: 0,
      lastPlayed: mastery.lastPlayTime ?? null,
    });
  }

  const maxMatches = Math.max(
    ...recapChampions.map((recap) => recap.matchesCount),
    1 // Avoid division by zero
  );

  // add/merge recap match data
  const totalMatches = recapChampions.reduce((sum, champ) => sum + champ.matchesCount, 0);
  for (const recap of recapChampions) {
    const existing = scoresMap.get(recap.championId);
    const confidence = Math.min(totalMatches / 20, 1);
    const matchesScore = (recap.matchesCount / maxMatches) * confidence;

    if (existing) {
      existing.matchesScore = matchesScore;
    } else {
      scoresMap.set(recap.championId, {
        masteryScore: 0,
        matchesScore,
        lastPlayed: null,
      });
    }
  }

  // Third pass: compute total scores and find best champ
  let bestChampionId = -1;
  let bestTotalScore = -1;

  for (const [championId, score] of scoresMap.entries()) {
    const { masteryScore, matchesScore, lastPlayed } = score;

    let recencyScore = 0;
    if (lastPlayed) {
      const timeSince = now - new Date(lastPlayed).getTime();
      const timeSpan = now - oldestLastPlayTime;
      recencyScore = 1 - timeSince / timeSpan;
    }

    const totalScore =
      0.4 * masteryScore +
      0.4 * matchesScore +
      0.2 * recencyScore;

    if (totalScore > bestTotalScore) {
      bestChampionId = championId;
      bestTotalScore = totalScore;
    }
  }

  return bestChampionId;
}
