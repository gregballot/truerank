import { SharedTypes } from "@truerank/shared";

import styles from "./styles/MatchListCardTeam.module.css";

type Props = {
  team: SharedTypes.MatchParticipant[];
};

export function MatchListCardTeam({
  team
}: Props) {
  return (
    <ul className={styles.matchListCardTeam}>
      {
        team.map((player, index) => (
          <li key={index}>{ player.summoner.gameName }</li>
        ))
      }
    </ul>
  );
}
