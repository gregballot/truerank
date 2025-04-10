import * as Routes from '@truerank/shared/routes';
import { buildApiRequestUrl } from './helpers';

import { z } from 'zod';

const { path, query, response } = Routes.SummonerProfileRoute;

type ResponseData = z.infer<typeof response>;

export async function fetchProfile(
  summonerName: string,
  summonerTag: string
): Promise<ResponseData> {
  const url = buildApiRequestUrl(path, query, { summonerName, summonerTag });

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch profile');
  }

  const json = await res.json();
  return response.parse(json);
}
