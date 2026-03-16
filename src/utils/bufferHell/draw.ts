interface ClearCanvasProps {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  color: string;
}

interface DrawCircleProps {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius: number;
  color: string;
}

interface DrawPlayerProps {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius: number;
  sprite: HTMLImageElement | null;
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

export const drawCircle = ({
  context,
  x,
  y,
  radius,
  color,
}: DrawCircleProps) => {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
  context.closePath();
};

export const drawPlayer = ({
  context,
  radius,
  sprite,
  x,
  y,
}: DrawPlayerProps) => {
  if (!sprite) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fillStyle = "#38BDF8";
    context.fill();
    context.closePath();
    return;
  }

  const size = radius * 2.5;
  context.drawImage(sprite, x - size / 2, y - size / 2, size, size);
};
