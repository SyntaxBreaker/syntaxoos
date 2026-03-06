import { useCallback, useEffect, useRef } from "react";
import { useBufferHellStore } from "../store/bufferHellStore";
import { BUFFER_HELL_CONFIG } from "../constants";

interface UseBufferHellEngineProps {
  canvasHeight: number;
  canvasWidth: number;
}

interface EnemyState {
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
  const score = useBufferHellStore((state) => state.score);
  const status = useBufferHellStore((state) => state.status);
  const addScore = useBufferHellStore((state) => state.addScore);
  const endGame = useBufferHellStore((state) => state.endGame);

  const player = useRef({
    x: canvasWidth / 2,
    y: canvasHeight - BUFFER_HELL_CONFIG.PLAYER.START_Y_OFFSET,
    radius: BUFFER_HELL_CONFIG.PLAYER.RADIUS,
  });
  const enemies = useRef<EnemyState[]>([]);
  const frameCount = useRef(0);

  useEffect(() => {
    if (status === "PLAYING") {
      enemies.current = [];

      player.current = {
        x: canvasWidth / 2,
        y: canvasHeight - BUFFER_HELL_CONFIG.PLAYER.START_Y_OFFSET,
        radius: BUFFER_HELL_CONFIG.PLAYER.RADIUS,
      };

      frameCount.current = 0;
    }
  }, [status, canvasHeight, canvasWidth]);

  const tick = useCallback(
    (keys: Record<string, boolean>) => {
      if (status !== "PLAYING") return;

      frameCount.current++;

      const playerSpeed = keys["Shift"]
        ? BUFFER_HELL_CONFIG.PLAYER.SLOW_SPEED
        : BUFFER_HELL_CONFIG.PLAYER.NORMAL_SPEED;
      if (
        keys["ArrowLeft"] &&
        player.current.x > BUFFER_HELL_CONFIG.PLAYER.MARGIN
      )
        player.current.x -= playerSpeed;
      if (
        keys["ArrowRight"] &&
        player.current.x < canvasWidth - BUFFER_HELL_CONFIG.PLAYER.MARGIN
      )
        player.current.x += playerSpeed;
      if (
        keys["ArrowUp"] &&
        player.current.y > BUFFER_HELL_CONFIG.PLAYER.MARGIN
      )
        player.current.y -= playerSpeed;
      if (
        keys["ArrowDown"] &&
        player.current.y < canvasHeight - BUFFER_HELL_CONFIG.PLAYER.MARGIN
      )
        player.current.y += playerSpeed;

      const enemySpawnRate = Math.max(
        BUFFER_HELL_CONFIG.ENEMY.MIN_SPAWN_RATE,
        BUFFER_HELL_CONFIG.ENEMY.INITIAL_SPAWN_RATE -
          Math.floor(score / BUFFER_HELL_CONFIG.ENEMY.SPAWN_ACCELERATION),
      );

      if (frameCount.current % enemySpawnRate === 0) {
        const angle =
          frameCount.current * BUFFER_HELL_CONFIG.ENEMY.ANGLE_INCREMENT;
        enemies.current.push({
          x: canvasWidth / 2,
          y: BUFFER_HELL_CONFIG.ENEMY.SPAWN_Y,
          velocityX: Math.cos(angle) * BUFFER_HELL_CONFIG.ENEMY.SPEED,
          velocityY: Math.sin(angle) * BUFFER_HELL_CONFIG.ENEMY.SPEED,
          radius: BUFFER_HELL_CONFIG.ENEMY.RADIUS,
        });
        addScore(1);
      }

      enemies.current.forEach((enemy) => {
        enemy.x += enemy.velocityX;
        enemy.y += enemy.velocityY;

        const deltaX = enemy.x - player.current.x;
        const deltaY = enemy.y - player.current.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < enemy.radius + player.current.radius) {
          endGame();
        }
      });

      enemies.current = enemies.current.filter(
        (enemy) =>
          enemy.x > -50 &&
          enemy.x < canvasWidth &&
          enemy.y > -50 &&
          enemy.y < canvasHeight,
      );
    },
    [status, addScore, endGame, canvasHeight, canvasWidth, score],
  );

  return { player, enemies, tick, frameCount };
}

export default useBufferHellEngine;
