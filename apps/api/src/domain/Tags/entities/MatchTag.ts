import {
  MatchTagDetails,
  TagRarity,
  TagTone,
} from '@truerank/shared/types';

export class MatchTag {
  constructor(
    private readonly tagId: string,
    private readonly tagLabel: string,
    private readonly tagRarity: TagRarity,
    private readonly tagTone: TagTone,
  ) {}

  public get rarity(): TagRarity {
    return this.tagRarity;
  }

  public get details(): MatchTagDetails {
    return {
      id: this.tagId,
      label: this.tagLabel,
      tone: this.tagTone,
      rarity: this.rarity,
    };
  }
}
