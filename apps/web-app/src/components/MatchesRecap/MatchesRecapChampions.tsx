import { RecapChampionAverageMetrics } from "@truerank/shared/types";

import styles from "./styles/MatchesRecapChampions.module.css";
import { getChampionDataById, getChampionIcon } from "../../helpers/datadragon";

type Props = {
  champions: RecapChampionAverageMetrics[];
};

export function MatchesRecapChampions({ champions }: Props) {
  const displayedChampions = 3;

  return (
    <div className={styles.recapChampions}>
      <div className={styles.recapChampionsCaption}>
        <h4 className={styles.title}>
          PLAYED {champions.length} CHAMPIONS
        </h4>
        <p className={styles.championNames}>
          {
            champions.map(champion => {
              const championData = getChampionDataById(champion.championId);
              return championData?.name;
            }).join(', ')
          }
        </p>
      </div>

      <ul className={styles.champions}>
        {
          champions.slice(0, displayedChampions).map(champion => {
            const championData = getChampionDataById(champion.championId);
            if (!championData) {
              return ;
            }

            return (
              <li
                key={`${champion.championId}`}
                className={styles.championListItem}
              >
                <img
                  src={ getChampionIcon(championData.id) }
                  alt={ championData.name }
                  title={ championData.name } />
                <p>
                  {champion.matchesCount} games: {champion.wins}W {champion.losses}L
                  {' - '}
                  {champion.averageKills.toFixed(1)}/
                  {champion.averageDeaths.toFixed(1)}/
                  {champion.averageAssists.toFixed(1)}
                  {' '}
                  <em>{champion.averageKda.toFixed(2)}</em>
                </p>
              </li>
            );
          })
        }
      </ul>

      <p className={styles.more}>
        {
          champions.length > displayedChampions
          ? (<>{ champions.length - displayedChampions } more champions</>)
          : (<>All {champions.length} champions shown</>)
        }
      </p>
    </div>
  )
}
