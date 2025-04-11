import { useCooldown } from "../../../hooks/useCooldown";

import { getProfileIcon } from "../../../helpers/datadragon";

import styles from "./ProfileHeader.module.css";
import { useEffect } from "react";

type Props = {
  isProfileLoading: boolean;
  profile?: {
    puuid: string;
    gameName: string;
    tagLine: string;
    level?: number;
    icon?: number;
  };
  handleUpdate: () => void;
};

export function ProfileHeader({ profile, handleUpdate: refreshData }: Props) {
  const { cooldown, isCoolingDown, startCooldown } = useCooldown();

  function handleUpdate() {
    if (cooldown > 0) return;
  
    refreshData();
    startCooldown();
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => startCooldown(), []);

  return (
    <div className={styles.profileHeader}>
      {
        profile?.icon && (
          <div className={styles.summonerAvatar}>
            <img
              src={getProfileIcon(profile.icon)}
              alt={`Summoner icon ${profile?.icon}`}
            />

            <div className={styles.summonerLevel}>
              <p>{profile?.level}</p>
            </div>
          </div>
        )
      }
      <div className={styles.summonerInfo}>
        <h1>
          {
            profile && (
              <>
                {profile?.gameName}
                <span className={styles.tagline}> #{profile?.tagLine}</span>
              </>
            )
          }
        </h1>
        <div className={styles.updateSection}>
          <button
            disabled={isCoolingDown}
            onClick={() => handleUpdate()}
          >
            Update
          </button>
          <span className={styles.cooldownHint}>
            {
              isCoolingDown ? (
                <>Update available in <strong>{cooldown}s</strong></>
              ) : (
                <>Ready to update</>
              )
            }
          </span>
        </div>
      </div>
    </div>
  );
}
