import { DEFAULT_DDRAGON_VERSION } from "../config/env";
import {
  ChampionData,
  SummonerSpellData,
  RuneStyle,
  ItemData,
} from "./datadragon.types";

export const DDRAGON_BASE_URL = "https://ddragon.leagueoflegends.com";

let cachedVersion: string | null = null;
let cachedItemData: Record<string, ItemData> | null = null;
let cachedSummonerSpells: Record<number, SummonerSpellData> | null = null;
let cachedRuneData: Record<number, RuneStyle> | null = null;
let cachedChampionData: Record<string, ChampionData> | null = null;
let cachedChampionIdToNameMap: Record<number, string> | null = null;

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
    throw new Error(`Failed to fetch Data Dragon version: ${error}`);
  }
}

export async function preloadChampionData() {
  const version = cachedVersion ?? DEFAULT_DDRAGON_VERSION;
  const response = await fetch(
    `${DDRAGON_BASE_URL}/cdn/${version}/data/en_US/champion.json`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch champion data");
  }

  const { data } = await response.json();

  cachedChampionData = {};
  cachedChampionIdToNameMap = {};
  for (const id in data) {
    const championMapKey = id.toLowerCase();
    const championData = data[id] as ChampionData;

    cachedChampionData[championMapKey] = championData;
    cachedChampionIdToNameMap[Number(championData.key)] = championData.id;
  }
}

export async function preloadSummonerSpellData() {
  const version = cachedVersion ?? DEFAULT_DDRAGON_VERSION;
  const response = await fetch(
    `${DDRAGON_BASE_URL}/cdn/${version}/data/en_US/summoner.json`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch summoner spell data");
  }

  const { data } = await response.json();

  cachedSummonerSpells = {};
  for (const name in data) {
    const spellData = data[name];
    cachedSummonerSpells[spellData.key] = spellData;
  }
}

export async function preloadRuneData() {
  const version = cachedVersion ?? DEFAULT_DDRAGON_VERSION;
  const response = await fetch(
    `${DDRAGON_BASE_URL}/cdn/${version}/data/en_US/runesReforged.json`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch rune data");
  }

  const json = await response.json();
  
  cachedRuneData = {};
  for (const runeStyle of json) {
    cachedRuneData[runeStyle.id] = runeStyle;
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
export const getProfileIcon = (iconId?: number) => {
  const version = cachedVersion ?? DEFAULT_DDRAGON_VERSION;
  const iconFileName = `${iconId ?? "29"}.png`
  return `${DDRAGON_BASE_URL}/cdn/${version}/img/profileicon/${iconFileName}`;
};

export const getSummonerSpellData = (spellId: number): SummonerSpellData | undefined => {
  return cachedSummonerSpells?.[spellId];
}

export const getSummonerSpellIcon = (imagePath: string): string => {
  const version = cachedVersion ?? DEFAULT_DDRAGON_VERSION;

  return `${DDRAGON_BASE_URL}/cdn/${version}/img/spell/${imagePath}`;
}

export const getRuneStyleData = (runeId: number): RuneStyle | undefined => {
  return cachedRuneData?.[runeId];
}

export const getRuneStyleIcon = (runeStyleIcon: string): string | undefined => {
  return `${DDRAGON_BASE_URL}/cdn/img/${runeStyleIcon}`;
}

export const getChampionDataById = (id: number) => {
  const key = cachedChampionIdToNameMap?.[id]?.toLowerCase();
  if (!key) {
    return undefined;
  }

  return cachedChampionData?.[key];
}

export const getChampionIcon = (championName: string) => {
  const lowerCaseChampion = championName.toLowerCase();
  const championData = cachedChampionData?.[lowerCaseChampion];
  const imageName = championData?.image.full ?? `${championName}.png`;
  const version = cachedVersion ?? DEFAULT_DDRAGON_VERSION;

  return `${DDRAGON_BASE_URL}/cdn/${version}/img/champion/${imageName}`;
}

export const getChampionSplash = (champion?: string) => {
  const championKey = champion?.toString().toLowerCase();
  if (!championKey) {
    return;
  }

  const championData = cachedChampionData?.[championKey];
  const championId = championData?.id;
  if (!championId) {
    return;
  }

  return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_0.jpg`;
};

export function getItemData(itemId: number): ItemData | undefined {
  return cachedItemData?.[itemId.toString()];
}

export const getItemIcon = (itemId: number) =>{
  const version = cachedVersion ?? DEFAULT_DDRAGON_VERSION;
  return `${DDRAGON_BASE_URL}/cdn/${version}/img/item/${itemId}.png`;
}
