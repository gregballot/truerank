import clsx from 'clsx';

import styles from './PlayerProfile.module.css';
import sharedStyles from '../../styles/shared.module.css';

export function PlayerProfile() {
  return (
    <div className={clsx(styles.playerProfile, sharedStyles.view)}>
      <h1>Player Profile</h1>
      <p>This is the player profile page.</p>
    </div>
  );
}