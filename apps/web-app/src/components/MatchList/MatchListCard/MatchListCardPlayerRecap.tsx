import { SharedTypes } from "@truerank/shared";

type Props = {
  player: SharedTypes.MatchParticipant;
  gameDuration: number;
};

export function MatchListCardPlayerRecap({
  player,
  gameDuration
}: Props) {
  const kda = (player.kills + player.assists) / player.deaths;
  const csPerMinute = player.totalMinionsKilled / gameDuration;

  return (
    <div>
      <div>
        <div>
          { player.championName }
          { player.championLevel }
        </div>
        <div>
          <div>
            <p>{ player.kills } / { player.deaths } / { player.assists }</p>
            <p>{ kda.toFixed(2) } KDA</p>
          </div>
          <div>
            <p>{ player.totalMinionsKilled }</p>
            <p>{ csPerMinute } cs/min</p>
          </div>
        </div>

        <div>
          <div>Item1</div>
          <div>Item2</div>
          <div>Item3</div>
          <div>Item4</div>
          <div>Item5</div>
          <div>Item6</div>
          <div>Item7</div>
        </div>
      </div>

      { /* Tags section */ }
      <div>
        <div>Tag</div>
        <div>Tag</div>
        <div>Tag</div>
      </div>
    </div>
  );
}
