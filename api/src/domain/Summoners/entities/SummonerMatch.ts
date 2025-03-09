import { Match, MatchDetails } from '../../Matches/entities/Match';
import { Summoner, SummonerDetails } from './Summoner';

export type SummonerMatchDetails = {
  isWinner: boolean;
  match: MatchDetails;
  summoner: SummonerDetails;
};

export class SummonerMatch {
  constructor(
    private readonly match: Match,
    private readonly summoner: Summoner
  ) {}

  get isWinner(): boolean {
    return this.match.isParticipantWinner(this.summoner.puuid);
  }

  get details(): SummonerMatchDetails {
    return {
      isWinner: this.isWinner,
      match: this.match.details,
      summoner: this.summoner.details,
    };
  }
}
