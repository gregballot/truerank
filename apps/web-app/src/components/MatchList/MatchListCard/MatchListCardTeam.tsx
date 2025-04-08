import { Link } from "react-router-dom";

import { SharedTypes } from "@truerank/shared";

import styles from "./styles/MatchListCardTeam.module.css";
import { getChampionIcon } from "../../../helpers/datadragon";

type Props = {
  team: SharedTypes.MatchParticipant[];
};

export function MatchListCardTeam({
  team
}: Props) {
  return (
    <ul className={styles.matchListCardTeam}>
      {
        team.map(({ summoner, championName}, index) => {
          const summonerName = summoner.gameName;
          const summonerTag = summoner.tagLine;
          const playerLink = `/summoners/${summonerName}/${summonerTag}`;

          return (
            <li key={index}>
              <img
                src={ getChampionIcon(championName) }
                alt={ championName }
                title={ championName } />
              <p>
                <Link
                  to={playerLink}
                  className={styles.playerLink}
                  title={summonerName}
                >
                  { summoner.gameName }
                </Link>
              </p>
            </li>
          );
        })
      }
    </ul>
  );
}
