export type ChampionData = {
  id: string;
  key: string;
  name: string;
  title: string;
  image: {
    full: string;
  };
};

export type Rune = {
  id: number;
  key: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  icon: string;
};

export type RuneStyle = {
  id: number;
  key: string;
  name: string;
  icon: string;
  slots: {
    runes: Rune[];
  }[];
};

export type SummonerSpellData = {
  id: string;
  name: string;
  description: string;
  key: string;
  image: { full: string };
};

export type ItemData = {
  name: string;
  description: string;
  plaintext?: string;
  image: { full: string };
};
