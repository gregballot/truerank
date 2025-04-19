import {
  MatchData,
  MatchMetadata,
  MatchParticipant,
  TeamKey,
  TeamSide,
} from "@truerank/shared/types";

export class Match {
  constructor(
    private readonly metadata: MatchMetadata,
    private readonly redTeam: MatchParticipant[],
    private readonly blueTeam: MatchParticipant[],
    private readonly isNew: boolean,
  ) {}

  get details(): MatchData {
    return {
      metadata: this.metadata,
      redTeam: this.redTeam,
      blueTeam: this.blueTeam,
      winnerSide: this.winnerSide,
      isNew: this.isNew,
    };
  }

  get winnerSide(): TeamSide {
    return this.redTeam[0].won ? 'red' : 'blue';
  }

  public getParticipantSide(puuid: string): TeamSide {
    const isParticipantRed = this.redTeam.some((participant) => {
      return participant.summoner.puuid === puuid;
    });

    return isParticipantRed ? 'red' : 'blue';
  }

  public getParticipantTeamKey(puuid: string): TeamKey {
    return this.getParticipantSide(puuid) === 'red' ? 'redTeam' : 'blueTeam';
  }

  public getParticipantIndex(puuid: string): number {
    const teamKey = this.getParticipantTeamKey(puuid);
    return this[teamKey].findIndex(participant => participant.summoner.puuid === puuid);
  }

  public getParticipantData(puuid: string): MatchParticipant {
    const teamKey = this.getParticipantTeamKey(puuid);
    const participantIndex = this.getParticipantIndex(puuid);

    return this[teamKey][participantIndex];
  }

  public isParticipantWinner(puuid: string): boolean {
    return this.winnerSide === this.getParticipantSide(puuid);
  }
}
