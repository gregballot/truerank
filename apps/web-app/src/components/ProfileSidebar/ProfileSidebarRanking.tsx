import { SummonerLeague } from "@truerank/shared/types";

import { calcWinRate } from "../../helpers/utils";

import styles from "./ProfileSidebarRanking.module.css";
import { getEmblemUrl } from "../../helpers/staticAssets";

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
            <h3 className={styles.queueName}>{ name }</h3>
            <div className={styles.rankSection}>
              <img
                className={styles.emblem}
                src={getEmblemUrl(ranking.rank)}
                alt={ranking.rank}
              />
              <div className={styles.rankingInfo}>
                <h4 className={styles.rankName}>
                  { ranking.rank }
                  { ranking.rank !== "CHALLENGER" && ` ${ranking.division.formatted}` }
                </h4>
                <p className={styles.lp}>
                  { ranking.lpAmount } LP<br/>
                </p>
              </div>
            </div>

            <div className={styles.rankStats}>
              <div className={styles.rankBar}>
                <div
                  className={styles.rankBarWin}
                  style={{ flexBasis: `${winRate}%` }}
                />
                <div
                  className={styles.rankBarLose}
                  style={{ flexBasis: `${100 - winRate!}%` }}
                />
              </div>
              <div className={styles.rankBarLabel}>
                <span>{ranking.wins}W</span>
                <span className={styles.rankBarWinrate}>Winrate: {winRate!.toFixed(1)}%</span>
                <span>{ranking.losses}L</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <h3 className={styles.queueName}>{ name }: Unranked</h3>
          </>
        )
      }
    </div>
  )
}
