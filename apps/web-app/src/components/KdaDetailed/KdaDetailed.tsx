import clsx from "clsx";

import styles from "./KdaDetailed.module.css";

type Props = {
  kills: number;
  deaths: number;
  assists: number;
  kda?: number;
  floatingPoint?: number;
  className?: string;
};

export function KdaDetailed({
  kills,
  deaths,
  assists,
  kda,
  floatingPoint,
  className
}: Props) {
  const fixed = floatingPoint ?? 1;
  return (
    <span className={className}>
      <span className={styles.kills}>{kills.toFixed(fixed)}</span>
      <span className={styles.separator}>/</span>
      <span className={styles.deaths}>{deaths.toFixed(fixed)}</span>
      <span className={styles.separator}>/</span>
      <span className={styles.assists}>{assists.toFixed(fixed)}</span>
      {typeof kda === "number" && (
        <>
          <span className={clsx(
            styles.kda,
            (kda < 1) && styles.lowKda,
            (kda >= 1 && kda < 2) && styles.goodKda,
            (kda >= 2 && kda < 4) && styles.greatKda,
            (kda >= 4 && kda < 6) && styles.epicKda,
            (kda >= 6) && styles.perfectKda,
          )}>
            {kda.toFixed(2)}
          </span>
        </>
      )}
    </span>
  );
}
