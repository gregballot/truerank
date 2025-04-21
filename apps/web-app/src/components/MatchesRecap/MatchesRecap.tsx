import { SummonerMatchesRecap } from "@truerank/shared/types";

import styles from "./styles/MatchesRecap.module.css";
import { MatchesRecapOverall } from "./MatchesRecapOverall";
import { MatchesRecapChampions } from "./MatchesRecapChampions";
import { MatchesRecapRoles } from "./MatchesRecapRoles";

type Props = {
  isLoading: boolean;
  recap: SummonerMatchesRecap;
  totalMatches: number;
}

export function MatchesRecap({ isLoading, recap, totalMatches }: Props) {
  if (isLoading || recap.overall.matchesCount === 0) {
    return;
  }

  return (
    <div className={styles.matchesRecap}>
      <div className={styles.matchesRecapHeader}>
        {/*
          TODO: Add tooltip next to totalMatches
          to explain why recap might have less
        */}
        <h3>Showing {totalMatches} recently played games</h3>
      </div>
      <div className={styles.matchesRecapData}>
        <MatchesRecapOverall overall={recap.overall} />
        <MatchesRecapChampions champions={recap.champions} />
        <MatchesRecapRoles roles={recap.roles} />
      </div>
    </div>
  )
}
