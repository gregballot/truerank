import { Match } from '../../../Matches/entities/Match';
import { MatchTag } from '../../entities/MatchTag';

import { TagRule } from '../types';
import { loseExcuse } from './rules';

export type MatchTagRuleParams = {
  summonerPuuid: string,
  match: Match,
}

export const MatchTagRules: TagRule<
  MatchTagRuleParams,
  MatchTag | null
>[] = [
  loseExcuse,
];
