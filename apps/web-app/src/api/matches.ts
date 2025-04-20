import * as Routes from '@truerank/shared/routes';
import { buildApiRequestUrl } from './helpers';

import { z } from 'zod';

const { path, query, response } = Routes.SummonerMatchesRoute;

type ResponseData = z.infer<typeof response>;

export async function fetchMatches(
  summonerName: string,
  summonerTag: string,
  page?: number,
  forceRefresh?: boolean,
): Promise<ResponseData> {
  const url = buildApiRequestUrl(path, query, {
    summonerName,
    summonerTag,
    page,
    invalidateCache: forceRefresh,
  });

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch match history');
  }

  const json = await res.json();
  return response.parse(json);
}
