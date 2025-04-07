export function formatItemsForDisplay(items: number[], trinket: number): number[] {
  return [...items.slice(0, 3), trinket, ...items.slice(3)];
}
