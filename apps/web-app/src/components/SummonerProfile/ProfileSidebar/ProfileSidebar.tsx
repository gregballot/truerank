import { ChampionMastery, SummonerLeague } from "@truerank/shared/types";
import styles from "./ProfileSidebar.module.css";
import { ProfileSidebarRanking } from "./ProfileSidebarRanking";
import { ProfileSidebarMasteries } from "./ProfileSidebarMasteries";

type Props = {
  isProfileLoading: boolean;
  soloRank?: SummonerLeague;
  flexRank?: SummonerLeague;
  championMasteries?: ChampionMastery[];
}

export function ProfileSidebar({
  isProfileLoading,
  soloRank,
  flexRank,
  championMasteries,
}: Props) {
  return (
    <div className={styles.profileSidebar}>
      {
        !isProfileLoading && (
          <>
            <ProfileSidebarRanking name="Ranked Solo/Duo" ranking={soloRank} />
            <ProfileSidebarRanking name="Ranked Flex" ranking={flexRank} />
            <ProfileSidebarMasteries championMasteries={championMasteries?.slice(0, 5)} />
          </>
        )
      }
    </div>
  );
}
