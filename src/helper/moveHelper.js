export function canPlayerUseMove(playerID, moveName, ctx, G) {
  const isPlayerCurrent = playerID === ctx.currentPlayer;
  const isPlayerActive = ctx?.activePlayers?.includes(moveName);
  return isPlayerCurrent && isPlayerActive;
}
