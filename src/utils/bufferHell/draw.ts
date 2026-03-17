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
  scale = 2.5,
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
