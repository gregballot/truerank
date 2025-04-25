import { MatchMetadata } from "@truerank/shared/types";

import {
  dateToTimeAgoFormatted,
  secondsToMinutesFormatted
} from "../../../helpers/dates";

import styles from "./styles/MatchListCardMetadata.module.css";
import clsx from "clsx";

type Props = {
  metadata: MatchMetadata;
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
      <p className={clsx(styles.queueName, isWinner ? styles.winner : styles.loser)}>
        {metadata.queueName}
      </p>
      <p className={styles.gameDate}>
        {formattedGameDate}
      </p>

      <div className={styles.separator} />

      <p className={styles.gameDuration}>
        {formattedGameDuration}
      </p>
      <p className={clsx(styles.gameResult, isWinner ? styles.winner : styles.loser)}>
        {isWinner ? 'Victory' : 'Defeat' }
      </p>
    </div>
  );
}
