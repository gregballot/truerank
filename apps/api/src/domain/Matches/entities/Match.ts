import { SharedTypes } from "@truerank/shared";

export class Match {
  constructor(
    private readonly metadata: SharedTypes.MatchMetadata,
    private readonly redTeam: SharedTypes.MatchParticipant[],
    private readonly blueTeam: SharedTypes.MatchParticipant[]
  ) {}

  get details(): SharedTypes.MatchData  {
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
