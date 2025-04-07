import { SharedTypes } from "@truerank/shared";

import { getChampionIcon, getItemData, getItemIcon } from "../../../helpers/datadragon";
import { formatItemsForDisplay } from "../../../helpers/utils";

import styles from "./styles/MatchListCardPlayerRecap.module.css";

type Props = {
  player: SharedTypes.MatchParticipant;
  gameDuration: number;
};

export function MatchListCardPlayerRecap({
  player,
  gameDuration
}: Props) {
  const kda = (player.kills + player.assists) / player.deaths;
  const csPerMinute = player.totalMinionsKilled / (gameDuration / 60);
  const items = formatItemsForDisplay(player.items, player.trinket);

  return (
    <div className={styles.matchListCardPlayerRecap}>
      <div className={styles.playerSection}>
        <div className={styles.championAvatar}>
          <img
            src={ getChampionIcon(player.championName) }
            title={ player.championName }
          />
          <div className={styles.championLevel}>
            { player.championLevel }
          </div>
        </div>

        <div className={styles.gameStats}>
          <p className={styles.kdaDetailed}>
            { player.kills } / { player.deaths } / { player.assists }
          </p>
          <p className={styles.kdaCalculated}>
            { player.deaths > 0 ? kda.toFixed(2) : "Perfect" } KDA
          </p>
          <p className={styles.farmingCs}>
            <span className={styles.csCount}>{ player.totalMinionsKilled }</span>
            {' '} CS
          </p>
          <p className={styles.farmingCsMin}>
            { csPerMinute.toFixed(1) }
            {' '} cs/min
          </p>
        </div>

        <div className={styles.playerItems}>
          {
            items.map((itemId, index) => {
              const itemData = getItemData(itemId);
              return (
                <div
                  key={index}
                  className={styles.playerItem}
                  title={`${itemData?.name}: ${itemData?.plaintext}`}
                  style={
                    itemId > 0 ? {
                      backgroundImage: `url("${getItemIcon(itemId)}")`,
                      backgroundSize: "cover"
                    } : undefined
                  }
                />
              )
            })
          }
        </div>
      </div>

      <div className={styles.gameTags}>
        <div className={styles.gameTag}>Team diff</div>
        <div className={styles.gameTag}>AFK bot</div>
        <div className={styles.gameTag}>Not winnable</div>
        <div className={styles.gameTag}>Talon E out the window</div>
      </div>
    </div>
  );
}
