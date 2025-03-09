import { Summoner, SummonerDetails } from '../../Summoners/entities/Summoner';

export type MatchParticipant = {
  summoner: Summoner;
  championId: number;
  championName: string;
  championLevel: number;
  kills: number;
  deaths: number;
  assists: number;
  totalMinionsKilled: number;
  won: boolean;
};

export type MatchTeamDetails = {
  participants: (Omit<MatchParticipant, 'summoner'> & {
    summoner: SummonerDetails;
  })[];
  isWinner: boolean;
};

export class MatchTeam {
  constructor(private readonly participants: MatchParticipant[]) {}

  get details(): MatchTeamDetails {
    return {
      participants: this.participants.map((participant) => ({
        ...participant,
        summoner: participant.summoner.details,
      })),
      isWinner: this.isWinner,
    };
  }

  get isWinner(): boolean {
    return this.participants.some((participant) => participant.won);
  }
}
