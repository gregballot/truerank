import { MatchTagDetails } from '@truerank/shared/types';

import { SummonerMatch } from '../../Summoners/entities/SummonerMatch';
import { Match } from '../../Matches/entities/Match';
import { MatchTag } from '../entities/MatchTag';
import { MatchTagRules } from './MatchTagRules/MatchTagRules';
import { MatchSeriesTagRules } from './MatchSeriesTagRules/MatchSeriesTagRules';

export class TagsEngine {
  private _tags: MatchTag[] = [];

  constructor(
    private readonly summonerPuuid: string,
    private readonly matches: Match[]
  ) {}

  static forMatchParticipant(
    summonerPuuid: string,
    match: Match,
  ): MatchTagDetails[] {
    const tags = [];

    for (const rule of MatchTagRules) {
      const tag = rule({
        summonerPuuid: summonerPuuid,
        match,
      });

      if (tag !== null) {
        tags.push(tag);
      }
    }

    return tags.map((tag) => tag.details);
  }

  static injectInSummonerMatchSeries(summonerMatches: SummonerMatch[]): void {
    MatchSeriesTagRules.forEach(rule => rule({summonerMatches}));
  }
}
