import { SummonerLightDetails } from '@truerank/shared/types';
import { z } from 'zod';

export function buildApiRequestUrl<TQuery extends z.ZodTypeAny>(
  path: string,
  querySchema: TQuery,
  params: z.infer<TQuery>
): string {
  const url = new URL(`/api/${path}`, window.location.origin);
  const validated = querySchema.parse(params);

  Object.entries(validated).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, String(value));
    }
  });

  return url.toString();
}

export type ProfileQueryKey = [string, string, string];
export function buildProfileQueryKey(
  name?: string,
  tag?: string,
): ProfileQueryKey {
  return [
    'profile',
    name ?? "",
    tag ?? "",
  ];
}

export type MatchesQueryKey = [string, string, string, string];
export function buildMatchesQueryKey(
  summoner?: SummonerLightDetails,
  filter?: string | null,
): MatchesQueryKey {
  return [
    'matches',
    summoner?.gameName ?? "",
    summoner?.tagLine ?? "",
    filter ?? "",
  ];
}
