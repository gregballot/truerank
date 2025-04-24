import { RecapRoleAverageMetrics } from "@truerank/shared/types";

import styles from "./styles/MatchesRecapRoles.module.css";
import { getRoleIcon } from "../../helpers/staticAssets";
import { getRoleData } from "../../helpers/roles";
import { KdaDetailed } from "../KdaDetailed/KdaDetailed";

type Props = {
  roles: RecapRoleAverageMetrics[];
};

export function MatchesRecapRoles({ roles }: Props) {
  const displayedRoles = 3;
  const nRoles = roles.length;
  const plural = nRoles > 1;

  return (
    <div className={styles.recapRoles}>
      <div className={styles.recapRolesCaption}>
        <h4 className={styles.title}>
          PLAYED {nRoles} ROLE{plural && 'S'}
        </h4>
        <p className={styles.roleNames}>
          {
            roles.map(({ roleId }) => {
              const roleData = getRoleData(roleId)
              if (!roleData) {
                return;
              }
              return roleData.name;
            }).join(', ')
          }
        </p>
      </div>

      <ul className={styles.roles}>
        {
          roles.slice(0, displayedRoles).map(role => {
            const rolePlural = role.matchesCount > 1;
            const roleData = getRoleData(role.roleId);
            if (!roleData) {
              return ;
            }

            return (
              <li
                key={`${role.roleId}`}
                className={styles.roleListItem}
              >
                <div>
                  <img
                    src={ getRoleIcon(roleData.id) }
                    alt={ roleData.name }
                    title={ roleData.name } />
                </div>
                <p>
                  {role.matchesCount} game{rolePlural && 's'}: {role.wins}W {role.losses}L
                  {' - '}
                  <KdaDetailed
                    kills={role.averageKills}
                    deaths={role.averageDeaths}
                    assists={role.averageAssists}
                    kda={role.averageKda}
                  />
                </p>
              </li>
            );
          })
        }
      </ul>

      <p className={styles.more}>
        {
          nRoles > displayedRoles
          ? (<>{ nRoles - displayedRoles } more role{plural && 's'}</>)
          : (<>{plural && 'All '}{nRoles} role{plural && 's'} shown</>)
        }
      </p>
    </div>
  )
}
