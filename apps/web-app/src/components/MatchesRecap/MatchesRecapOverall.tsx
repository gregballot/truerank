import { RecapAverageMetrics } from "@truerank/shared/types";

import styles from "./styles/MatchesRecapOverall.module.css";
import { WinrateChart } from "./WinrateChart";
import { KdaDetailed } from "../KdaDetailed/KdaDetailed";

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
        <KdaDetailed
          kills={overall.averageKills}
          deaths={overall.averageDeaths}
          assists={overall.averageAssists}
          kda={overall.averageKda}
        />
      </div>

      <WinrateChart
        className={styles.winrateChart}
        winrate={overall.winrate}
      />
    </div>
  )
}
