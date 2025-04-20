import { SummonerMatchDetails, SummonerMatchesRecap } from '@truerank/shared/types';

import { MatchList } from '../MatchList/MatchList';
import styles from './ProfileMatches.module.css';
import { MatchesRecap } from '../MatchesRecap/MatchesRecap';

type Props = {
  isProfileLoading: boolean;
  isMatchesLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  matchesData: SummonerMatchDetails[];
  recap: SummonerMatchesRecap;
  fetchNextPage: () => void;
}

export function ProfileMatches({
  isProfileLoading,
  isMatchesLoading,
  isFetchingNextPage,
  hasNextPage,
  matchesData,
  recap,
  fetchNextPage,
}: Props) {
  return (
    <div className={styles.profileMatches}>
      <MatchesRecap
        isLoading={isProfileLoading || isMatchesLoading}
        recap={recap}
      />
      <MatchList
        isProfileLoading={isProfileLoading || isMatchesLoading}
        isMatchesLoading={isMatchesLoading || isFetchingNextPage}
        summonerMatches={matchesData}
        loadMore={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};
