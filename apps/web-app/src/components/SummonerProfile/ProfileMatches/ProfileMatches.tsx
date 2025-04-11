import { useQuery } from '@tanstack/react-query';

import styles from './ProfileMatches.module.css';

import { fetchMatches } from '../../../api/matches';
import { MatchList } from '../../MatchList/MatchList';

type Props = {
  isProfileLoading: boolean,
  player: {
    name?: string;
    tag?: string;
  },
}

export function ProfileMatches({
  player: {
    name,
    tag
  }
}: Props) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['matches', name, tag],
    queryFn: () => fetchMatches(name!, tag!),
    enabled: !!name && !!tag,
    retry: false,
  });

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
};
