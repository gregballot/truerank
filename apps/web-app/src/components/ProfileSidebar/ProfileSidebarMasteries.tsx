import { ChampionMastery } from "@truerank/shared/types";

import styles from "./ProfileSidebarMasteries.module.css";
import { getChampionDataById, getChampionIcon, getChampionSplash } from "../../helpers/datadragon";
import { getMasteryBadgeUrl } from "../../helpers/staticAssets";
import { dateToTimeAgoFormatted } from "../../helpers/dates";

type Props = {
  championMasteries?: ChampionMastery[];
};

export function ProfileSidebarMasteries({ championMasteries }: Props) {
  if (!championMasteries || championMasteries.length === 0) {
    return;
  }


  return (
    <div className={styles.sidebarMasteries}>
      <h3 className={styles.queueName}>Champion Mastery</h3>
      {
        championMasteries.map(mastery => {
          const championData = getChampionDataById(mastery.championId);

          if (!championData) {
            return;
          }

          return (
            <div
              key={mastery.championId}
              className={styles.championMastery}
              style={{
                backgroundImage: `url(${getChampionSplash(championData.id)})`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
              }}
            >
              <div className={styles.championInfo}>
                <div className={styles.championNameWrap}>
                  <img
                    src={getChampionIcon(championData.id)}
                    alt={championData.name}
                  />
                  <p className={styles.championName}>
                    {championData.name}
                  </p>
                </div>
                <p className={styles.championMasteryLevel}>
                  Level {mastery.masteryLevel}
                </p>
                <p className={styles.championMasteryPoints}>
                  {mastery.masteryPoints.toLocaleString()} points
                </p>
                <p className={styles.championLastPlayed}>
                  Played {dateToTimeAgoFormatted(mastery.lastPlayTime.toString())}
                </p>
              </div>

              <img
                className={styles.badge}
                src={getMasteryBadgeUrl(mastery.masteryLevel)}
                alt={`Mastery ${mastery.masteryLevel}`}
              />
            </div>
          );
        })
      }
    </div>
  );
}
