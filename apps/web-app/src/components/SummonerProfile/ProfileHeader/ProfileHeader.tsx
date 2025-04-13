import { useEffect } from "react";

import { useCooldown } from "../../../hooks/useCooldown";
import { getProfileIcon } from "../../../helpers/datadragon";

import styles from "./ProfileHeader.module.css";

type Props = {
  summonerProfile?: {
    puuid: string;
    gameName: string;
    tagLine: string;
    level?: number;
    icon?: number;
  };
  handleUpdate: () => void;
};

export function ProfileHeader({ summonerProfile: profile, handleUpdate: refreshData }: Props) {
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
      <div className={styles.summonerData}>
        <div className={styles.summonerAvatar}>
          <img
            src={getProfileIcon(profile?.icon)}
            alt={`Summoner icon ${profile?.icon}`}
          />

          <div className={styles.summonerLevel}>
            <p>{profile?.level}</p>
          </div>
        </div>
        <div className={styles.summonerInfo}>
          <h1>
            {profile && (
              <>
                {profile?.gameName}
                <span className={styles.tagline}> #{profile?.tagLine}</span>
              </>
            )}
          </h1>
          <div className={styles.updateSection}>
            <button disabled={
              isCoolingDown || !profile
            } onClick={() => handleUpdate()}>
              Update
            </button>
            <span className={styles.cooldownHint}>
              {isCoolingDown ? (
                <>
                  Update available in <strong>{cooldown}s</strong>
                </>
              ) : (
                <>Ready to update</>
              )}
            </span>
          </div>
        </div>
      </div>

      <div
        className={styles.summonerSplash}
        style={{
          backgroundImage: `url("https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Shyvana_0.jpg")`
        }}
      />
    </div>
  );
}
