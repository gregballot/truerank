import { getProfileIcon } from "../../helpers/datadragon";
import styles from "./ProfileHeader.module.css";

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

export function ProfileHeader({ profile, handleUpdate }: Props) {
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
          {profile?.gameName}#{profile?.tagLine}
        </h1>
        <button onClick={() => handleUpdate()}>Update</button>
      </div>
    </div>
  );
}
