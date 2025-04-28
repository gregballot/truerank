import { MatchTag } from "../../entities/MatchTag";
import { MatchTagRuleParams } from "./MatchTagRules";

export const loseExcuse = (() => {
  const loseExcuses = [
    { id: 'unwinnable', label: 'Unwinnable' },
    { id: 'help-questionmark', label: 'Help?' },
    { id: 'team-questionmark', label: 'Team?' },
    { id: 'trolled', label: 'Trolled' },
    { id: 'griefed', label: 'Griefed'},
    { id: 'cant-win', label: "Can't win" },
    { id: 'team-gap', label: 'Team Gap' },
  ];

  // static variables (in the C sense)
  let lastUsedSummoner: string | null = null;
  let currentIndex = 0;

  return function ({
    summonerPuuid,
    match,
  }: MatchTagRuleParams): MatchTag | null {
    if (!match.isParticipantWinner(summonerPuuid)) {
      if (summonerPuuid !== lastUsedSummoner) {
        lastUsedSummoner = summonerPuuid;
        currentIndex = 0;
      }

      const tag = loseExcuses[currentIndex];
      currentIndex = (currentIndex + 1) % loseExcuses.length;

      return new MatchTag(tag.id, tag.label);
    }

    return null;
  };
})();
