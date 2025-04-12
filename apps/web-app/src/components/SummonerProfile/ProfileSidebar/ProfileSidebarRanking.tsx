import { SummonerLeague } from "@truerank/shared/types";

import { calcWinRate } from "../../../helpers/utils";

import styles from "./ProfileSidebarRanking.module.css";
import { getCustomEmblemUrl } from "../../../helpers/staticAssets";

type Props = {
  name: string;
  ranking?: SummonerLeague;
};

export function ProfileSidebarRanking(
  { name, ranking }: Props
) {
  const winRate = ranking ? calcWinRate(ranking.wins, ranking.losses) : null;

  return (
    <div className={styles.sidebarRanking}>
      {
        ranking ? (
          <>
            <h3>{ name }</h3>
            <img
              src={getCustomEmblemUrl(ranking.rank)}
              alt={ranking.rank}
            />
            <h4>{ ranking.rank }{ ranking.rank !== "CHALLENGER" && ` ${ranking.division.formatted}` }</h4>
            { ranking.lpAmount } LP<br/>

            { ranking.wins }W / { ranking.losses }L<br/>
            <strong>Winrate:</strong> { winRate?.toFixed(1) }%<br/>
          </>
        ) : (
          <>
            <h3>{ name }: Unranked</h3>
          </>
        )
      }
    </div>
  )
}
