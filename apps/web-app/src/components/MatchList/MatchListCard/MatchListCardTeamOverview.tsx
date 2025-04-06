import { SharedTypes } from "@truerank/shared";

import { MatchListCardTeam } from "./MatchListCardTeam";

type Props = {
  redTeam: SharedTypes.MatchParticipant[];
  blueTeam: SharedTypes.MatchParticipant[];
};

export function MatchListCardTeamOverview({
  redTeam,
  blueTeam,
}: Props) {
  return (
    <div>
      <MatchListCardTeam team={redTeam} />
      <MatchListCardTeam team={blueTeam} />
    </div>
  );
}
