import { Rank } from "@truerank/shared/types";

export function getCustomEmblemUrl(rank: Rank): string {
  return `/emblems/${rank.toLowerCase()}.png`;
}
