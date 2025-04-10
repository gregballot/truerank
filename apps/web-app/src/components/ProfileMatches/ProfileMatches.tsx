import { forwardRef, useImperativeHandle } from 'react';
import { useQuery } from '@tanstack/react-query';

import styles from './ProfileMatches.module.css';

import { fetchMatches } from '../../api/matches';
import { MatchList } from '../MatchList/MatchList';

type Props = {
  isProfileLoading: boolean,
  player: {
    name?: string;
    tag?: string;
  }
}

export type ProfileMatchesHandle = {
  refetch: () => void;
};

export const ProfileMatches = forwardRef<
  ProfileMatchesHandle,
  Props
>(({ player: { name, tag } }: Props, ref) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['matches', name, tag],
    queryFn: () => fetchMatches(name!, tag!),
    enabled: !!name && !!tag,
    retry: false,
  });

  useImperativeHandle(ref, () => ({
    refetch,
  }));

  return (
    <div className={styles.profileMatches}>
      {isLoading && <p>Loading...</p>}

      {
        error && (
          <p>Error: {JSON.stringify(error)}</p>
        )
      }
      {
        data && (
          <MatchList summonerMatches={data} />
        )
      }
    </div>
  );
});
