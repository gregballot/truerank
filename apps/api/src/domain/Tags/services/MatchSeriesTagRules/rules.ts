import { MatchTag } from "../../entities/MatchTag";
import { MatchSeriesTagRuleParams } from "./MatchSeriesTagRules";

export function loserQueue({ summonerMatches }: MatchSeriesTagRuleParams): void {
  const tag = new MatchTag('loser-queue', 'Loser Queue');
  const nMatches = summonerMatches.length;
  let loseStreak = 0;

  for (let i = nMatches - 1; i >= 0; i--) {
    const summonerMatch = summonerMatches[i];
    loseStreak = summonerMatch.isWinner ? 0 : loseStreak + 1;
    if (loseStreak > 2) {
      summonerMatch.addTag(tag.details);
    }
  }
}
