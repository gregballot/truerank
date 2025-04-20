import { useEffect } from "react";

import { SummonerDetails } from "@truerank/shared/types";

import { useCooldown } from "../../hooks/useCooldown";
import { getChampionDataById, getChampionSplash, getProfileIcon } from "../../helpers/datadragon";

import styles from "./ProfileHeader.module.css";

type Props = {
  summonerProfile?: SummonerDetails;
  handleUpdate: () => void;
};

export function ProfileHeader({
  summonerProfile: profile,
  handleUpdate: refreshData
}: Props) {
  const { cooldown, isCoolingDown, startCooldown } = useCooldown(1);

  function handleUpdate() {
    if (cooldown > 0) return;

    refreshData();
    startCooldown();
  }

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

      {
        profile?.championMasteries.length && (
          <div
            className={styles.summonerSplash}
            style={{
              backgroundImage: `url("${
                getChampionSplash(
                  getChampionDataById(
                    profile.championMasteries[0]?.championId
                  )?.id
                )
              }")`
            }}
          />
        )
      }
    </div>
  );
}
