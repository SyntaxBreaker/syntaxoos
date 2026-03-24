import { useCallback, useEffect, useRef } from "react";
import { useBufferHellStore } from "../store/bufferHellStore";
import { BUFFER_HELL_CONFIG } from "../constants";
import type { BufferHellBullet, BufferHellEnemy } from "../types";
import { handlePlayerMovement } from "../utils/bufferHell/movement";
import { createBullets } from "../utils/bufferHell/combat";
import { createEnemy, getEnemySpawnRate } from "../utils/bufferHell/spawner";
import { checkCircleCollision } from "../utils/bufferHell/collision";
import { getWeaponLevel } from "../utils/bufferHell/weapon";
import { cleanUpEntities } from "../utils/bufferHell/physics";

interface UseBufferHellEngineProps {
  canvasHeight: number;
  canvasWidth: number;
}

function useBufferHellEngine({
  canvasHeight,
  canvasWidth,
}: UseBufferHellEngineProps) {
  const score = useBufferHellStore((state) => state.score);
  const gameStatus = useBufferHellStore((state) => state.gameStatus);
  const addScore = useBufferHellStore((state) => state.addScore);
  const setGameStatus = useBufferHellStore((state) => state.setGameStatus);

  const player = useRef({
    x: canvasWidth / 2,
    y: canvasHeight - BUFFER_HELL_CONFIG.player.startYOffset,
    radius: BUFFER_HELL_CONFIG.player.radius,
  });
  const enemies = useRef<BufferHellEnemy[]>([]);
  const frameCount = useRef(0);
  const bullets = useRef<BufferHellBullet[]>([]);
  const lastFireFrame = useRef(0);
  const weaponLevel = useRef(1);

  useEffect(() => {
    if (gameStatus === "gameOver") {
      enemies.current = [];
      bullets.current = [];

      player.current = {
        x: canvasWidth / 2,
        y: canvasHeight - BUFFER_HELL_CONFIG.player.startYOffset,
        radius: BUFFER_HELL_CONFIG.player.radius,
      };

      frameCount.current = 0;
      lastFireFrame.current = 0;
      weaponLevel.current = 1;
    }
  }, [gameStatus, canvasHeight, canvasWidth]);

  const tick = useCallback(
    (keys: React.RefObject<Record<string, boolean>>) => {
      if (gameStatus !== "playing" || !keys) return;

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
          BUFFER_HELL_CONFIG.bullet.fireRate
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
          setGameStatus("gameOver");
        }
      });

      bullets.current.forEach((bullet) => {
        bullet.y -= BUFFER_HELL_CONFIG.bullet.speed;
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

      cleanUpEntities({
        entities: enemies,
        height: canvasHeight,
        width: canvasWidth,
        margin: 50,
      });

      cleanUpEntities({
        entities: bullets,
        height: canvasHeight,
        width: canvasWidth,
        margin: 50,
      });
    },
    [gameStatus, addScore, setGameStatus, canvasHeight, canvasWidth, score],
  );

  return { player, enemies, tick, bullets };
}

export default useBufferHellEngine;
