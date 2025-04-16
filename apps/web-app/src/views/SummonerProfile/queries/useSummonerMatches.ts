import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { fetchMatches } from '../../../api/matches';
import { SummonerLightDetails, SummonerMatchData } from '@truerank/shared/types';
import { buildMatchesQueryKey, MatchesQueryKey } from '../../../api/helpers';

/**
 * Hook to fetch paginated match history for a summoner.
 */
export function useSummonerMatches(
  summoner?: SummonerLightDetails,
  isRefreshing = false,
) {
  return useInfiniteQuery<
    SummonerMatchData[],                        // TQueryFnData
    Error,                                      // TError
    InfiniteData<SummonerMatchData[], number>,  // TData
    MatchesQueryKey,                            // TQueryKey
    number                                      // TPageParam
  >({
    queryKey: buildMatchesQueryKey(summoner),

    queryFn: ({ pageParam = 1 }) => {
      return fetchMatches(
        summoner!.gameName,
        summoner!.tagLine,
        pageParam,
        isRefreshing,
      );
    },
    
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => allPages.length + 1,
    
    enabled: Boolean(summoner),
    retry: false,
    refetchOnWindowFocus: false,
  });
}
