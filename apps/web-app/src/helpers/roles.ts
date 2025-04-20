import { MatchRole, MatchRoles } from "@truerank/shared/types";

const rolesData: Record<MatchRole, { id: MatchRole, name: string }> = {
  [MatchRoles.TOP]:     { id: MatchRoles.TOP,     name: "Toplane" },
  [MatchRoles.JUNGLE]:  { id: MatchRoles.JUNGLE,  name: "Jungle" },
  [MatchRoles.MID]:     { id: MatchRoles.MID,     name: "Midlane" },
  [MatchRoles.ADC]:     { id: MatchRoles.ADC,     name: "AD Carry" },
  [MatchRoles.SUPPORT]: { id: MatchRoles.SUPPORT, name: "Support" },
}

export function getRoleData(roleId: MatchRole) {
  return rolesData[roleId];
}
