import { BUFFER_HELL_CONFIG } from "../../constants";

interface GetEnemySpawnRateProps {
  score: number;
}

interface CreateEnemyProps {
  frameCount: React.RefObject<number>;
  canvasWidth: number;
}

export const getEnemySpawnRate = ({ score }: GetEnemySpawnRateProps) => {
  return Math.max(
    BUFFER_HELL_CONFIG.enemy.minSpawnRate,
    BUFFER_HELL_CONFIG.enemy.initialSpawnRate -
      Math.floor(score / BUFFER_HELL_CONFIG.enemy.spawnAcceleration),
  );
};

export const createEnemy = ({ frameCount, canvasWidth }: CreateEnemyProps) => {
  const angle = frameCount.current * BUFFER_HELL_CONFIG.enemy.angleIncrement;
  return {
    x: canvasWidth / 2,
    y: BUFFER_HELL_CONFIG.enemy.spawnY,
    velocityX: Math.cos(angle) * BUFFER_HELL_CONFIG.enemy.speed,
    velocityY: Math.sin(angle) * BUFFER_HELL_CONFIG.enemy.speed,
    radius: BUFFER_HELL_CONFIG.enemy.radius,
  };
};
