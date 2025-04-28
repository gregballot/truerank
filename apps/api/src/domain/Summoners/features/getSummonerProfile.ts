import { SummonerData } from '@truerank/shared/types';

import { SummonerAdapter } from '../summonerAdapter';

type Params = {
  summonerName: string;
  summonerTag: string;
  invalidateCache?: boolean;
};

type Dependencies = {
  summonerAdapter: SummonerAdapter;
};

export const getSummonerProfile = async (
  { summonerName, summonerTag, invalidateCache }: Params,
  { summonerAdapter }: Dependencies
): Promise<SummonerData> => {
  const summoner = await summonerAdapter.getSummonerByName(
    summonerName,
    summonerTag,
    invalidateCache,
  );

  return summoner.details;
};
