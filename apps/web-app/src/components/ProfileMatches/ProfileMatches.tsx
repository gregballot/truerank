/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@tanstack/react-query';

import styles from './ProfileMatches.module.css';

import { fetchMatches } from '../../api/matches';
import { MatchList } from '../MatchList/MatchList';
import { useEffect, useState } from 'react';
import { SummonerMatchData } from '@truerank/shared/types';

type Props = {
  isProfileLoading: boolean,
  summonerFullName: {
    name?: string;
    tag?: string;
  },
}

export function ProfileMatches({
  summonerFullName: {
    name,
    tag
  }
}: Props) {
  const [matches, setMatches] = useState<SummonerMatchData[]>([])
  const [matchOffset, setMatchOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // fetch matches query
  const {
    data: newMatches,
    isLoading: isFirstFetching,
    error,
  } = useQuery({
    queryKey: ['matches', name, tag, matchOffset],
    queryFn: () => fetchMatches(name!, tag!, matchOffset, false),
    enabled: Boolean(name && tag),
    retry: false,
  });

  // manage loading and data appending
  useEffect(() => {
    if (!isFirstFetching) {
      setIsLoading(false);
    }

    if (newMatches && newMatches.length > 0) {
      setMatches((prev: SummonerMatchData[]) => [...prev, ...newMatches]);
    }
  }, [newMatches]);

  // reset Matches on summoner change
  useEffect(() => {
    setMatches([]);
    setMatchOffset(0);
    setIsLoading(true);
  }, [name, tag]);

  const loadMore = () => {
    setIsLoading(true);
    setMatchOffset(prev => prev + 10); // query key changes -> refetch
  };

  return (
    <div className={styles.profileMatches}>
      {
        <MatchList
          isLoading={isLoading}
          summonerMatches={matches}
          loadMore={loadMore}
        />
      }
      {
        error && (
          <p>Error: {JSON.stringify(error)}</p>
        )
      }
    </div>
  );
};
