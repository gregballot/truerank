import clsx from 'clsx';

import { useParams } from 'react-router-dom';

import styles from './SummonerProfile.module.css';
import sharedStyles from '../../styles/shared.module.css';

import { ProfileHeader } from '../../components/ProfileHeader/ProfileHeader';
import { ProfileMatches } from '../../components/ProfileMatches/ProfileMatches';
import { ProfileSidebar } from '../../components/ProfileSidebar/ProfileSidebar';

export function SummonerProfile() {
  const { playerName, playerTag } = useParams<{ playerName: string, playerTag: string }>();
  const player = { name: playerName, tag: playerTag };

  return (
    <div className={clsx(styles.summonerProfile, sharedStyles.view)}>
      <div className={styles.profileHeaderWrap}>
        <ProfileHeader player={player} />
      </div>

      <div className={styles.profileSidebarWrap}>
        <ProfileSidebar player={player} />
      </div>

      <div className={styles.profileMatchesWrap}>
        <ProfileMatches player={player} />
      </div>     
    </div>
  );
}
