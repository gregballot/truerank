import { useEffect } from "react";

import { useCooldown } from "../../hooks/useCooldown";

import styles from "./UpdateProfileButton.module.css"

type Props = {
  profileLoading: boolean;
  handleUpdate: () => void;
};

export function UpdateProfileButton({
  profileLoading,
  handleUpdate: refreshData,
}: Props) {
  const { cooldown, isCoolingDown, startCooldown } = useCooldown(1);

  function handleUpdate() {
    if (cooldown > 0) return;

    refreshData();
    startCooldown();
  }

  useEffect(() => startCooldown(), []);

  return (
    <div className={styles.updateSection}>
      <button disabled={
        isCoolingDown || profileLoading
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
  );
}
