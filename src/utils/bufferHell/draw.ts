import type { BufferHellExperienceGem } from "../../types";

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
