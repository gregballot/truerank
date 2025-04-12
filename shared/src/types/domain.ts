// Summoner
export type SummonerData = {
    puuid: string;
    gameName: string;
    tagLine: string;
    level?: number;
    icon?: number;
};

export type SummonerDetails = SummonerData & {
    soloRank?: SummonerLeague;
    flexRank?: SummonerLeague;
}

export const QueueTypeRankedSolo = 'RANKED_SOLO_5x5';
export const QueueTypeRankedFlex = 'RANKED_FLEX_SR';
export type QueueType = typeof QueueTypeRankedSolo | typeof QueueTypeRankedFlex

export const Ranks = [
    'IRON',
    'BRONZE',
    'SILVER',
    'GOLD',
    'PLATINUM',
    'EMERALD',
    'DIAMOND',
    'MASTER',
    'GRANDMASTER',
    'CHALLENGER',
] as const;

export type Rank = typeof Ranks[number];

export type SummonerLeague = {
    leagueId: string;
    queueType: QueueType;
    rank: Rank;
    division: {
        raw: 1 | 2 | 3 | 4;
        formatted: 'I' | 'II' | 'III' | 'IV';
    };
    lpAmount: number;
    wins: number;
    losses: number;
}

export type SummonerLightDetails = Omit<SummonerData, "level" | "icon">

// Match
export const QueueNames = {
    NORMAL_DRAFT: 'Normal Draft',
    RANKED_SOLODUO: 'Ranked Solo/Duo',
    NORMAL_BLIND: 'Normal Blind',
    RANKED_FLEX: 'Ranked Flex',
    ARAM: 'ARAM',
    CLASH: 'Clash',
    COOP_VS_AI_INTRO: 'Co-op vs AI Intro',
    COOP_VS_AI_BEGINNER: 'Co-op vs AI Beginner',
    COOP_VS_AI_INTERMEDIATE: 'Co-op vs AI Intermediate',
    ARURF: 'ARURF',
    NEMESIS_DRAFT: 'Nemesis Draft',
    NEXUS_BLITZ: 'Nexus Blitz',
    ULTIMATE_SPELLBOOK: 'Ultimate Spellbook',
    ARENA: 'Arena',
    TUTORIAL_1: 'Tutorial 1',
    TUTORIAL_2: 'Tutorial 2',
    TUTORIAL_3: 'Tutorial 3',
} as const;

export type QueueName = typeof QueueNames[keyof typeof QueueNames];

export type MatchMetadata = {
    gameId: string;
    gameMode: string;
    queueName: QueueName;
    gameCreation: Date;
    gameDuration: number;
};

export const MatchRoles = {
    TOP: 1,
    JUNGLE: 2,
    MID: 3,
    ADC: 4,
    SUPPORT: 5,
} as const;

export type MatchRole = typeof MatchRoles[keyof typeof MatchRoles];
export type MatchParticipant = {
    summoner: SummonerData;

    role: MatchRole;
    championId: number;
    championName: string;
    championLevel: number;

    summonerSpells: number[];
    runeStyles: number[];

    won: boolean;
    kills: number;
    deaths: number;
    assists: number;
    totalMinionsKilled: number;

    items: number[];
    trinket: number;
};
  
export type MatchData = {
    metadata: MatchMetadata;
    redTeam: MatchParticipant[];
    blueTeam: MatchParticipant[];
    winnerSide: 'red' | 'blue';
    isNew: boolean;
};

// SummonerMatch
export type SummonerMatchData = {
    isWinner: boolean;
    match: MatchData;
    summoner: SummonerLightDetails;
};
