import { useCallback, useEffect, useRef } from "react";
import { useBufferHellStore } from "../store/bufferHellStore";
import { BUFFER_HELL_CONFIG } from "../constants";
import type { BufferHellBullet, BufferHellEnemy } from "../types";
import { handlePlayerMovement } from "../utils/bufferHell/movement";
import { createBullets } from "../utils/bufferHell/combat";
import { createEnemy, getEnemySpawnRate } from "../utils/bufferHell/spawner";
import { checkCircleCollision } from "../utils/bufferHell/collision";
import { getWeaponLevel } from "../utils/bufferHell/weapon";

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

      weaponLevel.current = getWeaponLevel({ score: score });

      if (
        keys.current[" "] &&
        frameCount.current - lastFireFrame.current >=
          BUFFER_HELL_CONFIG.BULLET.FIRE_RATE
      ) {
        const newBullets = createBullets({
          playerX: player.current.x,
          playerY: player.current.y,
          playerRadius: player.current.radius,
          weaponLevel: weaponLevel,
        });

        bullets.current.push(...newBullets);

        lastFireFrame.current = frameCount.current;
      }

      const enemySpawnRate = getEnemySpawnRate({ score: score });

      if (frameCount.current % enemySpawnRate === 0) {
        const newEnemy = createEnemy({
          canvasWidth: canvasWidth,
          frameCount: frameCount,
        });
        enemies.current.push(newEnemy);
        addScore(1);
      }

      enemies.current.forEach((enemy) => {
        enemy.x += enemy.velocityX;
        enemy.y += enemy.velocityY;

        if (checkCircleCollision({ circleA: enemy, circleB: player.current })) {
          endGame();
        }
      });

      bullets.current.forEach((bullet) => {
        bullet.y -= BUFFER_HELL_CONFIG.BULLET.SPEED;
      });

      bullets.current.forEach((bullet) => {
        enemies.current.forEach((enemy) => {
          if (checkCircleCollision({ circleA: bullet, circleB: enemy })) {
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
