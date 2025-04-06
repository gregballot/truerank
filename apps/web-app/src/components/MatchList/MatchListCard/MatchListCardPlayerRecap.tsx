import { SharedTypes } from "@truerank/shared";

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

  return (
    <div className={styles.matchListCardPlayerRecap}>
      <div className={styles.playerSection}>
        <div className={styles.championAvatar}>
          { player.championName }
          <div className={styles.championLevel}>
            { player.championLevel ?? 18 }
          </div>
        </div>
        <div className={styles.gameStats}>
          <div>
            <p>{ player.kills } / { player.deaths } / { player.assists }</p>
            <p>{ player.deaths > 0 ? kda.toFixed(2) : "Perfect" } KDA</p>
          </div>
          <div>
            <p>{ player.totalMinionsKilled }</p>
            <p>{ csPerMinute.toFixed(1) } cs/min</p>
          </div>
        </div>

        <div className={styles.playerItems}>
          <div className={styles.playerItem}/>
          <div className={styles.playerItem}/>
          <div className={styles.playerItem}/>
          <div className={styles.playerItem}/>
          <div className={styles.playerItem}/>
          <div className={styles.playerItem}/>
          <div className={styles.playerItem}/>
        </div>
      </div>

      { /* Tags section */ }
      <div className={styles.gameTags}>
        <div className={styles.gameTag}>Team diff</div>
        <div className={styles.gameTag}>AFK bot</div>
        <div className={styles.gameTag}>Not winnable</div>
        <div className={styles.gameTag}>Talon E out the window</div>
      </div>
    </div>
  );
}
