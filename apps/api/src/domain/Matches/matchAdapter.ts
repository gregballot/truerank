import { SharedTypes } from '@truerank/shared';

import { Match } from './entities/Match';

import { queueNameMapping } from './helpers/queueNameMapping';
import { RiotApiDriver } from '../../helpers/riotApiDriver';

import { type RiotParticipant } from '../../helpers/riotApiDriver/types';

export class MatchAdapter {
  private riotApi: RiotApiDriver;

  constructor(private readonly riotApiKey: string) {
    this.riotApi = new RiotApiDriver(this.riotApiKey, "EUW");
  }

  async getMatches(puuid: string, params?: { start?: number }): Promise<Match[]> {
    const matchIds = await this.riotApi.getMatchIdsByPuuid(puuid, params);
    const matches = await this.riotApi.getMatchesByIds(matchIds);

    return matches.map((match) => {
      const redTeamParticipants = match.info.participants.slice(0, 5);
      const blueTeamParticipants = match.info.participants.slice(5, 10);

      const mapParticipantData = (p: RiotParticipant): SharedTypes.MatchParticipant => ({
        summoner: {
          puuid: p.puuid,
          gameName: p.riotIdGameName,
          tagLine: p.riotIdTagline,
        },

        won: p.win,
        championId: p.championId,
        championName: p.championName,
        championLevel: p.champLevel,

        kills: p.kills,
        deaths: p.deaths,
        assists: p.assists,
        totalMinionsKilled: p.totalMinionsKilled + p.neutralMinionsKilled,

        items: [
          p.item0,
          p.item1,
          p.item2,
          p.item3,
          p.item4,
          p.item5,
        ],
        trinket: p.item6,
      });

      return new Match(
        {
          gameId: match.info.gameId,
          gameMode: match.info.gameMode,
          gameDuration: match.info.gameDuration,
          gameCreation: new Date(match.info.gameCreation),
          queue: queueNameMapping[
            match.info.queueId as keyof typeof queueNameMapping
          ],
        },
        redTeamParticipants.map(mapParticipantData),
        blueTeamParticipants.map(mapParticipantData)
      );
    });
  }
}
