import { SharedTypes } from "@truerank/shared";

type Props = {
  team: SharedTypes.MatchParticipant[];
};

export function MatchListCardTeam({
  team
}: Props) {
  return (
    <div>
      <div>
        {
          team.map(player => (
            <ul>
              <li>{ player.summoner.gameName }</li>
            </ul>
          ))
        }
      </div>
    </div>
  );
}
