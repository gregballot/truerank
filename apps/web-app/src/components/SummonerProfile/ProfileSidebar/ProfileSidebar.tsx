import { SummonerLeague } from "@truerank/shared/types";
import styles from "./ProfileSidebar.module.css";
import { ProfileSidebarRanking } from "./ProfileSidebarRanking";

type Props = {
  isProfileLoading: boolean;
  soloRank?: SummonerLeague;
  flexRank?: SummonerLeague;
}

export function ProfileSidebar({
  isProfileLoading,
  soloRank,
  flexRank,
}: Props) {
  return (
    <div className={styles.profileSidebar}>
      {
        !isProfileLoading && (
          <>
            <ProfileSidebarRanking key="solo" name="Ranked Solo/Duo" ranking={soloRank} />
            <ProfileSidebarRanking key="flex" name="Ranked Flex" ranking={flexRank} />
          </>
        )
      }
    </div>
  );
}
