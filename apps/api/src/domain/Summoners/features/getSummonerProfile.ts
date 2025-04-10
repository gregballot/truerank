import { SharedTypes } from '@truerank/shared';

import { SummonerAdapter } from '../summonerAdapter';

type Params = {
  summonerName: string;
  summonerTag: string;
};

type Dependencies = {
  summonerAdapter: SummonerAdapter;
};

export const getSummonerProfile = async (
  { summonerName, summonerTag }: Params,
  { summonerAdapter }: Dependencies
): Promise<SharedTypes.SummonerData> => {
  const summoner = await summonerAdapter.getSummonerByName(
    summonerName,
    summonerTag,
  );

  return summoner.details;
};
