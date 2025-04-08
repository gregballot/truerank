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
let cachedSummonerSpells: Record<string, SummonerSpellData> | null = null;
let cachedRuneData: RuneStyle[] | null = null;
let cachedChampionData: Record<string, ChampionData> | null = null;

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
  for (const key in data) {
    const lowerCaseKey = key.toLowerCase();
    cachedChampionData[lowerCaseKey] = data[key];
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

  const json = await response.json();
  cachedSummonerSpells = json.data;
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
  cachedRuneData = json;
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

export const getSummonerSpellData = (spellId: number): SummonerSpellData | undefined => {
  return cachedSummonerSpells?.[spellId.toString()];
}

export const getRuneStyleData = (runeIndex: number): RuneStyle | undefined => {
  return cachedRuneData?.[runeIndex];
}

export const getChampionIcon = (championName: string) => {
  const lowerCaseChampion = championName.toLowerCase();
  const championData = cachedChampionData?.[lowerCaseChampion];
  const imageName = championData?.image.full ?? `${championName}.png`;
  const version = cachedVersion ?? DEFAULT_DDRAGON_VERSION;

  return `${DDRAGON_BASE_URL}/cdn/${version}/img/champion/${imageName}`;
}

export const getItemIcon = (itemId: number) =>{
  const version = cachedVersion ?? DEFAULT_DDRAGON_VERSION;
  return `${DDRAGON_BASE_URL}/cdn/${version}/img/item/${itemId}.png`;
}
