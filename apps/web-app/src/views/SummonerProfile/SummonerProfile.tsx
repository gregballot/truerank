import clsx from 'clsx';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';

import { fetchProfile } from '../../api/profile';

import styles from './SummonerProfile.module.css';
import sharedStyles from '../../styles/shared.module.css';

import { ProfileHeader } from '../../components/ProfileHeader/ProfileHeader';
import { ProfileMatches, ProfileMatchesHandle } from '../../components/ProfileMatches/ProfileMatches';
import { ProfileSidebar } from '../../components/ProfileSidebar/ProfileSidebar';

export function SummonerProfile() {
  const { name, tag } = useParams<{ name: string, tag: string }>();
  const player = { name, tag };

  const matchesRef = useRef<ProfileMatchesHandle>(null);
  const { data: profile, isLoading, refetch } = useQuery({
    queryKey: ['profile', name, tag],
    queryFn: () => fetchProfile(name!, tag!),
    enabled: !!name && !!tag,
    retry: false,
  });

  function handleUpdate() {
    refetch();
    matchesRef.current?.refetch();
  }

  return (
    <>
      <div className={styles.profileHeaderWrap}>
        <ProfileHeader
          isProfileLoading={isLoading}
          profile={profile}
          handleUpdate={handleUpdate}
        />
      </div>
      <div className={clsx(styles.summonerProfile, sharedStyles.view)}>
        <div className={styles.profileSidebarWrap}>
          <ProfileSidebar
            // isProfileLoading={isLoading}
            // player={player}
          />
        </div>

        <div className={styles.profileMatchesWrap}>
          <ProfileMatches
            ref={matchesRef}
            isProfileLoading={isLoading}
            player={player}
          />
        </div>
      </div>
    </>
  );
}
