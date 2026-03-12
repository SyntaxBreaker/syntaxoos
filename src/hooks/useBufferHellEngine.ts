import { useCallback, useEffect, useRef } from "react";
import { useBufferHellStore } from "../store/bufferHellStore";
import { BUFFER_HELL_CONFIG } from "../constants";
import type { BufferHellBullet, BufferHellEnemy } from "../types";
import { handlePlayerMovement } from "../utils/bufferHell/movement";

interface UseBufferHellEngineProps {
  canvasHeight: number;
  canvasWidth: number;
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
  const enemies = useRef<BufferHellEnemy[]>([]);
  const frameCount = useRef(0);
  const bullets = useRef<BufferHellBullet[]>([]);
  const lastFireFrame = useRef(0);
  const weaponLevel = useRef(1);

  useEffect(() => {
    if (status === "PLAYING") {
      enemies.current = [];
      bullets.current = [];

      player.current = {
        x: canvasWidth / 2,
        y: canvasHeight - BUFFER_HELL_CONFIG.PLAYER.START_Y_OFFSET,
        radius: BUFFER_HELL_CONFIG.PLAYER.RADIUS,
      };

      frameCount.current = 0;
      lastFireFrame.current = 0;
      weaponLevel.current = 1;
    }
  }, [status, canvasHeight, canvasWidth]);

  const tick = useCallback(
    (keys: React.RefObject<Record<string, boolean>>) => {
      if (status !== "PLAYING" || !keys) return;

      frameCount.current++;

      handlePlayerMovement({
        keysRef: keys,
        playerRef: player,
        canvasWidth: canvasWidth,
        canvasHeight: canvasHeight,
      });

      if (score >= 500 && weaponLevel.current === 1) {
        weaponLevel.current = 2;
      }
      if (score >= 1000 && weaponLevel.current === 2) {
        weaponLevel.current = 3;
      }

      if (
        keys.current[" "] &&
        frameCount.current - lastFireFrame.current >=
          BUFFER_HELL_CONFIG.BULLET.FIRE_RATE
      ) {
        const { x, y, radius: playerRadius } = player.current;
        const bulletRadius = BUFFER_HELL_CONFIG.BULLET.RADIUS;

        bullets.current.push({
          x: x,
          y: y - playerRadius,
          radius: bulletRadius,
        });

        if (weaponLevel.current === 2) {
          bullets.current.push({
            x: x + 15,
            y: y - playerRadius + 5,
            radius: bulletRadius,
          });
        }

        if (weaponLevel.current > 2) {
          bullets.current.push({
            x: x - 15,
            y: y - playerRadius + 5,
            radius: bulletRadius,
          });
          bullets.current.push({
            x: x + 15,
            y: y - playerRadius + 5,
            radius: bulletRadius,
          });
        }

        lastFireFrame.current = frameCount.current;
      }

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

      bullets.current.forEach((bullet) => {
        bullet.y -= BUFFER_HELL_CONFIG.BULLET.SPEED;
      });

      bullets.current.forEach((bullet) => {
        enemies.current.forEach((enemy) => {
          const deltaX = bullet.x - enemy.x;
          const deltaY = bullet.y - enemy.y;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

          if (distance < bullet.radius + enemy.radius) {
            bullet.y = -100;
            enemy.x = -1000;
            addScore(10);
          }
        });
      });

      enemies.current = enemies.current.filter(
        (enemy) =>
          enemy.x > -50 &&
          enemy.x < canvasWidth &&
          enemy.y > -50 &&
          enemy.y < canvasHeight,
      );

      bullets.current = bullets.current.filter((bullet) => bullet.y > -20);
    },
    [status, addScore, endGame, canvasHeight, canvasWidth, score],
  );

  return { player, enemies, tick, bullets };
}

export default useBufferHellEngine;
