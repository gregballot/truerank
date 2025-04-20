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

  public getParticipantSide(puuid: string): TeamSide | null {
    const isParticipant = (participant: MatchParticipant): boolean => {
      return participant.summoner.puuid === puuid;
    };

    if (this.redTeam.some(isParticipant)) return 'red';
    if (this.blueTeam.some(isParticipant)) return 'blue';
    return null;
  }

  public getParticipantTeamKey(puuid: string): TeamKey | null {
    return this.getParticipantSide(puuid) === 'red' ? 'redTeam' : 'blueTeam';
  }

  public getParticipantIndex(puuid: string, pTeamKey?: TeamKey): number {
    const teamKey = pTeamKey ?? this.getParticipantTeamKey(puuid);
    if (!teamKey) {
      return -1;
    }
    return this[teamKey].findIndex(participant => participant.summoner.puuid === puuid);
  }

  public getParticipantData(puuid: string): MatchParticipant | null {
    const teamKey = this.getParticipantTeamKey(puuid);
    if (!teamKey) {
      return null;
    }
    const participantIndex = this.getParticipantIndex(puuid, teamKey);
    return this[teamKey][participantIndex];
  }

  public isParticipantWinner(puuid: string): boolean {
    return this.winnerSide === this.getParticipantSide(puuid);
  }
}
