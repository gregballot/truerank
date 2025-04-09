import { useQuery } from '@tanstack/react-query';

import styles from './ProfileMatches.module.css';

import { fetchMatches } from '../../api/matches';
import { MatchList } from '../MatchList/MatchList';

type Props = {
  player: {
    name?: string;
    tag?: string;
  }
}

export function ProfileMatches({ player: { name, tag } }: Props) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['matches', name, tag],
    queryFn: () => fetchMatches(name!, tag!),
    enabled: !!name && !!tag,
    retry: false,
  });

  return (
    <div className={styles.profileMatches}>
      <button
        onClick={() => refetch()}
        style={{
          width: 80,
          marginBottom: 10
        }} >
        Refresh
      </button>

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
}
