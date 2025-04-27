import { MatchParticipant } from '@truerank/shared/types';
import { TeamMetrics } from '../../Matches/entities/Match';
import { MatchTag } from '../entities/MatchTag';

type TagRule = (
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
) => MatchTag | null;

export const TagRules: TagRule[] = [
  mainCharacter,
  isolatedMenace,
  lifeEnjoyer,
  friendshipSpecialist,
  firstResponder,
  existenceNegator,
  farmingIndustrialist,
  goblinLord,
  painAbsorber,
  mythicalPestControl,
  laneBully,
  minuteOneMenace,
  towerEnthusiast,

  pacifist,
  tacticalInting,
  oneManArmy,
  combatSkeptic,
  gentle,
  veganActivist,
  budgetExpert,
  bulletDodger,
  fogBeliever,
  wildlifeSaver,
  urbanPreservationist,
  movementSpecialist,
  glasscanon
];

// gloryfying tag rules
function mainCharacter(
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
): MatchTag | null {
  const playerKills = participantData.kills;
  const threshold = teamMetrics.kills.highest * 0.8;
  if (playerKills > threshold) {
    return new MatchTag(
      'main-character',
      'Main Character',
      2,
      'glorifying',
    );
  }
  return null;
}

function isolatedMenace(
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
): MatchTag | null {
  const playerSoloKills = participantData.soloKills;
  const threshold = teamMetrics.soloKills.highest * 0.8;
  if (playerSoloKills > threshold) {
    return new MatchTag(
      'isolated-menace',
      'Isolated Menace',
      3,
      'glorifying',
    );
  }
  return null;
}

function lifeEnjoyer(
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
): MatchTag | null {
  const playerDeaths = participantData.deaths;
  const threshold = teamMetrics.deaths.lowest * 1.2;
  if (playerDeaths < threshold) {
    return new MatchTag(
      'life-enjoyer',
      'Life Enjoyer',
      1,
      'glorifying',
    );
  }
  return null;
}

function friendshipSpecialist(
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
): MatchTag | null {
  const playerAssists = participantData.assists;
  const threshold = teamMetrics.assists.highest * 0.8;
  if (playerAssists > threshold) {
    return new MatchTag(
      'friendship-specialist',
      'Friendship Specialist',
      2,
      'glorifying',
    );
  }
  return null;
}
function firstResponder(
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
): MatchTag | null {
  if (teamMetrics.kills.total === 0) {
    return null;
  }

  const kp = participantData.kills / teamMetrics.kills.total * 100;
  if (kp > 50) {
    return new MatchTag(
      'first-responder',
      'First Responder',
      2,
      'glorifying',
    );
  }
  return null;
}

function existenceNegator(
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
): MatchTag | null {
  const playerDamage = participantData.damageDealtToChampions;
  const threshold = teamMetrics.damageDealtToChampions.highest * 0.8;
  if (playerDamage > threshold) {
    return new MatchTag(
      'existence-negator',
      'Existence Negator',
      3,
      'glorifying',
    );
  }
  return null;
}

function farmingIndustrialist(
  participantData: MatchParticipant,
): MatchTag | null {
  if (participantData.csMin >= 8) {
    return new MatchTag(
      'farming-industrialist',
      'Farming Industrialist',
      1,
      'glorifying',
    );
  }
  return null;
}

function goblinLord(
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
): MatchTag | null {
  const playerGold = participantData.goldEarned;
  const threshold = teamMetrics.goldEarned.highest * 0.8;
  if (playerGold > threshold) {
    return new MatchTag(
      'goblin-lord',
      'Goblin Lord',
      2,
      'glorifying',
    );
  }
  return null;
}

function painAbsorber(
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
): MatchTag | null {
  const playerDamageTaken = participantData.damageTaken;
  const threshold = teamMetrics.damageTaken.highest * 0.8;
  if (playerDamageTaken > threshold) {
    return new MatchTag(
      'pain-absorber',
      'Pain Absorber',
      1,
      'glorifying',
    );
  }
  return null;
}

function mythicalPestControl(
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
): MatchTag | null {
  const playerObjDamage = participantData.damageDealtToObjectives;
  const threshold = teamMetrics.damageDealtToObjectives.highest * 0.8;
  if (playerObjDamage > threshold) {
    return new MatchTag(
      'mythical-pest-control',
      'Mythical Pest Control',
      2,
      'glorifying',
    );
  }
  return null;
}

function laneBully(): MatchTag | null {
  // need more data in here
  return null;
}

function minuteOneMenace(
  participantData: MatchParticipant,
): MatchTag | null {
  if (participantData.firstBloodAssist > 0) {
    return new MatchTag(
      'minute-one-menace',
      'Minute One Menace',
      3,
      'glorifying',
    );
  }
  return null;
}

function towerEnthusiast(
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
): MatchTag | null {
  const playerTowerTakedowns = participantData.turretTakedowns;
  const threshold = teamMetrics.turretTakedowns.highest * 0.8;
  if (playerTowerTakedowns > threshold) {
    return new MatchTag(
      'tower-enthusiast',
      'Tower Enthusiast',
      1,
      'glorifying',
    );
  }
  return null;
}

