import {
  MatchTagDetails,
} from '@truerank/shared/types';

export class MatchTag {
  constructor(
    private readonly tagId: string,
    private readonly tagLabel: string,
  ) {}

  public get details(): MatchTagDetails {
    return {
      id: this.tagId,
      label: this.tagLabel,
    };
  }
}
