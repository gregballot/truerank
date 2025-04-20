import clsx from 'clsx';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { useSummonerMatches } from './queries/useSummonerMatches';
import { useSummonerProfile } from './queries/useSummonerProfile';

import { buildMatchesQueryKey, buildProfileQueryKey } from '../../api/helpers';
import { fetchProfile } from '../../api/profile';

import { SummonerProfileProvider } from './SummonerProfileContext';
import { ProfileHeader } from '../../components/ProfileHeader/ProfileHeader';
import { ProfileMatches } from '../../components/ProfileMatches/ProfileMatches';
import { ProfileSidebar } from '../../components/ProfileSidebar/ProfileSidebar';

import styles from './SummonerProfile.module.css';
import sharedStyles from '../../styles/shared.module.css';

export function SummonerProfile() {
  const { name, tag } = useParams<{ name: string, tag: string }>();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: summonerProfile,
    isLoading,
  } = useSummonerProfile(name, tag);

  const {
    allMatches,
    recap,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isMatchesLoading,
  } = useSummonerMatches(summonerProfile, isRefreshing);

  const queryClient = useQueryClient();
  async function handleUpdate() {
    const profileQueryKey = buildProfileQueryKey(name, tag);
    const matchesQueryKey = buildMatchesQueryKey(summonerProfile);

    setIsRefreshing(true);
    try {
      await queryClient.fetchQuery({
        queryKey: profileQueryKey,
        queryFn: () => fetchProfile(name!, tag!, true),
      });

      // Trigger matches refetch differently because of infiniteQuery.
      // It works because isRefreshing state is passed to it. Which we
      // can do because infiniteQuery does fresh queries on invalidate.
      await queryClient.invalidateQueries({ queryKey: matchesQueryKey });

    } finally {
      setIsRefreshing(false);
    }
  }

  return (
    <SummonerProfileProvider puuid={summonerProfile?.puuid}>
      <div className={styles.profileHeaderWrap}>
        <ProfileHeader
          summonerProfile={summonerProfile}
          handleUpdate={handleUpdate}
        />
      </div>
      <div className={clsx(styles.summonerProfile, sharedStyles.view)}>
        <div className={styles.profileSidebarWrap}>
          <ProfileSidebar
            isProfileLoading={isLoading}
            soloRank={summonerProfile?.soloRank}
            flexRank={summonerProfile?.flexRank}
            championMasteries={summonerProfile?.championMasteries}
          />
        </div>

        <div className={styles.profileMatchesWrap}>
          <ProfileMatches
            isProfileLoading={isLoading || isRefreshing}
            isMatchesLoading={isMatchesLoading || isRefreshing}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            matchesData={allMatches}
            recap={recap}
          />
        </div>
      </div>
    </SummonerProfileProvider>
  );
}
