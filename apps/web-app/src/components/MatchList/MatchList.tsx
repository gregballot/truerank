import { SharedTypes } from '@truerank/shared';
import { MatchListCard } from './MatchListCard/MatchListCard';

import styles from './MatchList.module.css';

type Props = {
  summonerMatches: SharedTypes.SummonerMatchData[];
};

export function MatchList({ summonerMatches }: Props) {
  return (
    <div className={styles.matchList}>
      {
        summonerMatches.map((summonerMatch, index) => (
          <MatchListCard key={index} summonerMatch={summonerMatch} />
        ))
      }
    </div>
  );
}
