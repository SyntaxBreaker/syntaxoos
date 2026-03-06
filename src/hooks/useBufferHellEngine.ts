import { useCallback, useEffect, useRef } from "react";
import { useBufferHellStore } from "../store/bufferHellStore";

interface UseBufferHellEngineProps {
  canvasHeight: number;
  canvasWidth: number;
}

interface BulletState {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  radius: number;
}

function useBufferHellEngine({
  canvasHeight,
  canvasWidth,
}: UseBufferHellEngineProps) {
  const status = useBufferHellStore((state) => state.status);
  const addScore = useBufferHellStore((state) => state.addScore);
  const endGame = useBufferHellStore((state) => state.endGame);

  const player = useRef({
    x: canvasWidth / 2,
    y: canvasHeight - 100,
    radius: 5,
  });
  const bullets = useRef<BulletState[]>([]);
  const frameCount = useRef(0);

  useEffect(() => {
    if (status === "PLAYING") {
      bullets.current = [];

      player.current = {
        x: canvasWidth / 2,
        y: canvasHeight - 100,
        radius: 5,
      };

      frameCount.current = 0;
    }
  }, [status, canvasHeight, canvasWidth]);

  const tick = useCallback(
    (keys: Record<string, boolean>) => {
      if (status !== "PLAYING") return;

      frameCount.current++;

      const playerSpeed = keys["Shift"] ? 2 : 4;
      if (keys["ArrowLeft"] && player.current.x > 10)
        player.current.x -= playerSpeed;
      if (keys["ArrowRight"] && player.current.x < canvasWidth - 10)
        player.current.x += playerSpeed;
      if (keys["ArrowUp"] && player.current.y > 10)
        player.current.y -= playerSpeed;
      if (keys["ArrowDown"] && player.current.y < canvasHeight - 10)
        player.current.y += playerSpeed;

      if (frameCount.current % 5 === 0) {
        const angle = frameCount.current * 0.15;
        bullets.current.push({
          x: canvasWidth / 2,
          y: 150,
          velocityX: Math.cos(angle) * 3,
          velocityY: Math.sin(angle) * 3,
          radius: 3,
        });
        addScore(1);
      }

      bullets.current.forEach((bullet) => {
        bullet.x += bullet.velocityX;
        bullet.y += bullet.velocityY;

        const deltaX = bullet.x - player.current.x;
        const deltaY = bullet.y - player.current.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < bullet.radius + player.current.radius) {
          endGame();
        }
      });

      bullets.current = bullets.current.filter(
        (bullet) =>
          bullet.x > 0 &&
          bullet.x < canvasWidth &&
          bullet.y > 0 &&
          bullet.y < canvasHeight,
      );
    },
    [status, addScore, endGame, canvasHeight, canvasWidth],
  );

  return { player, bullets, tick, frameCount };
}

export default useBufferHellEngine;
