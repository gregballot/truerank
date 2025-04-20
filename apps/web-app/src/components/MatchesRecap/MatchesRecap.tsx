import { SummonerMatchesRecap } from "@truerank/shared/types";

import styles from "./styles/MatchesRecap.module.css";
import { MatchesRecapOverall } from "./MatchesRecapOverall";
import { MatchesRecapChampions } from "./MatchesRecapChampions";
import { MatchesRecapRoles } from "./MatchesRecapRoles";

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
      <div className={styles.matchesRecapHeader}>
        <h3>Showing {recap.overall.matchesCount} recently played games</h3>
      </div>
      <div className={styles.matchesRecapData}>
        <MatchesRecapOverall overall={recap.overall} />
        <MatchesRecapChampions champions={recap.champions} />
        <MatchesRecapRoles roles={recap.roles} />
      </div>
    </div>
  )
}
