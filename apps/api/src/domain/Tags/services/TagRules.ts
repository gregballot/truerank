import { Match } from '../../Matches/entities/Match';
import { MatchTag } from '../entities/MatchTag';

type TagRule = (puuid: string, match: Match) => MatchTag | null;

export const TagRules: TagRule[] = [
  testRule,
];

function testRule(): MatchTag | null {
  return null;
}

/* ideas for rules :

Glorifying:
-----------
Main Character => high kills
Isolated Menace => high solo kills
Life Enjoyer => low deaths
Friendship Specialist => high assists
First Responder => high KP
Existence Negator => high damage
Farming Industrialist => cs/min > 8
Goblin Lord => high gold
Pain Absorber => high damage taken
Mythical Pest Control => high objectives contribution
Lane Bully => outperformed the opponent laner
Minute One Menace => first blood
Tower Enthusiast => high tower destroyed

Delusionnal:
------------
Pacifist => low kills
Tactical Inting => high deaths
One Man Army => low assists
Combat Skeptic => low KP
Gentle => low damage
Vegan Activist => cs/min < 4
Budget Expert => low gold
Bullet Dodger => low damage taken
Fog Believer => low vision score
Wildlife Saver => low objectives contribution
Urban Preservationist => few/no tower destroyed
Movement Specialist => high distance traveled, low impact
Glasscanon => high deaths but high damage

*/
