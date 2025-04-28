import styles from "./styles/WinrateChart.module.css";

type WinrateChartProps = {
  winrate: number;
  className?: string;
};

export function WinrateChart({ winrate, className }: WinrateChartProps) {
  const size = 90;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - winrate / 100);

  const winStrokeColor = "#6194ff";
  const lossBackgroundStroke = "#eb5656";

  return (
    <div className={`${styles.wrapper} ${className || ""}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={styles.chart}
      >
        {/* Background Circle (losses) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={lossBackgroundStroke}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Foreground Circle (wins) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={winStrokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="butt"
          fill="none"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>

      {/* Centered Label */}
      <div className={styles.label}>{Math.round(winrate)}%</div>
    </div>
  );
}
