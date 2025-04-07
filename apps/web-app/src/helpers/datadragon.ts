import { DEFAULT_DDRAGON_VERSION } from "../config/env";

export const DDRAGON_BASE_URL = "https://ddragon.leagueoflegends.com";

let cachedVersion: string | null = null;
let cachedItemData: Record<string, ItemData> | null = null;

type ItemData = {
  name: string;
  description: string;
  plaintext?: string;
  image: { full: string };
};

/* Riot data preloading */
export async function preloadLatestDDragonVersion() {
  try {
    const response = await fetch(`${DDRAGON_BASE_URL}/api/versions.json`);
    const versions = await response.json();
    cachedVersion = versions[0];

    if (!cachedVersion) {
      throw new Error("Unable to fetch last version");
    }
  } catch (error) {
    console.error("Failed to fetch Data Dragon version:", error);
  }
}

export async function preloadItemData() {
  const version = cachedVersion ?? DEFAULT_DDRAGON_VERSION;
  const response = await fetch(
    `${DDRAGON_BASE_URL}/cdn/${version}/data/en_US/item.json`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch item data");
  }

  const json = await response.json();
  cachedItemData = json.data;
}

/* Static getters */
export function getItemData(itemId: number): ItemData | undefined {
  return cachedItemData?.[itemId.toString()];
}

export const getChampionIcon = (championName: string) => {
  const version = cachedVersion ?? DEFAULT_DDRAGON_VERSION;
  return `${DDRAGON_BASE_URL}/cdn/${version}/img/champion/${championName}.png`;
}

export const getItemIcon = (itemId: number) =>{
  const version = cachedVersion ?? DEFAULT_DDRAGON_VERSION;
  return `${DDRAGON_BASE_URL}/cdn/${version}/img/item/${itemId}.png`;
}
