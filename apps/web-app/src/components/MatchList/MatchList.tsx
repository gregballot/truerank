import { SharedTypes } from '@truerank/shared';
import { MatchListCard } from './MatchListCard/MatchListCard';

type Props = {
  summonerMatches: SharedTypes.SummonerMatchData[];
};

export function MatchList({ summonerMatches }: Props) {
  return (
    <div>
      {
        summonerMatches.map((summonerMatch, index) => (
          <MatchListCard key={index} summonerMatch={summonerMatch} />
        ))
      }
    </div>
  );
}
