import { SummonerMatch } from '../../../Summoners/entities/SummonerMatch';

import { TagRule } from '../types';
import { loserQueue } from './rules';

export type MatchSeriesTagRuleParams = {
  summonerMatches: SummonerMatch[];
}

export const MatchSeriesTagRules: TagRule<MatchSeriesTagRuleParams, void>[] = [
  loserQueue,
];
