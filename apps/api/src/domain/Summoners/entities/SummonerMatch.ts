import { Match } from '../../Matches/entities/Match';
import { Summoner } from './Summoner';

import { SharedTypes } from '@truerank/shared';

export class SummonerMatch {
  constructor(
    private readonly match: Match,
    private readonly summoner: Summoner
  ) {}

  get isWinner(): boolean {
    return this.match.isParticipantWinner(this.summoner.puuid);
  }

  get details(): SharedTypes.SummonerMatchData {
    return {
      isWinner: this.isWinner,
      match: this.match.details,
      summoner: this.summoner.details,
    };
  }
}
