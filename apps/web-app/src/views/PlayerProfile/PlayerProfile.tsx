import clsx from 'clsx';

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import styles from './PlayerProfile.module.css';
import sharedStyles from '../../styles/shared.module.css';

import { fetchMatches } from '../../api/matches';

export function PlayerProfile() {
  const { playerName, playerTag } = useParams<{ playerName: string, playerTag: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ['matches', playerName, playerTag],
    queryFn: () => fetchMatches(playerName!, playerTag!),
    enabled: !!playerName && !!playerTag,
    staleTime: 1000 * 60 * 5, // 5 min
  })

  return (
    <div className={clsx(styles.playerProfile, sharedStyles.view)}>
      <p>
        <Link to="/">← Back</Link>
      </p>
      <h1>{playerName}#{playerTag}'s true profile</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {JSON.stringify(error)}</p>}
      {data && <p>{JSON.stringify(data)}</p>}
    </div>
  );
}
