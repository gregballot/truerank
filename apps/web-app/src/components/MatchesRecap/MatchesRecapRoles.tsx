import { RecapRoleAverageMetrics } from "@truerank/shared/types";

import styles from "./styles/MatchesRecapRoles.module.css";
import { getRoleIcon } from "../../helpers/staticAssets";
import { getRoleData } from "../../helpers/roles";

type Props = {
  roles: RecapRoleAverageMetrics[];
};

export function MatchesRecapRoles({ roles }: Props) {
  const displayedRoles = 3;

  return (
    <div className={styles.recapRoles}>
      <div className={styles.recapRolesCaption}>
        <h4 className={styles.title}>
          PLAYED {roles.length} ROLES
        </h4>
        <p className={styles.roleNames}>
          {
            roles.map(({ roleId }) => {
              const roleData = getRoleData(roleId)
              return roleData.name;
            }).join(', ')
          }
        </p>
      </div>

      <ul className={styles.roles}>
        {
          roles.slice(0, displayedRoles).map(role => {
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
                  {role.matchesCount} games: {role.wins}W {role.losses}L
                  {' - '}
                  {role.averageKills.toFixed(1)}/
                  {role.averageDeaths.toFixed(1)}/
                  {role.averageAssists.toFixed(1)}
                  {' '}
                  <em>{role.averageKda.toFixed(2)}</em>
                </p>
              </li>
            );
          })
        }
      </ul>

      <p className={styles.more}>
        {
          roles.length > displayedRoles
          ? (<>{ roles.length - displayedRoles } more roles</>)
          : (<>All {roles.length} roles shown</>)
        }
      </p>
    </div>
  )
}
