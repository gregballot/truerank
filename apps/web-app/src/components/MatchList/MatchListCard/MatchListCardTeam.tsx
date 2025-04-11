import { Link } from "react-router-dom";

import { SharedTypes } from "@truerank/shared";

import { getChampionIcon } from "../../../helpers/datadragon";
import { useSummonerPuuid } from "../../../views/SummonerProfile/SummonerProfileContext";

import styles from "./styles/MatchListCardTeam.module.css";
import clsx from "clsx";

type Props = {
  team: SharedTypes.MatchParticipant[];
};

export function MatchListCardTeam({
  team
}: Props) {
  const puuidToHighlight = useSummonerPuuid();

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
                  title={summonerName}
                  className={clsx(
                    styles.playerLink,
                    puuidToHighlight === summoner.puuid && styles.highlight
                  )}
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
