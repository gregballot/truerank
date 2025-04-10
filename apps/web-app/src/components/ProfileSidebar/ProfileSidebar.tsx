import styles from "./ProfileSidebar.module.css";

// type Props = {
//   isProfileLoading: boolean,
//   player: {
//     name?: string;
//     tag?: string;
//   }
// }

export function ProfileSidebar() {
  return (
    <div className={styles.profileSidebar}>
      <h3>Ranked Solo/Duo</h3>
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
