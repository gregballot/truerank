import { SummonerMatchesRecap } from "@truerank/shared/types";

import styles from "./MatchesRecap.module.css";

type Props = {
  isLoading: boolean;
  recap: SummonerMatchesRecap;
}

export function MatchesRecap({ isLoading, recap }: Props) {
  if (isLoading) {
    return;
  }

  return (
    <div className={styles.matchesRecap}>
      <p>{JSON.stringify(recap)}</p>
    </div>
  )
}
