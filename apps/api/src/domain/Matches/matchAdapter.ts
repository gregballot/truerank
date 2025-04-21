import { MatchParticipant, QueueNames } from '@truerank/shared/types';
import { QueueFilter } from '@truerank/shared/routes';

import { Match } from './entities/Match';

import { RiotApiDriver } from '../../helpers/riotApiDriver';

import { type RiotParticipant } from '../../helpers/riotApiDriver/types';
import { queueNameMapping, RiotQueues, roleMapping } from '../../helpers/riotApiDriver/mappedTypes';

export class MatchAdapter {
  private riotApi: RiotApiDriver;

  constructor(private readonly riotApiKey: string) {
    this.riotApi = new RiotApiDriver(this.riotApiKey, "EUW");
  }

  public async getMatches(puuid: string, params?: {
    filter: QueueFilter,
    page?: number,
    invalidateCache?: boolean,
  }): Promise<Match[]> {
    const matchIds = await this.riotApi.getMatchIdsByPuuid(puuid, {
      filter: params?.filter ?? "all",
      pageSize: 10,
      page: params?.page ?? 1,
      invalidateCache: params?.invalidateCache,
    });
    const matchesResult = await this.riotApi.getMatchesByIds(matchIds);

    const supportedQueues = [
      RiotQueues[QueueNames.NORMAL_DRAFT],
      RiotQueues[QueueNames.RANKED_SOLODUO],
      RiotQueues[QueueNames.NORMAL_BLIND],
      RiotQueues[QueueNames.RANKED_FLEX],
      RiotQueues[QueueNames.ARAM],
      RiotQueues[QueueNames.SWIFTPLAY],
    ];
    const supportedMatches = matchesResult.filter(matchResult => {
      return supportedQueues.includes(matchResult.data.info.queueId);
    })

    return supportedMatches.map((supportedMatch) => {
      const { data: match, fromCache } = supportedMatch;
      const redTeamParticipants = match.info.participants.slice(0, 5);
      const blueTeamParticipants = match.info.participants.slice(5, 10);

      const mapParticipantData = (p: RiotParticipant): MatchParticipant => ({
        summoner: {
          puuid: p.puuid,
          gameName: p.riotIdGameName,
          tagLine: p.riotIdTagline,
        },

        role: roleMapping[p.teamPosition],
        championId: p.championId,
        championName: p.championName,
        championLevel: p.champLevel,

        summonerSpells: [
          p.summoner1Id,
          p.summoner2Id,
        ],
        runeStyles: p.perks.styles.map(perk => perk.style),

        won: p.win,
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

      // For sniping missing queueIds
      // see https://static.developer.riotgames.com/docs/lol/queues.json
      //
      // if (match.info.gameMode == "SWIFTPLAY") {
      //   console.log("==================================================");
      //   console.log("==================================================");
      //   console.log();
      //   console.log(match.info.gameMode, match.info.queueId);
      //   console.log();
      //   console.log("==================================================");
      //   console.log("==================================================");
      // }

      return new Match(
        {
          gameId: match.info.gameId,
          gameMode: match.info.gameMode,
          gameDuration: match.info.gameDuration,
          gameCreation: new Date(match.info.gameCreation),
          queueName: queueNameMapping[
            match.info.queueId as keyof typeof queueNameMapping
          ],
        },
        redTeamParticipants.map(mapParticipantData),
        blueTeamParticipants.map(mapParticipantData),
        !fromCache && !params?.invalidateCache, // isNew
      );
    });
  }
}
