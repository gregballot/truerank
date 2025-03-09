import { Summoner } from '../../Summoners/entities/Summoner';
import { Match } from '../entities/Match';
import { MatchTeam, MatchParticipant } from '../entities/MatchTeam';

import { queueNameMapping } from '../helpers/queueNameMapping';

type RiotParticipant = {
  puuid: string;
  riotIdGameName: string;
  riotIdTagline: string;
  championId: number;
  championName: string;
  championLevel: number;
  kills: number;
  deaths: number;
  assists: number;
  totalMinionsKilled: number;
  win: boolean;
};

export class MatchAdapter {
  private readonly baseUrl = 'https://europe.api.riotgames.com/lol';
  private readonly pageSize = 5;

  constructor(private readonly riotApiKey: string) {}

  private async getMatchIds(
    puuid: string,
    params?: {
      start?: number;
    }
  ): Promise<string[]> {
    const queryParams = new URLSearchParams();

    const paramMapping = {
      start: params?.start?.toString(),
      count: this.pageSize.toString(),
    };

    Object.entries(paramMapping).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value);
      }
    });

    const queryString = queryParams.toString();
    const url = `${this.baseUrl}/match/v5/matches/by-puuid/${puuid}/ids${
      queryString ? `?${queryString}` : ''
    }`;

    const response = await fetch(url, {
      headers: {
        'X-Riot-Token': this.riotApiKey,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch matches: ${response.status} ${response.statusText}`
      );
    }

    return response.json() as Promise<string[]>;
  }

  async getMatches(
    puuid: string,
    params?: {
      start?: number;
    }
  ): Promise<Match[]> {
    const matchIds = await this.getMatchIds(puuid, params);
    const matches = [];

    for (const matchId of matchIds) {
      const response = await fetch(
        `${this.baseUrl}/match/v5/matches/${matchId}`,
        {
          headers: {
            'X-Riot-Token': this.riotApiKey,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch match ${matchId}: ${response.status} ${response.statusText}`
        );
      }

      const matchData = await response.json();
      matches.push(matchData);
    }

    return matches.map((match) => {
      const mapParticipantToTeamMember = (
        participant: RiotParticipant
      ): MatchParticipant => {
        return {
          summoner: new Summoner({
            puuid: participant.puuid,
            gameName: participant.riotIdGameName,
            tagLine: participant.riotIdTagline,
          }),
          championId: participant.championId,
          championName: participant.championName,
          championLevel: participant.championLevel,
          kills: participant.kills,
          deaths: participant.deaths,
          assists: participant.assists,
          totalMinionsKilled: participant.totalMinionsKilled,
          won: participant.win,
        };
      };

      const redTeamParticipants = match.info.participants.slice(0, 5);
      const blueTeamParticipants = match.info.participants.slice(5, 10);

      const redTeam = new MatchTeam(
        redTeamParticipants.map(mapParticipantToTeamMember)
      );

      const blueTeam = new MatchTeam(
        blueTeamParticipants.map(mapParticipantToTeamMember)
      );

      return new Match(
        {
          gameId: match.info.gameId,
          gameMode: match.info.gameMode,
          gameDuration: match.info.gameDuration,
          gameCreation: new Date(match.info.gameCreation),
          queue:
            queueNameMapping[
              match.info.queueId as keyof typeof queueNameMapping
            ],
        },
        redTeam,
        blueTeam
      );
    });
  }
}
