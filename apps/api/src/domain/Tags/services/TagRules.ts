import { Match } from '../../Matches/entities/Match';
import { MatchTag } from '../entities/MatchTag';

type TagRule = (
  summonerPuuid: string,
  match: Match,
) => MatchTag | null;

export const TagRules: TagRule[] = [

];
