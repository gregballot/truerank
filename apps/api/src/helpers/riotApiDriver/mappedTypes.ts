import * as SharedTypes from '@truerank/shared/types';

const RiotRoles = [
  "TOP",
  "JUNGLE",
  "MIDDLE",
  "BOTTOM",
  "UTILITY",
] as const;

export type RiotRole = typeof RiotRoles[number];

export const roleMapping: Record<RiotRole, SharedTypes.MatchRole> = {
  TOP: SharedTypes.MatchRoles.TOP,
  JUNGLE: SharedTypes.MatchRoles.JUNGLE,
  MIDDLE: SharedTypes.MatchRoles.MID,
  BOTTOM: SharedTypes.MatchRoles.ADC,
  UTILITY: SharedTypes.MatchRoles.SUPPORT,
};

export const queueNameMapping: Record<number, SharedTypes.QueueName> = {
  400: SharedTypes.QueueNames.NORMAL_DRAFT,
  420: SharedTypes.QueueNames.RANKED_SOLODUO,
  430: SharedTypes.QueueNames.NORMAL_BLIND,
  440: SharedTypes.QueueNames.RANKED_FLEX,
  450: SharedTypes.QueueNames.ARAM,
  700: SharedTypes.QueueNames.CLASH,
  830: SharedTypes.QueueNames.COOP_VS_AI_INTRO,
  840: SharedTypes.QueueNames.COOP_VS_AI_BEGINNER,
  850: SharedTypes.QueueNames.COOP_VS_AI_INTERMEDIATE,
  900: SharedTypes.QueueNames.ARURF,
  1090: SharedTypes.QueueNames.NEMESIS_DRAFT,
  1300: SharedTypes.QueueNames.NEXUS_BLITZ,
  1400: SharedTypes.QueueNames.ULTIMATE_SPELLBOOK,
  1700: SharedTypes.QueueNames.ARENA,
  2000: SharedTypes.QueueNames.TUTORIAL_1,
  2010: SharedTypes.QueueNames.TUTORIAL_2,
  2020: SharedTypes.QueueNames.TUTORIAL_3,
};
