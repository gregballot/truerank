import { SummonerMatchDetails } from "@truerank/shared/types";

import { MatchListCardMetadata } from "./MatchListCardMetadata";
import { MatchListCardPlayerRecap } from "./MatchListCardPlayerRecap";
import { MatchListCardTeamOverview } from "./MatchListCardTeamOverview";

import styles from "./styles/MatchListCard.module.css";
import clsx from "clsx";

type Props = {
  summonerMatch: SummonerMatchDetails;
  className?: string;
  style?: React.CSSProperties;
};

export function MatchListCard({ summonerMatch, className, style }: Props) {

  const { match, summoner, isWinner } = summonerMatch;
  const { metadata, redTeam, blueTeam } = match;

  const allPlayers = [...redTeam, ...blueTeam];
  const summonerMatchData = allPlayers.find(player => player.summoner.puuid === summoner.puuid);
  if (!summonerMatchData) {
    return null;
  }

  return (
    <div
      className={clsx(
        styles.matchListCard,
        isWinner ? styles.winner : styles.loser,
        className,
      )}
      style={style}
    >
      <MatchListCardMetadata
        metadata={metadata}
        isWinner={isWinner} />

      <MatchListCardPlayerRecap
        player={summonerMatchData}
        gameDuration={metadata.gameDuration} />

      <MatchListCardTeamOverview
        redTeam={redTeam}
        blueTeam={blueTeam} />

      <div className={styles.dropDownButton}>
        <img src="/icons/down-arrow.svg" />
      </div>
    </div>
  );
}
