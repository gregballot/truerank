import { RecapChampionAverageMetrics } from "@truerank/shared/types";

import styles from "./styles/MatchesRecapChampions.module.css";
import { getChampionDataById, getChampionIcon } from "../../helpers/datadragon";
import { KdaDetailed } from "../KdaDetailed/KdaDetailed";

type Props = {
  champions: RecapChampionAverageMetrics[];
};

export function MatchesRecapChampions({ champions }: Props) {
  const displayedChampions = 3;
  const nChampions = champions.length;
  const pluralAll = nChampions > 1;
  const pluralRemaining = nChampions - displayedChampions > 1;

  return (
    <div className={styles.recapChampions}>
      <div className={styles.recapChampionsCaption}>
        <h4 className={styles.title}>
          PLAYED {nChampions} CHAMPION{pluralAll && 'S'}
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
            const championPlural = champion.matchesCount > 1;
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
                  {champion.matchesCount} game{championPlural && 's'}: {champion.wins}W {champion.losses}L
                  {' - '}
                  <KdaDetailed
                    kills={champion.averageKills}
                    deaths={champion.averageDeaths}
                    assists={champion.averageAssists}
                    kda={champion.averageKda}
                  />
                </p>
              </li>
            );
          })
        }
      </ul>

      <p className={styles.more}>
        {
          nChampions > displayedChampions
          ? (<>{ nChampions - displayedChampions } more champion{pluralRemaining && 's'}</>)
          : (<>{pluralAll && 'All '}{nChampions} champion{pluralAll && 's'} shown</>)
        }
      </p>
    </div>
  )
}
