export function dateToTimeAgoFormatted(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 5) return "Just now";
  if (diff < 60) return `${diff} second${diff === 1 ? "" : "s"} ago`;

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;

  const hours = Math.floor(diff / 3600);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(diff / 86400);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;

  const weeks = Math.floor(diff / 604800);
  if (weeks < 4) return `${weeks} week${weeks === 1 ? "" : "s"} ago`;

  const months = Math.floor(diff / 2592000);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;

  const years = Math.floor(diff / 31536000);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

export function secondsToMinutesFormatted(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}m ${seconds}s`;
}
