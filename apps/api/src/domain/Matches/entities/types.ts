import { MatchParticipant } from "@truerank/shared/types";

export const MetricFields = [
  'kills',
  'deaths',
  'assists',
  'firstBloodKill',
  'firstBloodAssist',
  'soloKills',

  'laneMinionsKilled',
  'neutralMinionsKilled',
  'totalMinionsKilled',
  'dragonKills',
  'baronKills',
  'turretKills',
  'turretTakedowns',

  'damageDealtToChampions',
  'damageDealtToObjectives',
  'damageTaken',
  'totalHeal',
  'goldEarned',
  'visionScore',
  'distanceTraveled',
] as const;

export type TeamMetric = {
  total: number;
  highest: number;
  lowest: number;
  average: number;
};

export type TeamMetrics = {
  [K in keyof Pick<
    MatchParticipant,
    (typeof MetricFields)[number]
  >]: TeamMetric;
};
