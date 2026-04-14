import { BUFFER_HELL_CONFIG } from "../../constants";

interface GetEnemySpawnRateProps {
  score: number;
}

interface CreateEnemyProps {
  canvasHeight: number;
  canvasWidth: number;
}

export const getEnemySpawnRate = ({ score }: GetEnemySpawnRateProps) => {
  return Math.max(
    BUFFER_HELL_CONFIG.enemy.minSpawnRate,
    BUFFER_HELL_CONFIG.enemy.initialSpawnRate -
      Math.floor(score / BUFFER_HELL_CONFIG.enemy.spawnAcceleration),
  );
};

export const createEnemy = ({
  canvasHeight,
  canvasWidth,
}: CreateEnemyProps) => {
  const margin = 60;
  const spawnSide = Math.floor(Math.random() * 4);

  const height = canvasHeight > 0 ? canvasHeight : 500;
  const width = canvasWidth > 0 ? canvasWidth : 900;

  const positions = [
    { x: Math.random() * width, y: -margin },
    { x: width + margin, y: Math.random() * height },
    { x: Math.random() * width, y: height + margin },
    { x: -margin, y: Math.random() * height },
  ];

  const { x, y } = positions[spawnSide];

  const enemyHealth = Math.floor(Math.random() * (20 - 1 + 1) + 1);

  return {
    x: x,
    y: y,
    velocityX: 0,
    velocityY: 0,
    radius: BUFFER_HELL_CONFIG.enemy.radius,
    damage: BUFFER_HELL_CONFIG.enemy.damage,
    health: enemyHealth,
    maxHealth: enemyHealth,
  };
};
