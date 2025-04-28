import { MatchRole, Rank } from "@truerank/shared/types";

export function getEmblemUrl(rank: Rank): string {
  return `/ranks/${rank.toLowerCase()}.png`;
  // return `/ranks/official/${rank.toLowerCase()}.png`;
}

export function getMasteryBadgeUrl(masteryLevel: number): string {
  const ranges: [number, number][] = [
    [1, 6],
    [7, 12],
    [13, 19],
    [20, 29],
    [30, 39],
    [40, Infinity],
  ];

  const masteryRangeIndex = ranges.findIndex(([min, max]) => {
    return masteryLevel >= min && masteryLevel <= max
  });

  return `/masteries/mastery${masteryRangeIndex + 1}.png`;
}

export function getRoleIcon(roleId: MatchRole) {
  return `/roles/role-${roleId}.svg`;
}
