import { Rank } from "@truerank/shared/types";

export function getEmblemUrl(rank: Rank): string {
  return `/ranks/${rank.toLowerCase()}.png`;
}

export function getMasteryBadgeUrl(masteryLevel: number): string {
  const ranges: [number, number][] = [
    [1, 4],
    [5, 9],
    [10, 14],
    [15, 19],
    [20, 29],
    [30, Infinity],
  ];

  const masteryRangeIndex = ranges.findIndex(([min, max]) => {
    return masteryLevel >= min && masteryLevel <= max
  });

  return `/masteries/mastery${masteryRangeIndex + 1}.png`;
}
