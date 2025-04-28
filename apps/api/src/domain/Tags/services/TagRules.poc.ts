import { MatchParticipant } from '@truerank/shared/types';
import { MatchTag } from '../entities/MatchTag';
import { TeamMetrics } from '../../Matches/entities/types';
import { TagRule } from './types';

type TagRuleParams = {
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
};

export const TagRules: TagRule<TagRuleParams, MatchTag | null>[] = [
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
function mainCharacter(params: {
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
}): MatchTag | null {
  const playerKills = params.participantData.kills;
  const threshold = params.teamMetrics.kills.highest * 0.8;
  if (playerKills > threshold) {
    return new MatchTag(
      'main-character',
      'Main Character',
    );
  }
  return null;
}

function isolatedMenace(params: {
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
}): MatchTag | null {
  const playerSoloKills = params.participantData.soloKills;
  const threshold = params.teamMetrics.soloKills.highest * 0.8;
  if (playerSoloKills > threshold) {
    return new MatchTag(
      'isolated-menace',
      'Isolated Menace',
    );
  }
  return null;
}

function lifeEnjoyer(params: {
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
}): MatchTag | null {
  const playerDeaths = params.participantData.deaths;
  const threshold = params.teamMetrics.deaths.lowest * 1.2;
  if (playerDeaths < threshold) {
    return new MatchTag(
      'life-enjoyer',
      'Life Enjoyer',
    );
  }
  return null;
}

function friendshipSpecialist(params: {
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
}): MatchTag | null {
  const playerAssists = params.participantData.assists;
  const threshold = params.teamMetrics.assists.highest * 0.8;
  if (playerAssists > threshold) {
    return new MatchTag(
      'friendship-specialist',
      'Friendship Specialist',
    );
  }
  return null;
}
function firstResponder(params: {
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
}): MatchTag | null {
  if (params.teamMetrics.kills.total === 0) {
    return null;
  }

  const kp = params.participantData.kills / params.teamMetrics.kills.total * 100;
  if (kp > 50) {
    return new MatchTag(
      'first-responder',
      'First Responder',
    );
  }
  return null;
}

function existenceNegator(params: {
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
}): MatchTag | null {
  const playerDamage = params.participantData.damageDealtToChampions;
  const threshold = params.teamMetrics.damageDealtToChampions.highest * 0.8;
  if (playerDamage > threshold) {
    return new MatchTag(
      'existence-negator',
      'Existence Negator',
    );
  }
  return null;
}

function farmingIndustrialist(params: {
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
}): MatchTag | null {
  if (params.participantData.csMin >= 8) {
    return new MatchTag(
      'farming-industrialist',
      'Farming Industrialist',
    );
  }
  return null;
}

function goblinLord(params: {
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
}): MatchTag | null {
  const playerGold = params.participantData.goldEarned;
  const threshold = params.teamMetrics.goldEarned.highest * 0.8;
  if (playerGold > threshold) {
    return new MatchTag(
      'goblin-lord',
      'Goblin Lord',
    );
  }
  return null;
}

function painAbsorber(params: {
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
}): MatchTag | null {
  const playerDamageTaken = params.participantData.damageTaken;
  const threshold = params.teamMetrics.damageTaken.highest * 0.8;
  if (playerDamageTaken > threshold) {
    return new MatchTag(
      'pain-absorber',
      'Pain Absorber',
    );
  }
  return null;
}

function mythicalPestControl(params: {
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
}): MatchTag | null {
  const playerObjDamage = params.participantData.damageDealtToObjectives;
  const threshold = params.teamMetrics.damageDealtToObjectives.highest * 0.8;
  if (playerObjDamage > threshold) {
    return new MatchTag(
      'mythical-pest-control',
      'Mythical Pest Control',
    );
  }
  return null;
}

function laneBully(): MatchTag | null {
  // need more data in here
  return null;
}

function minuteOneMenace(params: {
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
}): MatchTag | null {
  if (params.participantData.firstBloodAssist > 0) {
    return new MatchTag(
      'minute-one-menace',
      'Minute One Menace',
    );
  }
  return null;
}

function towerEnthusiast(params: {
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
}): MatchTag | null {
  const playerTowerTakedowns = params.participantData.turretTakedowns;
  const threshold = params.teamMetrics.turretTakedowns.highest * 0.8;
  if (playerTowerTakedowns > threshold) {
    return new MatchTag(
      'tower-enthusiast',
      'Tower Enthusiast',
    );
  }
  return null;
}

// delusional tags rules
function pacifist(params: {
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
}): MatchTag | null {
  if (params.participantData.kills === 0) {
    return new MatchTag(
      'pacifist',
      'Pacifist',
    );
  }
  return null;
}

function tacticalInting(params: {
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
}): MatchTag | null {
  const threshold = params.teamMetrics.deaths.highest * 0.8;
  if (params.participantData.deaths > threshold) {
    return new MatchTag(
      'tactical-inting',
      'Tactical Inting',
    );
  }
  return null;
}

function oneManArmy(params: {
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
}): MatchTag | null {
  const playerAssists = params.participantData.assists;
  const threshold = params.teamMetrics.assists.lowest * 1.2;
  if (playerAssists < threshold) {
    return new MatchTag(
      'one-man-army',
      'One Man Army',
    );
  }
  return null;
}

function combatSkeptic(params: {
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
}): MatchTag | null {
  const kp = (
    params.participantData.kills + params.participantData.assists
  ) / params.teamMetrics.kills.total * 100;

  if (kp < 20) {
    return new MatchTag(
      'combat-skeptic',
      'Combat Skeptic',
    );
  }
  return null;
}

function gentle(params: {
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
}): MatchTag | null {
  const playerDamage = params.participantData.damageDealtToChampions;
  const threshold = params.teamMetrics.damageDealtToChampions.lowest * 1.2;
  if (playerDamage < threshold) {
    return new MatchTag(
      'gentle',
      'Gentle',
    );
  }
  return null;
}

function veganActivist(params: {
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
}): MatchTag | null {
  if (params.participantData.csMin <= 4) {
    return new MatchTag(
      'vegan-activist',
      'Vegan Activist',
    );
  }
  return null;
}

function budgetExpert(params: {
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
}): MatchTag | null {
  const playerGold = params.participantData.goldEarned;
  const threshold = params.teamMetrics.goldEarned.lowest * 1.2;
  if (playerGold < threshold) {
    return new MatchTag(
      'budget-expert',
      'Budget Expert',
    );
  }
  return null;
}

function bulletDodger(params: {
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
}): MatchTag | null {
  const playerDamageTaken = params.participantData.damageTaken;
  const threshold = params.teamMetrics.damageTaken.lowest * 1.2;
  if (playerDamageTaken < threshold) {
    return new MatchTag(
      'bullet-dodger',
      'Bullet Dodger',
    );
  }
  return null;
}

function fogBeliever(params: {
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
}): MatchTag | null {
  const vision = params.participantData.visionScore;
  const threshold = params.teamMetrics.visionScore.lowest * 1.2;
  if (vision < threshold) {
    return new MatchTag(
      'fog-believer',
      'Fog Believer',
    );
  }
  return null;
}

function wildlifeSaver(params: {
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
}): MatchTag | null {
  const objDamage = params.participantData.damageDealtToObjectives;
  const threshold = params.teamMetrics.damageDealtToObjectives.lowest * 1.2;
  if (objDamage < threshold) {
    return new MatchTag(
      'wildlife-saver',
      'Wildlife Saver',
    );
  }
  return null;
}

function urbanPreservationist(params: {
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
}): MatchTag | null {
  if (params.participantData.turretTakedowns === 0) {
    return new MatchTag(
      'urban-preservationist',
      'Urban Preservationist',
    );
  }
  return null;
}

function movementSpecialist(params: {
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
}): MatchTag | null {
  const distance = params.participantData.distanceTraveled;
  const kills = params.participantData.kills;
  const assists = params.participantData.assists;
  const damage = params.participantData.damageDealtToChampions;

  const distanceThreshold = params.teamMetrics.distanceTraveled.highest * 0.7;
  const killsThreshold = params.teamMetrics.kills.average;
  const assistsThreshold = params.teamMetrics.assists.average;
  const damageThreshold = params.teamMetrics.damageDealtToChampions.average;

  if (distance > distanceThreshold && (
    kills < killsThreshold ||
    assists < assistsThreshold ||
    damage < damageThreshold
  )) {
    return new MatchTag(
      'movement-specialist',
      'Movement Specialist',
    );
  }
  return null;
}

function glasscanon(params: {
  participantData: MatchParticipant,
  teamMetrics: TeamMetrics,
}): MatchTag | null {
  const deaths = params.participantData.deaths;
  const damage = params.participantData.damageDealtToChampions;
  const thresholdDamage = params.teamMetrics.damageDealtToChampions.highest * 0.7;
  const thresholdDeaths = params.teamMetrics.deaths.highest * 0.7;
  if (deaths > thresholdDeaths && damage > thresholdDamage) {
    return new MatchTag(
      'glasscanon',
      'Glasscanon',
    );
  }
  return null;
}
