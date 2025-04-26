import { SummonerMatches } from '@truerank/shared/types';
import { QueueFilter } from '@truerank/shared/routes';

import { MatchAdapter } from '../../Matches/matchAdapter';
import { SummonerAdapter } from '../summonerAdapter';
import { SummonerMatch } from '../entities/SummonerMatch';
import { TagsEngine } from '../../Tags/entities/TagsEngine';
import { SummonerMatchesRecapBuilder } from '../services/SummonerMatchesRecapBuilder';

type Params = {
  summonerName: string;
  summonerTag: string;
  filter: QueueFilter;
  page?: number;
  invalidateCache?: boolean;
};

type Dependencies = {
  matchAdapter: MatchAdapter;
  summonerAdapter: SummonerAdapter;
};

export const getSummonerMatches = async (
  {
    summonerName,
    summonerTag,
    filter,
    page = 1,
    invalidateCache,
  }: Params,
  {
    matchAdapter,
    summonerAdapter,
  }: Dependencies
): Promise<SummonerMatches> => {
  const summoner = await summonerAdapter.getLightSummonerByName(
    summonerName,
    summonerTag,
  );

  const matches = await matchAdapter.getMatches(
    summoner.puuid,
    {
      filter,
      page,
      invalidateCache,
    }
  );

  const summonerMatches = matches.map(match => {
    return new SummonerMatch(
      match,
      summoner.lightDetails,
      TagsEngine.forMatchParticipant(summoner.puuid, match).tagsDetails,
    );
  });

  return {
    page: Number(page),
    count: summonerMatches.length,
    matchesData: summonerMatches.map((summonerMatch) => summonerMatch.details),
    recap: SummonerMatchesRecapBuilder.fromMatches(summonerMatches),
  };
};
