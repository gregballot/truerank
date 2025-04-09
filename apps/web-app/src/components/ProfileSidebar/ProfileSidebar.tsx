import styles from "./ProfileSidebar.module.css";

type Props = {
  player: {
    name?: string;
    tag?: string;
  }
}

export function ProfileSidebar({ player }: Props) {
  return (
    <div className={styles.profileSidebar}>
      <h2>{player.name} Current Rank</h2>
      <img
        style={{
          width: 250,
        }}
        src="https://support-leagueoflegends.riotgames.com/hc/article_attachments/4415894930323"
      />
      <p>
        Some text
      </p>
    </div>
  );
}
