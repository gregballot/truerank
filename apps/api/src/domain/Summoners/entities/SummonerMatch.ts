import {
  MatchParticipant,
  SummonerMatchDetails,
  TeamKey,
  TeamSide,
} from '@truerank/shared/types';

import { Match } from '../../Matches/entities/Match';
import { Summoner } from './Summoner';

export class SummonerMatch {
  constructor(
    private readonly match: Match,
    private readonly summoner: Summoner
  ) {}

  get isWinner(): boolean {
    return this.match.isParticipantWinner(this.summoner.puuid);
  }

  get summonerSide(): TeamSide | null {
    return this.match.getParticipantSide(this.summoner.puuid);
  }

  get summonerTeamKey(): TeamKey | null {
    return this.match.getParticipantTeamKey(this.summoner.puuid);
  }

  get summonerIndex(): number {
    return this.match.getParticipantIndex(this.summoner.puuid);
  }

  get summonerData(): MatchParticipant | null {
    return this.match.getParticipantData(this.summoner.puuid);
  }

  get details(): SummonerMatchDetails {
    return {
      isWinner: this.isWinner,
      match: this.match.details,
      summoner: this.summoner.lightDetails,
      summonerSide: this.summonerSide,
      summonerTeamKey: this.summonerTeamKey,
      summonerIndex: this.summonerIndex,
    };
  }
}
