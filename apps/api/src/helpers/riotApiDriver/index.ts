import { SharedTypes } from '@truerank/shared';

import { CacheAdapter } from '../cache/cacheAdapter';
import { lruCacheAdapterSingleton } from '../cache/lruCacheAdapter';

import { RiotMatch, RiotSummonerAccount } from './types';

const RiotTokenHeaderName = 'X-Riot-Token';
const riotBaseUrlMap: Record<SharedTypes.Region, string> = {
  BR: 'https://br.api.riotgames.com/lol',
  EUNE: 'https://eune.api.riotgames.com/lol',
  EUW: 'https://europe.api.riotgames.com/lol',
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

type BaseURL = (typeof riotBaseUrlMap)[SharedTypes.Region];

export class RiotApiDriver {
  private globalBaseUrl = 'https://europe.api.riotgames.com';
  private regionBaseUrl: BaseURL;
  private cacheAdapter: CacheAdapter;

  constructor(
    private readonly apiKey: string,
    private readonly region: SharedTypes.Region
  ) {
    this.regionBaseUrl = riotBaseUrlMap[this.region];
    this.cacheAdapter = lruCacheAdapterSingleton; // change this to use a different cache
  }

  private async get<T>(
    baseUrl: string,
    path: string,
    params?: Record<string, string | number>
  ): Promise<T> {
    const urlBuilder = new URL(`${baseUrl}/${path}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        urlBuilder.searchParams.append(key, String(value));
      });
    }

    const url = urlBuilder.toString();
    const cachedResult = this.cacheAdapter.get<T>(url);
    if (cachedResult) {
      return cachedResult;
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
    return data;
  }

  public getSummonerByName(
    name: string,
    tag: string
  ): Promise<RiotSummonerAccount> {
    return this.get<RiotSummonerAccount>(
      this.globalBaseUrl,
      `riot/account/v1/accounts/by-riot-id/${name}/${tag}`
    );
  }

  public getMatchIdsByPuuid(
    puuid: string,
    params?: {
      start?: number;
      pageSize?: number;
    }
  ): Promise<string[]> {
    return this.get<string[]>(
      this.regionBaseUrl,
      `match/v5/matches/by-puuid/${puuid}/ids`,
      {
        start: params?.start ?? 0,
        count: params?.pageSize ?? 5,
      }
    );
  }

  public getMatchById(matchId: string): Promise<RiotMatch> {
    return this.get<RiotMatch>(
      this.regionBaseUrl,
      `match/v5/matches/${matchId}`
    );
  }

  public getMatchesByIds(matchIds: string[]): Promise<RiotMatch[]> {
    return Promise.all(matchIds.map((matchId) => this.getMatchById(matchId)));
  }
}
