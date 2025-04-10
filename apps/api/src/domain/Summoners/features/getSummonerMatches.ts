import { SharedTypes } from '@truerank/shared';

import { MatchAdapter } from '../../Matches/matchAdapter';
import { SummonerAdapter } from '../summonerAdapter';
import { SummonerMatch } from '../entities/SummonerMatch';

type Params = {
  summonerName: string;
  summonerTag: string;
};

type Dependencies = {
  matchAdapter: MatchAdapter;
  summonerAdapter: SummonerAdapter;
};

export const getSummonerMatches = async (
  { summonerName, summonerTag }: Params,
  { matchAdapter, summonerAdapter }: Dependencies
): Promise<SharedTypes.SummonerMatchData[]> => {
  const summoner = await summonerAdapter.getLightSummonerByName(
    summonerName,
    summonerTag,
  );

  const matches = await matchAdapter.getMatches(summoner.puuid);
  const summonerMatches = matches.map(
    (match) => new SummonerMatch(match, summoner)
  );

  return summonerMatches.map((summonerMatch) => summonerMatch.details);
};
