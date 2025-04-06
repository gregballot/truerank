import { SharedTypes } from "@truerank/shared";

import {
  dateToTimeAgoFormatted,
  secondsToMinutesFormatted
} from "../../../helpers/dates";

import styles from "./styles/MatchListCardMetadata.module.css";

type Props = {
  metadata: SharedTypes.MatchMetadata;
  isWinner: boolean;
};

export function MatchListCardMetadata({
  metadata,
  isWinner
}: Props) {
  const formattedGameDate = dateToTimeAgoFormatted(metadata.gameCreation.toString());
  const formattedGameDuration = secondsToMinutesFormatted(metadata.gameDuration);

  return (
    <div className={styles.matchListCardMetadata}>
      <p className={styles.queueName}>{metadata.queue}</p>
      <p className={styles.gameDate}>{formattedGameDate}</p>
      <div className={styles.separator} />
      <p className={styles.gameDuration}>{formattedGameDuration}</p>
      <p className={styles.gameResult}>{isWinner ? 'Victory' : 'Defeat' }</p>
    </div>
  );
}
