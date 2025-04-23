import { SummonerDetails } from "@truerank/shared/types";

import {
  getChampionDataById,
  getChampionSplash,
  getProfileIcon,
} from "../../helpers/datadragon";

import styles from "./ProfileHeader.module.css";
import { UpdateProfileButton } from "./UpdateProfileButton";

type Props = {
  summonerProfile?: SummonerDetails;
  handleUpdate: () => void;
  mainChampion: number;
};

export function ProfileHeader({
  summonerProfile: profile,
  handleUpdate,
  mainChampion,
}: Props) {
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
          <UpdateProfileButton
            profileLoading={!profile}
            handleUpdate={handleUpdate}
          />
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
                    mainChampion
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
