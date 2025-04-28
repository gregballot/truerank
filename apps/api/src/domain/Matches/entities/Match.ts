import {
  MatchData,
  MatchMetadata,
  MatchParticipant,
  TeamKey,
  TeamSide,
} from '@truerank/shared/types';

const MetricFields = [
  'kills',
  'deaths',
  'assists',
  'firstBloodKill',
  'firstBloodAssist',
  'soloKills',

  'laneMinionsKilled',
  'neutralMinionsKilled',
  'totalMinionsKilled',
  'dragonKills',
  'baronKills',
  'turretKills',
  'turretTakedowns',

  'damageDealtToChampions',
  'damageDealtToObjectives',
  'damageTaken',
  'totalHeal',
  'goldEarned',
  'visionScore',
  'distanceTraveled',
] as const;

type TeamMetric = {
  total: number;
  highest: number;
  lowest: number;
  average: number;
};

export type TeamMetrics = {
  [K in keyof Pick<
    MatchParticipant,
    (typeof MetricFields)[number]
  >]: TeamMetric;
};

export class Match {
  private _redTeamMetrics: TeamMetrics;
  private _blueTeamMetrics: TeamMetrics;

  constructor(
    private readonly metadata: MatchMetadata,
    private readonly redTeam: MatchParticipant[],
    private readonly blueTeam: MatchParticipant[],
    private readonly isNew: boolean
  ) {
    this._redTeamMetrics = this.calcTeamMetrics(this.redTeam);
    this._blueTeamMetrics = this.calcTeamMetrics(this.blueTeam);
  }

  private calcTeamMetrics(team: MatchParticipant[]): TeamMetrics {
    const metrics = this.initTeamMetrics();

    for (const participant of team) {
      for (const field of MetricFields) {
        const participantValue = participant[field];

        metrics[field].total += participantValue;
        metrics[field].highest = Math.max(
          metrics[field].highest,
          participantValue
        );
        metrics[field].lowest = Math.min(
          metrics[field].lowest,
          participantValue
        );
      }
    }

    for (const key in metrics) {
      metrics[key as keyof TeamMetrics].average =
        team.length > 0
          ? metrics[key as keyof TeamMetrics].total / team.length
          : 0;
    }

    return metrics;
  }

  private initTeamMetrics(): TeamMetrics {
    return Object.fromEntries(
      MetricFields.map((field) => [field, this.initMetric()])
    ) as TeamMetrics;
  }

  private initMetric(): TeamMetric {
    return {
      total: 0,
      highest: 0,
      lowest: Infinity,
      average: 0,
    };
  }

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
    return this[teamKey].findIndex(
      (participant) => participant.summoner.puuid === puuid
    );
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

  public getTeamMetrics(side: TeamSide): TeamMetrics {
    return side === 'red' ? this._redTeamMetrics : this._blueTeamMetrics;
  }
}