// delusional tags rules
function pacifist(
  participantData: MatchParticipant,
): MatchTag | null {
  if (participantData.kills === 0) {
    return new MatchTag(
      'pacifist',
      'Pacifist',
      2,
      'delusional',
    );
  }
  return null;
}

function tacticalInting(
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
): MatchTag | null {
  const threshold = teamMetrics.deaths.highest * 0.8;
  if (participantData.deaths > threshold) {
    return new MatchTag(
      'tactical-inting',
      'Tactical Inting',
      1,
      'delusional',
    );
  }
  return null;
}

function oneManArmy(
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
): MatchTag | null {
  const playerAssists = participantData.assists;
  const threshold = teamMetrics.assists.lowest * 1.2;
  if (playerAssists < threshold) {
    return new MatchTag(
      'one-man-army',
      'One Man Army',
      2,
      'delusional',
    );
  }
  return null;
}

function combatSkeptic(
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
): MatchTag | null {
  const kp = (participantData.kills + participantData.assists) / teamMetrics.kills.total * 100;
  if (kp < 20) {
    return new MatchTag(
      'combat-skeptic',
      'Combat Skeptic',
      1,
      'delusional',
    );
  }
  return null;
}

function gentle(
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
): MatchTag | null {
  const playerDamage = participantData.damageDealtToChampions;
  const threshold = teamMetrics.damageDealtToChampions.lowest * 1.2;
  if (playerDamage < threshold) {
    return new MatchTag(
      'gentle',
      'Gentle',
      1,
      'delusional',
    );
  }
  return null;
}

function veganActivist(
  participantData: MatchParticipant,
): MatchTag | null {
  if (participantData.csMin <= 4) {
    return new MatchTag(
      'vegan-activist',
      'Vegan Activist',
      2,
      'delusional',
    );
  }
  return null;
}

function budgetExpert(
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
): MatchTag | null {
  const playerGold = participantData.goldEarned;
  const threshold = teamMetrics.goldEarned.lowest * 1.2;
  if (playerGold < threshold) {
    return new MatchTag(
      'budget-expert',
      'Budget Expert',
      1,
      'delusional',
    );
  }
  return null;
}

function bulletDodger(
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
): MatchTag | null {
  const playerDamageTaken = participantData.damageTaken;
  const threshold = teamMetrics.damageTaken.lowest * 1.2;
  if (playerDamageTaken < threshold) {
    return new MatchTag(
      'bullet-dodger',
      'Bullet Dodger',
      1,
      'delusional',
    );
  }
  return null;
}

function fogBeliever(
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
): MatchTag | null {
  const vision = participantData.visionScore;
  const threshold = teamMetrics.visionScore.lowest * 1.2;
  if (vision < threshold) {
    return new MatchTag(
      'fog-believer',
      'Fog Believer',
      1,
      'delusional',
    );
  }
  return null;
}

function wildlifeSaver(
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
): MatchTag | null {
  const objDamage = participantData.damageDealtToObjectives;
  const threshold = teamMetrics.damageDealtToObjectives.lowest * 1.2;
  if (objDamage < threshold) {
    return new MatchTag(
      'wildlife-saver',
      'Wildlife Saver',
      1,
      'delusional',
    );
  }
  return null;
}

function urbanPreservationist(
  participantData: MatchParticipant,
): MatchTag | null {
  if (participantData.turretTakedowns === 0) {
    return new MatchTag(
      'urban-preservationist',
      'Urban Preservationist',
      1,
      'delusional',
    );
  }
  return null;
}

function movementSpecialist(
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
): MatchTag | null {
  const distance = participantData.distanceTraveled;
  const kills = participantData.kills;
  const assists = participantData.assists;
  const damage = participantData.damageDealtToChampions;

  const distanceThreshold = teamMetrics.distanceTraveled.highest * 0.7;
  const killsThreshold = teamMetrics.kills.average;
  const assistsThreshold = teamMetrics.assists.average;
  const damageThreshold = teamMetrics.damageDealtToChampions.average;

  if (distance > distanceThreshold && (
    kills < killsThreshold ||
    assists < assistsThreshold ||
    damage < damageThreshold
  )) {
    return new MatchTag(
      'movement-specialist',
      'Movement Specialist',
      2,
      'delusional',
    );
  }
  return null;
}

function glasscanon(
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
): MatchTag | null {
  const deaths = participantData.deaths;
  const damage = participantData.damageDealtToChampions;
  const thresholdDamage = teamMetrics.damageDealtToChampions.highest * 0.7;
  const thresholdDeaths = teamMetrics.deaths.highest * 0.7;
  if (deaths > thresholdDeaths && damage > thresholdDamage) {
    return new MatchTag(
      'glasscanon',
      'Glasscanon',
      3,
      'delusional',
    );
  }
  return null;
}
