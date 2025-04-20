import { SummonerLightDetails, SummonerMatches } from "@truerank/shared/types";

import { useMemo } from "react";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import { mergeRecaps } from "../../../helpers/mergeRecaps";
import { fetchMatches } from "../../../api/matches";
import { buildMatchesQueryKey, MatchesQueryKey } from "../../../api/helpers";

/**
 * Hook to fetch paginated match history for a summoner.
 */
export function useSummonerMatches(
  filter: string | null,
  summoner?: SummonerLightDetails,
  isRefreshing = false,
) {
  const query = useInfiniteQuery<
    SummonerMatches, // TQueryFnData
    Error, // TError
    InfiniteData<SummonerMatches, number>, // TData
    MatchesQueryKey, // TQueryKey
    number // TPageParam
  >({
    queryKey: buildMatchesQueryKey(summoner, filter),

    queryFn: ({ pageParam = 1 }) => {
      return fetchMatches(
        summoner!.gameName,
        summoner!.tagLine,
        filter!,
        pageParam,
        isRefreshing,
      );
    },

    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.page + 1,

    enabled: Boolean(summoner && filter?.length),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const pages = useMemo(() => query.data?.pages ?? [], [query.data]);
  const recap = useMemo(() => {
    return mergeRecaps(pages);
  }, [pages]);

  return {
    ...query,
    allMatches: pages.flatMap(page => page.matchesData),
    recap,
  };
}
