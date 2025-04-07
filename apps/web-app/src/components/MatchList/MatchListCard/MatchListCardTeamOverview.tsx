import { SharedTypes } from "@truerank/shared";

import { MatchListCardTeam } from "./MatchListCardTeam";

import styles from "./styles/MatchListCardTeamOverview.module.css";

type Props = {
  redTeam: SharedTypes.MatchParticipant[];
  blueTeam: SharedTypes.MatchParticipant[];
};

export function MatchListCardTeamOverview({
  redTeam,
  blueTeam,
}: Props) {
  return (
    <div className={styles.matchListCardTeamOverview}>
      <MatchListCardTeam team={redTeam} />
      <MatchListCardTeam team={blueTeam} />
    </div>
  );
}
