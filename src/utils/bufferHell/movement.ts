import { BUFFER_HELL_CONFIG } from "../../constants";
import type { BufferHellPlayer } from "../../types";

interface HandlePlayerMovementProps {
  keysRef: React.RefObject<Record<string, boolean>>;
  playerRef: React.RefObject<BufferHellPlayer>;
  canvasWidth: number;
  canvasHeight: number;
}

export const handlePlayerMovement = ({
  keysRef,
  playerRef,
  canvasWidth,
  canvasHeight,
}: HandlePlayerMovementProps) => {
  if (!keysRef.current) return;

  const player = playerRef.current;
  const playerSpeed = keysRef.current["Shift"]
    ? BUFFER_HELL_CONFIG.player.slowSpeed
    : BUFFER_HELL_CONFIG.player.normalSpeed;

  if (keysRef.current["a"] || keysRef.current["A"]) player.x -= playerSpeed;
  if (keysRef.current["d"] || keysRef.current["D"]) player.x += playerSpeed;
  if (keysRef.current["w"] || keysRef.current["W"]) player.y -= playerSpeed;
  if (keysRef.current["s"] || keysRef.current["S"]) player.y += playerSpeed;

  const playerRadius = (player.radius * player.scale) / 2;
  player.x = Math.max(
    playerRadius,
    Math.min(canvasWidth - playerRadius, player.x),
  );
  player.y = Math.max(
    playerRadius,
    Math.min(canvasHeight - playerRadius, player.y),
  );
};
