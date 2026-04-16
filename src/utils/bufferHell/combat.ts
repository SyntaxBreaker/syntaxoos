import { BUFFER_HELL_CONFIG } from "../../constants";
import type { BufferHellBullet } from "../../types";

interface AddBulletProps {
  x: number;
  y: number;
  angle: number;
  spreadAngle?: number;
}

interface CreateBulletsProps {
  playerX: number;
  playerY: number;
  playerRadius: number;
  weaponLevel: number;
  angle: number;
}

export const addBullet = ({ x, y, angle, spreadAngle = 0 }: AddBulletProps) => {
  const finalAngle = angle + spreadAngle;
  const bulletSpeed = BUFFER_HELL_CONFIG.bullet.speed;

  return {
    x,
    y,
    velocityX: Math.cos(finalAngle) * bulletSpeed,
    velocityY: Math.sin(finalAngle) * bulletSpeed,
    radius: BUFFER_HELL_CONFIG.bullet.radius,
  };
};

export const createBullets = ({
  playerX,
  playerY,
  weaponLevel,
  angle,
}: CreateBulletsProps): BufferHellBullet[] => {
  const bullets: BufferHellBullet[] = [];

  bullets.push(addBullet({ x: playerX, y: playerY, angle }));

  if (weaponLevel >= 2) {
    bullets.push(
      addBullet({ x: playerX, y: playerY, angle, spreadAngle: 0.2 }),
    );
  }

  if (weaponLevel >= 3) {
    bullets.push(
      addBullet({ x: playerX, y: playerY, angle, spreadAngle: -0.2 }),
    );
  }

  return bullets;
};
