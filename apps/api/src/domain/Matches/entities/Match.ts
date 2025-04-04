import { SummonerDetails } from '../../Summoners/entities/Summoner';

type MatchMetadata = {
  gameDuration: number;
  gameMode: string;
  queue: string;
  gameId: string;
  gameCreation: Date;
};

export type MatchParticipant = {
  summoner: SummonerDetails;
  championId: number;
  championName: string;
  championLevel: number;
  kills: number;
  deaths: number;
  assists: number;
  totalMinionsKilled: number;
  won: boolean;
};

export type MatchDetails = {
  metadata: MatchMetadata;
  redTeam: MatchParticipant[];
  blueTeam: MatchParticipant[];
  winnerSide: 'red' | 'blue';
};

export class Match {
  constructor(
    private readonly metadata: MatchMetadata,
    private readonly redTeam: MatchParticipant[],
    private readonly blueTeam: MatchParticipant[]
  ) {}

  get details(): MatchDetails {
    return {
      metadata: this.metadata,
      redTeam: this.redTeam,
      blueTeam: this.blueTeam,
      winnerSide: this.winnerSide,
    };
  }

  get winnerSide(): 'red' | 'blue' {
    const hasRedWon = this.redTeam.some((participant) => participant.won);
    return hasRedWon ? 'red' : 'blue';
  }

  public isParticipantWinner(puuid: string): boolean {
    const winningTeam =
      this.winnerSide === 'red' ? this.redTeam : this.blueTeam;

    return winningTeam.some(
      (participant) => participant.summoner.puuid === puuid
    );
  }
}
