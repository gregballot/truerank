export function formatItemsForDisplay(items: number[], trinket: number): number[] {
  return [...items.slice(0, 3), trinket, ...items.slice(3)];
}

export function calcWinRate(wins: number, losses: number): number {
  if (losses === 0) {
    return 100;
  }

  if (wins === 0) {
    return 0;
  }

  const totalGames = wins + losses;
  const winRate = wins / totalGames * 100;

  return winRate;
}
