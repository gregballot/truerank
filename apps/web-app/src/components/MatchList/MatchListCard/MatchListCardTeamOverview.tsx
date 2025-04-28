import { MatchParticipant } from "@truerank/shared/types";

import { MatchListCardTeam } from "./MatchListCardTeam";

import styles from "./styles/MatchListCardTeamOverview.module.css";

type Props = {
  redTeam: MatchParticipant[];
  blueTeam: MatchParticipant[];
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
