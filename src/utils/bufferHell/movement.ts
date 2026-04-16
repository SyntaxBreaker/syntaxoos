import type { BufferHellPlayer } from "../../types";

interface HandlePlayerMovementProps {
  keys: Record<string, boolean>;
  player: BufferHellPlayer;
  canvasWidth: number;
  canvasHeight: number;
  playerMovementSpeed: number;
}

interface Enemy {
  x: number;
  y: number;
  radius: number;
  velocityX: number;
  velocityY: number;
}

interface Player {
  x: number;
  y: number;
  radius: number;
}

interface MoveEnemiesTowardPlayerProps {
  enemies: Enemy[];
  player: Player;
  speed: number;
  onPlayerHit: () => void;
}

export const handlePlayerMovement = ({
  keys,
  player,
  canvasWidth,
  canvasHeight,
  playerMovementSpeed,
}: HandlePlayerMovementProps) => {
  if (!keys) return;

  const playerSpeed = keys["Shift"]
    ? playerMovementSpeed / 2
    : playerMovementSpeed;

  if (keys["a"] || keys["A"]) player.x -= playerSpeed;
  if (keys["d"] || keys["D"]) player.x += playerSpeed;
  if (keys["w"] || keys["W"]) player.y -= playerSpeed;
  if (keys["s"] || keys["S"]) player.y += playerSpeed;

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

export const moveEnemiesTowardPlayer = ({
  enemies,
  player,
  speed,
  onPlayerHit,
}: MoveEnemiesTowardPlayerProps): void => {
  enemies.forEach((enemy) => {
    const deltaX = player.x - enemy.x;
    const deltaY = player.y - enemy.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY) || 1;

    enemy.velocityX = (deltaX / distance) * speed;
    enemy.velocityY = (deltaY / distance) * speed;
    enemy.x += enemy.velocityX;
    enemy.y += enemy.velocityY;

    if (distance < player.radius + enemy.radius) {
      onPlayerHit();
      enemy.x = -5000;
    }
  });
};

export const getAngleFromKeys = (
  keys: React.RefObject<Record<string, boolean>>,
): number | null => {
  let x = 0;
  let y = 0;

  if (keys.current["w"]) y -= 1;
  if (keys.current["s"]) y += 1;
  if (keys.current["a"]) x -= 1;
  if (keys.current["d"]) x += 1;

  if (x === 0 && y === 0) return null;

  return Math.atan2(y, x);
};
