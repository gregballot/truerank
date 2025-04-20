import { SummonerMatches } from '@truerank/shared/types';

import { MatchAdapter } from '../../Matches/matchAdapter';
import { SummonerAdapter } from '../summonerAdapter';
import { SummonerMatch } from '../entities/SummonerMatch';
import { SummonerMatchesRecapBuilder } from '../services/SummonerMatchesRecapBuilder';

type Params = {
  summonerName: string;
  summonerTag: string;
  page?: number;
  invalidateCache?: boolean;
};

type Dependencies = {
  matchAdapter: MatchAdapter;
  summonerAdapter: SummonerAdapter;
};

export const getSummonerMatches = async (
  { summonerName, summonerTag, page = 1, invalidateCache }: Params,
  { matchAdapter, summonerAdapter }: Dependencies
): Promise<SummonerMatches> => {
  const summoner = await summonerAdapter.getLightSummonerByName(
    summonerName,
    summonerTag,
  );

  const matches = await matchAdapter.getMatches(
    summoner.puuid,
    {
      page,
      invalidateCache
    }
  );

  const summonerMatches = matches.map(
    (match) => new SummonerMatch(match, summoner)
  );

  return {
    page: Number(page),
    count: summonerMatches.length,
    matchesData: summonerMatches.map((summonerMatch) => summonerMatch.details),
    recap: SummonerMatchesRecapBuilder.fromMatches(summonerMatches),
  };
};
