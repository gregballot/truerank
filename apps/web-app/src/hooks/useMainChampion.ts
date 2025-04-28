import { useMemo } from "react";

import {
  ChampionMastery,
  RecapChampionAverageMetrics,
} from "@truerank/shared/types";

import { computeMainChampion } from "../helpers/computeMainChampion";

type Params = {
  championMasteries: ChampionMastery[];
  recapChampions: RecapChampionAverageMetrics[];
};

export function useMainChampion({
  championMasteries,
  recapChampions,
}: Params) {
  return useMemo<number>(() => {
    if (!championMasteries.length) {
      return -1;
    }

    return computeMainChampion(
      championMasteries,
      recapChampions,
    );
  }, [championMasteries, recapChampions]);
}
