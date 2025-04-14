import { SharedTypes } from '@truerank/shared';
import { MatchListCard } from './MatchListCard/MatchListCard';

import styles from './MatchList.module.css';

type Props = {
  isLoading: boolean,
  summonerMatches: SharedTypes.SummonerMatchData[];
  loadMore: () => void;
};

export function MatchList({
  isLoading,
  summonerMatches,
  loadMore,
}: Props) {
  return (
    <div className={styles.matchList}>
      {
        summonerMatches.map((summonerMatch, index) => (
          <MatchListCard
            key={index}
            summonerMatch={summonerMatch}
            className={styles.card}
            style={{ '--i': index } as React.CSSProperties}
          />
        ))
      }

      <button
        disabled={isLoading}
        onClick={loadMore}
        className={styles.showMore}
      >
        {
          isLoading ? (
            <span className={styles.spinner} />
          ) : (
            <span>Show more</span>
          )
        }
      </button>
    </div>
  );
}
