import { SharedTypes } from "@truerank/shared";

type Props = {
  metadata: SharedTypes.MatchMetadata;
  isWinner: boolean;
};

export function MatchListCardMetadata({
  metadata,
  isWinner
}: Props) {
  return (
    <div>
      <h3>{metadata.queue}</h3>
      <p>{metadata.gameCreation.toString()}</p>
      <hr/>
      <p>{metadata.gameDuration}</p>
      <p>{isWinner ? 'Victory' : 'Defeat' }</p>
    </div>
  );
}
