import { MatchParticipant, MatchTagDetails } from "@truerank/shared/types";

import { formatItemsForDisplay } from "../../../helpers/utils";
import {
  getChampionIcon,
  getSummonerSpellData,
  getSummonerSpellIcon,
  getRuneStyleData,
  getRuneStyleIcon,
  getItemData,
  getItemIcon,
  getChampionDataById,
} from "../../../helpers/datadragon";

import { KdaDetailed } from "../../KdaDetailed/KdaDetailed";

import styles from "./styles/MatchListCardPlayerRecap.module.css";

type Props = {
  gameDuration: number;
  player: MatchParticipant;
  tags: MatchTagDetails[];
};

export function MatchListCardPlayerRecap({
  gameDuration,
  player,
  tags,
}: Props) {
  const kda = (player.kills + player.assists) / player.deaths;
  const csPerMinute = player.totalMinionsKilled / (gameDuration / 60);
  const items = formatItemsForDisplay(player.items, player.trinket);
  const championData = getChampionDataById(player.championId);

  return (
    <div className={styles.matchListCardPlayerRecap}>
      <div className={styles.playerSection}>
        <div className={styles.championAvatar}>
          <img
            src={ getChampionIcon(championData!.id) }
            title={ player.championName }
          />
          <div className={styles.championLevel}>
            { player.championLevel }
          </div>
        </div>

        <div className={styles.playerLoadout}>
          <div className={styles.summonerSpells}>
            {
              player.summonerSpells.map(spellId => {
                const spellData = getSummonerSpellData(spellId);

                if (!spellData) {
                  return <div>PH</div>
                }

                return (
                  <img
                    key={spellId}
                    src={getSummonerSpellIcon(spellData.image.full)}
                    alt={spellData.name}
                    title={spellData.name}
                    className={styles.loadoutImage}
                  />
                )
              })
            }
          </div>
          <div className={styles.runes}>
            {
              player.runeStyles.map(runeId => {
                const runeStyleData = getRuneStyleData(runeId);
                if (!runeStyleData) {
                  return;
                }

                return (
                  <div key={runeId} className={styles.loadoutImage}>
                    <img
                      src={getRuneStyleIcon(runeStyleData.icon)}
                      alt={runeStyleData.name}
                      title={runeStyleData.name}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>

        <div className={styles.gameStats}>
          <p className={styles.kdaDetailed}>
            <KdaDetailed
              kills={player.kills}
              deaths={player.deaths}
              assists={player.assists}
              floatingPoint={0}
            />
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
        {
          tags.map(tag => {
            return (
              <div className={styles.gameTag}>
                {tag.label}
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
