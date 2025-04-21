import { SummonerMatchDetails, SummonerMatchesRecap } from '@truerank/shared/types';

import { MatchList } from '../MatchList/MatchList';
import { MatchesRecap } from '../MatchesRecap/MatchesRecap';
import { MatchesFiltersBar } from '../MatchesFiltersBar/MatchesFiltersBar';

import styles from './ProfileMatches.module.css';

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
      <MatchesFiltersBar />
      <MatchesRecap
        isLoading={isProfileLoading || isMatchesLoading}
        recap={recap}
        totalMatches={matchesData.length}
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
