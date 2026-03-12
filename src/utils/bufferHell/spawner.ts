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
    BUFFER_HELL_CONFIG.ENEMY.MIN_SPAWN_RATE,
    BUFFER_HELL_CONFIG.ENEMY.INITIAL_SPAWN_RATE -
      Math.floor(score / BUFFER_HELL_CONFIG.ENEMY.SPAWN_ACCELERATION),
  );
};

export const createEnemy = ({ frameCount, canvasWidth }: CreateEnemyProps) => {
  const angle = frameCount.current * BUFFER_HELL_CONFIG.ENEMY.ANGLE_INCREMENT;
  return {
    x: canvasWidth / 2,
    y: BUFFER_HELL_CONFIG.ENEMY.SPAWN_Y,
    velocityX: Math.cos(angle) * BUFFER_HELL_CONFIG.ENEMY.SPEED,
    velocityY: Math.sin(angle) * BUFFER_HELL_CONFIG.ENEMY.SPEED,
    radius: BUFFER_HELL_CONFIG.ENEMY.RADIUS,
  };
};
