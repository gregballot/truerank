import {
  MatchTagDetails,
} from '@truerank/shared/types';

import { Match } from "../../Matches/entities/Match";
import { MatchTag } from "./MatchTag";
import { TagRules } from '../services/TagRules';

export class TagsEngine {
  private _tags: MatchTag[] = [];

  constructor(
    private readonly summonerPuuid: string,
    private readonly match: Match,
  ) {}

  static forMatchParticipant(summonerPuuid: string, match: Match): TagsEngine {
    const engine = new TagsEngine(summonerPuuid, match);
    engine.generateTags();
    return engine;
  }

  public generateTags(): void {
    for (const rule of TagRules) {
      const tag = rule(this.summonerPuuid, this.match);
      if (tag !== null) {
        this._tags.push(tag);
      }
    }
  }

  public get tagsDetails(): MatchTagDetails[] {
    return this._tags.sort(
      (a, b) => a.rarity - b.rarity
    ).map(tag => tag.details);
  } 
}
