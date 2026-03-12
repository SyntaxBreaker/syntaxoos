import { BUFFER_HELL_CONFIG } from "../../constants";
import type { BufferHellBullet } from "../../types";

interface CreateBulletsProps {
  playerX: number;
  playerY: number;
  playerRadius: number;
  weaponLevel: React.RefObject<number>;
}

export const createBullets = ({
  playerX,
  playerY,
  playerRadius,
  weaponLevel,
}: CreateBulletsProps): BufferHellBullet[] => {
  const bulletRadius = BUFFER_HELL_CONFIG.BULLET.RADIUS;
  const newBullets: BufferHellBullet[] = [];

  newBullets.push({
    x: playerX,
    y: playerY - playerRadius,
    radius: bulletRadius,
  });

  if (weaponLevel.current >= 2) {
    newBullets.push({
      x: playerX + 15,
      y: playerY - playerRadius + 5,
      radius: bulletRadius,
    });
  }

  if (weaponLevel.current >= 3) {
    newBullets.push({
      x: playerX - 15,
      y: playerY - playerRadius + 5,
      radius: bulletRadius,
    });
  }

  return newBullets;
};
