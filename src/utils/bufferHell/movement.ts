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
  const playerSpeed = keysRef.current["Shift"]
    ? BUFFER_HELL_CONFIG.PLAYER.SLOW_SPEED
    : BUFFER_HELL_CONFIG.PLAYER.NORMAL_SPEED;

  if (keysRef.current["a"] || keysRef.current["A"])
    playerRef.current.x -= playerSpeed;
  if (keysRef.current["d"] || keysRef.current["D"])
    playerRef.current.x += playerSpeed;
  if (keysRef.current["w"] || keysRef.current["W"])
    playerRef.current.y -= playerSpeed;
  if (keysRef.current["s"] || keysRef.current["S"])
    playerRef.current.y += playerSpeed;

  const playerMargin = BUFFER_HELL_CONFIG.PLAYER.MARGIN;
  playerRef.current.x = Math.max(
    playerMargin,
    Math.min(canvasWidth - playerMargin, playerRef.current.x),
  );
  playerRef.current.y = Math.max(
    playerMargin,
    Math.min(canvasHeight - playerMargin, playerRef.current.y),
  );
};
