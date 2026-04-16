import type {
  BufferHellBullet,
  BufferHellEnemy,
  BufferHellExperienceGem,
  BufferHellPlayer,
} from "../../types";

interface ClearCanvasProps {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  color: string;
}

interface RenderSpriteProps {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius: number;
  sprite: HTMLImageElement | null;
  scale?: number;
  fallbackColor: string;
}

interface DrawExperienceGemProps {
  context: CanvasRenderingContext2D;
  gem: BufferHellExperienceGem;
}

interface DrawEnemyHealthBarProps {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius: number;
  currentHP: number;
  maxHP: number;
}

interface RenderSceneProps {
  context: CanvasRenderingContext2D;
  dimensions: {
    width: number;
    height: number;
  };
  player: BufferHellPlayer;
  playerSprite: HTMLImageElement | null;
  enemies: BufferHellEnemy[];
  enemySprite: HTMLImageElement | null;
  bullets: BufferHellBullet[];
  bulletSprite: HTMLImageElement | null;
  gems: BufferHellExperienceGem[];
}

export const clearCanvas = ({
  context,
  width,
  height,
  color,
}: ClearCanvasProps) => {
  context.fillStyle = color;
  context.fillRect(0, 0, width, height);
};

export const renderSprite = ({
  context,
  fallbackColor,
  radius,
  scale = 4,
  sprite,
  x,
  y,
}: RenderSpriteProps) => {
  if (!sprite) {
    context.fillStyle = fallbackColor;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
    context.closePath();
    return;
  }

  const size = radius * scale;
  context.drawImage(sprite, x - size / 2, y - size / 2, size, size);
};

export const drawExperienceGem = ({ context, gem }: DrawExperienceGemProps) => {
  context.save();

  const pulse = Math.sin(Date.now() / 150) * 2;
  const size = 6 + pulse / 2;

  context.beginPath();
  context.fillStyle = "#10B981";
  context.shadowBlur = 12 + pulse;
  context.shadowColor = "#10B981";

  context.moveTo(gem.x, gem.y - size);
  context.lineTo(gem.x + size - 2, gem.y);
  context.lineTo(gem.x, gem.y + size);
  context.lineTo(gem.x - size + 2, gem.y);

  context.closePath();
  context.fill();

  context.restore();
};

export const renderEnemyHealthBar = ({
  context,
  x,
  y,
  radius,
  currentHP,
  maxHP,
}: DrawEnemyHealthBarProps) => {
  if (currentHP >= maxHP) return;

  const enemyHealthBarWidth = radius * 5;
  const enemyHealthBarHeight = 4;
  const enemyHealthPercentage = Math.max(0, currentHP / maxHP);

  const enemyHealthBarX = x - enemyHealthBarWidth / 2;
  const enemyHealthBarY = y - radius - 10;

  context.fillStyle = "rgba(0, 0, 0, 0.7)";
  context.fillRect(
    enemyHealthBarX,
    enemyHealthBarY,
    enemyHealthBarWidth,
    enemyHealthBarHeight,
  );

  context.fillStyle = enemyHealthPercentage > 0.4 ? "#10B981" : "#EF4444";
  context.fillRect(
    enemyHealthBarX,
    enemyHealthBarY,
    enemyHealthBarWidth * enemyHealthPercentage,
    enemyHealthBarHeight,
  );
};

export const renderScene = ({
  context,
  dimensions,
  player,
  playerSprite,
  enemies,
  enemySprite,
  bullets,
  bulletSprite,
  gems,
}: RenderSceneProps) => {
  clearCanvas({
    context,
    width: dimensions.width,
    height: dimensions.height,
    color: "#0F172A",
  });

  gems.forEach((gem) =>
    drawExperienceGem({
      context,
      gem,
    }),
  );

  bullets.forEach((bullet) =>
    renderSprite({
      context,
      fallbackColor: "#38BDF8",
      radius: bullet.radius,
      sprite: bulletSprite,
      x: bullet.x,
      y: bullet.y,
    }),
  );

  enemies.forEach((enemy) => {
    renderSprite({
      context,
      fallbackColor: "#FB7185",
      radius: enemy.radius,
      sprite: enemySprite,
      x: enemy.x,
      y: enemy.y,
    });

    renderEnemyHealthBar({
      context,
      radius: enemy.radius,
      currentHP: enemy.health,
      maxHP: enemy.maxHealth,
      x: enemy.x,
      y: enemy.y,
    });
  });

  renderSprite({
    context,
    fallbackColor: "#38BDF8",
    radius: player.radius,
    sprite: playerSprite,
    x: player.x,
    y: player.y,
    scale: 8,
  });
};
