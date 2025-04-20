import { SummonerMatchDetails } from '@truerank/shared/types';

import { MatchListCard } from './MatchListCard/MatchListCard';

import styles from './MatchList.module.css';

type Props = {
  isProfileLoading: boolean;
  isMatchesLoading: boolean;
  summonerMatches: SummonerMatchDetails[];
  loadMore: () => void;
  hasNextPage: boolean;
};

export function MatchList({
  isProfileLoading,
  isMatchesLoading,
  summonerMatches,
  loadMore,
  hasNextPage,
}: Props) {
  return (
    <div className={styles.matchList}>
      {
        !isProfileLoading &&
        summonerMatches.map((summonerMatch, index) => (
          <MatchListCard
            key={`${
              summonerMatch.match.metadata.gameId}\
              ${summonerMatch.summoner.puuid
            }`}
            summonerMatch={summonerMatch}
            className={styles.card}
            style={{ '--i': index } as React.CSSProperties}
          />
        ))
      }

      {
        hasNextPage && (
          <button
            disabled={isMatchesLoading}
            onClick={loadMore}
            className={styles.showMore}
          >
            {
              isMatchesLoading ? (
                <span className={styles.spinner} />
              ) : (
                <span>Show more</span>
              )
            }
          </button>
        )
      }
    </div>
  );
}
