import { MatchTeam, MatchTeamDetails } from './MatchTeam';

type MatchMetadata = {
  gameDuration: number;
  gameMode: string;
  queue: string;
  gameId: string;
  gameCreation: Date;
};

export type MatchDetails = {
  metadata: MatchMetadata;
  redTeam: MatchTeamDetails;
  blueTeam: MatchTeamDetails;
  winnerSide: 'red' | 'blue';
};

export class Match {
  constructor(
    private readonly metadata: MatchMetadata,
    private readonly redTeam: MatchTeam,
    private readonly blueTeam: MatchTeam
  ) {}

  get details(): MatchDetails {
    return {
      metadata: this.metadata,
      redTeam: this.redTeam.details,
      blueTeam: this.blueTeam.details,
      winnerSide: this.winnerSide,
    };
  }

  get winnerSide(): 'red' | 'blue' {
    return this.redTeam.isWinner ? 'red' : 'blue';
  }

  public isParticipantWinner(puuid: string): boolean {
    const winningTeam =
      this.winnerSide === 'red' ? this.redTeam : this.blueTeam;

    return winningTeam.details.participants.some(
      (participant) => participant.summoner.puuid === puuid
    );
  }
}
