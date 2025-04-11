import { SharedTypes } from '@truerank/shared';

import { CacheAdapter } from '../cache/cacheAdapter';
import { lruCacheAdapterSingleton } from '../cache/lruCacheAdapter';

import { RiotMatch, RiotSummonerAccount, RiotSummonerProfile } from './types';

const RiotTokenHeaderName = 'X-Riot-Token';
const riotRegionBaseUrlMap: Record<SharedTypes.Region, string> = {
  BR: 'https://br.api.riotgames.com/lol',
  EUNE: 'https://eune.api.riotgames.com/lol',
  EUW: 'https://euw1.api.riotgames.com/lol',
  HK: 'https://hk.api.riotgames.com/lol',
  ID: 'https://id.api.riotgames.com/lol',
  JP: 'https://jp.api.riotgames.com/lol',
  KR: 'https://kr.api.riotgames.com/lol',
  LAN: 'https://lan.api.riotgames.com/lol',
  LAS: 'https://las.api.riotgames.com/lol',
  MO: 'https://mo.api.riotgames.com/lol',
  MY: 'https://my.api.riotgames.com/lol',
  NA: 'https://na.api.riotgames.com/lol',
  OCE: 'https://oce.api.riotgames.com/lol',
  PBE: 'https://pbe.api.riotgames.com/lol',
  PH: 'https://ph.api.riotgames.com/lol',
  RU: 'https://ru.api.riotgames.com/lol',
  SEA: 'https://sea.api.riotgames.com/lol',
  SG: 'https://sg.api.riotgames.com/lol',
  TH: 'https://th.api.riotgames.com/lol',
  TR: 'https://tr.api.riotgames.com/lol',
  TW: 'https://tw.api.riotgames.com/lol',
  VN: 'https://vn.api.riotgames.com/lol',
} as const;

const riotGlobalBaseUrlMap: Record<SharedTypes.Region, string> = {
  BR: 'https://americas.api.riotgames.com',
  EUNE: 'https://europe.api.riotgames.com',
  EUW: 'https://europe.api.riotgames.com',
  HK: 'https://asia.api.riotgames.com',
  ID: 'https://asia.api.riotgames.com',
  JP: 'https://asia.api.riotgames.com',
  KR: 'https://asia.api.riotgames.com',
  LAN: 'https://americas.api.riotgames.com',
  LAS: 'https://americas.api.riotgames.com',
  MO: 'https://asia.api.riotgames.com',
  MY: 'https://asia.api.riotgames.com',
  NA: 'https://americas.api.riotgames.com',
  OCE: 'https://sea.api.riotgames.com', // alternate SEA region
  PBE: 'https://americas.api.riotgames.com', // usually same as NA
  PH: 'https://asia.api.riotgames.com',
  RU: 'https://europe.api.riotgames.com',
  SEA: 'https://sea.api.riotgames.com',
  SG: 'https://asia.api.riotgames.com',
  TH: 'https://asia.api.riotgames.com',
  TR: 'https://europe.api.riotgames.com',
  TW: 'https://asia.api.riotgames.com',
  VN: 'https://asia.api.riotgames.com',
} as const;

type RegionBaseURL = (typeof riotRegionBaseUrlMap)[SharedTypes.Region];
type GlobalBaseURL = (typeof riotGlobalBaseUrlMap)[SharedTypes.Region];

export class RiotApiDriver {
  private globalBaseUrl: GlobalBaseURL;
  private regionBaseUrl: RegionBaseURL;
  private cacheAdapter: CacheAdapter;

  constructor(
    private readonly apiKey: string,
    private readonly region: SharedTypes.Region
  ) {
    this.globalBaseUrl = riotGlobalBaseUrlMap[this.region]
    this.regionBaseUrl = riotRegionBaseUrlMap[this.region];
    this.cacheAdapter = lruCacheAdapterSingleton; // change this to use a different cache
  }

  private async get<T>(
    baseUrl: string,
    path: string,
    params?: Record<string, string | number>,
    invalidateCache = false,
  ): Promise<{ data: T, fromCache: boolean }> {
    const urlBuilder = new URL(`${baseUrl}/${path}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        urlBuilder.searchParams.append(key, String(value));
      });
    }

    const url = urlBuilder.toString();

    if (!invalidateCache) {
      const cachedResult = this.cacheAdapter.get<T>(url);
      if (cachedResult) {
        console.log(`Cache hit on ${url}`)
        return { data: cachedResult, fromCache: true };
      }
    } else {
      console.log(`Cache invalidated on ${url}`)
    }

    const res = await fetch(url, {
      headers: {
        [RiotTokenHeaderName]: this.apiKey,
      },
    });

    if (!res.ok) {
      const error = await res.text().catch(() => '');
      throw new Error(
        `[Riot API] ${res.status} ${res.statusText}: ${error || 'No body'}`
      );
    }

    const data = await res.json();
    this.cacheAdapter.set(url, data);
    return { data, fromCache: false };
  }

  public async getSummonerByName(
    name: string,
    tag: string,
  ): Promise<RiotSummonerAccount> {
    const result = await this.get<RiotSummonerAccount>(
      this.globalBaseUrl,
      `riot/account/v1/accounts/by-riot-id/${name}/${tag}`,
    );
    return result.data;
  }

  public async getSummonerProfile(
    puuid: string,
    invalidateCache?: boolean,
  ): Promise<RiotSummonerProfile> {
    const result = await this.get<RiotSummonerProfile>(
      this.regionBaseUrl,
      `summoner/v4/summoners/by-puuid/${puuid}`,
      {},
      invalidateCache
    );
    return result.data;
  }

  public async getMatchIdsByPuuid(
    puuid: string,
    params?: {
      start?: number;
      pageSize?: number;
      invalidateCache?: boolean;
    }
  ): Promise<string[]> {
    const result = await this.get<string[]>(
      `${this.globalBaseUrl}/lol`,
      `match/v5/matches/by-puuid/${puuid}/ids`,
      {
        start: params?.start ?? 0,
        count: params?.pageSize ?? 5,
      },
      params?.invalidateCache
    );
    return result.data;
  }

  public getMatchById(matchId: string): Promise<{ data: RiotMatch, fromCache: boolean }> {
    return this.get<RiotMatch>(
      `${this.globalBaseUrl}/lol`,
      `match/v5/matches/${matchId}`
    );
  }

  public getMatchesByIds(matchIds: string[]): Promise<{ data: RiotMatch, fromCache: boolean }[]> {
    return Promise.all(matchIds.map((matchId) => this.getMatchById(matchId)));
  }
}
