import { RecapAverageMetrics } from "@truerank/shared/types";

import styles from "./styles/MatchesRecapOverall.module.css";
import { WinrateChart } from "./WinrateChart";

type Props = {
  overall: RecapAverageMetrics;
};

export function MatchesRecapOverall({ overall }: Props) {
  return (
    <div className={styles.recapOverall}>
      <div className={styles.recapOverallCaption}>
        <h4 className={styles.overallCaption}>
          {overall.wins} WON - {overall.losses} LOST
        </h4>
        <p className={styles.overallKda}>
          {overall.averageKills.toFixed(1)}
          /{overall.averageDeaths.toFixed(1)}
          /{overall.averageAssists.toFixed(1)}
          {' '}({overall.averageKda.toFixed(2)})
        </p>
      </div>

      <WinrateChart
        className={styles.winrateChart}
        winrate={overall.winrate}
      />
    </div>
  )
}
