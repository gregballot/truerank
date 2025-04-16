import { SummonerMatchData } from '@truerank/shared/types';
import { MatchList } from '../MatchList/MatchList';
import styles from './ProfileMatches.module.css';

type Props = {
  isProfileLoading: boolean,
  isMatchesLoading: boolean,
  isFetchingNextPage: boolean,
  hasNextPage: boolean,
  matches: SummonerMatchData[];
  fetchNextPage: () => void;
}

export function ProfileMatches({
  isProfileLoading,
  isMatchesLoading,
  isFetchingNextPage,
  hasNextPage,
  matches,
  fetchNextPage,
}: Props) {
  return (
    <div className={styles.profileMatches}>
      <MatchList
        isProfileLoading={isProfileLoading}
        isMatchesLoading={isMatchesLoading || isFetchingNextPage}
        summonerMatches={matches}
        loadMore={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};
