import { MatchRole,
  MatchRoles,
  QueueName,
  QueueNames,
} from '@truerank/shared/types';
import { RiotSummonerLeagueEntry } from './types';

const RiotRoles = [
  "TOP",
  "JUNGLE",
  "MIDDLE",
  "BOTTOM",
  "UTILITY",
] as const;

export type RiotRole = typeof RiotRoles[number];

export const roleMapping: Record<RiotRole, MatchRole> = {
  TOP: MatchRoles.TOP,
  JUNGLE: MatchRoles.JUNGLE,
  MIDDLE: MatchRoles.MID,
  BOTTOM: MatchRoles.ADC,
  UTILITY: MatchRoles.SUPPORT,
};

export const RiotQueues: Record<QueueName, number> = {
  [QueueNames.NORMAL_DRAFT]: 400,
  [QueueNames.RANKED_SOLODUO]: 420,
  [QueueNames.NORMAL_BLIND]: 430,
  [QueueNames.RANKED_FLEX]: 440,
  [QueueNames.ARAM]: 450,
  [QueueNames.SWIFTPLAY]: 480,
  [QueueNames.CLASH]: 700,
  [QueueNames.COOP_VS_AI_INTRO]: 830,
  [QueueNames.COOP_VS_AI_BEGINNER]: 840,
  [QueueNames.COOP_VS_AI_INTERMEDIATE]: 850,
  [QueueNames.ARURF]: 900,
  [QueueNames.NEMESIS_DRAFT]: 1090,
  [QueueNames.NEXUS_BLITZ]: 1300,
  [QueueNames.ULTIMATE_SPELLBOOK]: 1400,
  [QueueNames.ARENA]: 1700,
  [QueueNames.TUTORIAL_1]: 2000,
  [QueueNames.TUTORIAL_2]: 2010,
  [QueueNames.TUTORIAL_3]: 2020,
};

export const queueNameMapping: Record<number, QueueName> = {
  400: QueueNames.NORMAL_DRAFT,
  420: QueueNames.RANKED_SOLODUO,
  430: QueueNames.NORMAL_BLIND,
  440: QueueNames.RANKED_FLEX,
  450: QueueNames.ARAM,
  480: QueueNames.SWIFTPLAY,
  700: QueueNames.CLASH,
  830: QueueNames.COOP_VS_AI_INTRO,
  840: QueueNames.COOP_VS_AI_BEGINNER,
  850: QueueNames.COOP_VS_AI_INTERMEDIATE,
  900: QueueNames.ARURF,
  1090: QueueNames.NEMESIS_DRAFT,
  1300: QueueNames.NEXUS_BLITZ,
  1400: QueueNames.ULTIMATE_SPELLBOOK,
  1700: QueueNames.ARENA,
  2000: QueueNames.TUTORIAL_1,
  2010: QueueNames.TUTORIAL_2,
  2020: QueueNames.TUTORIAL_3,
};

export const rankDivisionsMapping: Record<
  RiotSummonerLeagueEntry["rank"],
  {
    raw: 1 | 2 | 3 | 4;
    formatted: RiotSummonerLeagueEntry["rank"];
  }
> = {
  'I': {
    raw: 1,
    formatted: 'I',
  },
  'II': {
    raw: 2,
    formatted: 'II',
  },
  'III': {
    raw: 3,
    formatted: 'III',
  },
  'IV': {
    raw: 4,
    formatted: 'IV',
  },
};
