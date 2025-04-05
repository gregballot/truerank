export async function fetchMatches(summonerName: string, summonerTag: string): Promise<object[]> {
    const res = await fetch(
        `/api/matches?summonerName=${
            encodeURIComponent(summonerName)
        }&summonerTag=${
            encodeURIComponent(summonerTag)
        }`
    );

    if (!res.ok) {
        throw new Error('Failed to fetch match history')
    }

    return res.json()
}
