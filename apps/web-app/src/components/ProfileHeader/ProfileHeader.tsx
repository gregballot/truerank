import styles from "./ProfileHeader.module.css";

type Props = {
  player: {
    name?: string;
    tag?: string;
  }
}

export function ProfileHeader({ player }: Props) {
  return (
    <div className={styles.profileHeader}>
      <h1>{ player.name }#{ player.tag }</h1>
    </div>
  );
}
