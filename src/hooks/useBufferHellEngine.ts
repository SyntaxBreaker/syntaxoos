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

const MAX_ENEMIES = 30;

function useBufferHellEngine({
  canvasHeight,
  canvasWidth,
}: UseBufferHellEngineProps) {
  const score = useBufferHellStore((state) => state.score);
  const gameStatus = useBufferHellStore((state) => state.gameStatus);
  const addScore = useBufferHellStore((state) => state.addScore);
  const gainExperience = useBufferHellStore((state) => state.gainExperience);
  const setGameStatus = useBufferHellStore((state) => state.setGameStatus);
  const takeDamage = useBufferHellStore((state) => state.takeDamage);

  const playerRef = useRef({
    x: canvasWidth / 2,
    y: canvasHeight - BUFFER_HELL_CONFIG.player.startYOffset,
    radius: BUFFER_HELL_CONFIG.player.radius,
    scale: BUFFER_HELL_CONFIG.player.scale,
  });
  const enemiesRef = useRef<BufferHellEnemy[]>([]);
  const frameCountRef = useRef(0);
  const bulletsRef = useRef<BufferHellBullet[]>([]);
  const lastFireFrameRef = useRef(0);
  const weaponLevelRef = useRef(1);

  const checkIfPlayerIsDead = () => {
    const currentHP = useBufferHellStore.getState().playerHP;

    if (currentHP <= 0) {
      setGameStatus("gameOver");
      return true;
    }

    return false;
  };

  const spawnEnemy = () => {
    if (enemiesRef.current.length >= MAX_ENEMIES) return;

    const newEnemies = createEnemy({
      canvasWidth: canvasWidth,
      frameCount: frameCountRef,
    });
    enemiesRef.current.push(newEnemies);
  };

  useEffect(() => {
    if (gameStatus === "gameOver") {
      enemiesRef.current = [];
      bulletsRef.current = [];

      playerRef.current = {
        x: canvasWidth / 2,
        y: canvasHeight - BUFFER_HELL_CONFIG.player.startYOffset,
        radius: BUFFER_HELL_CONFIG.player.radius,
        scale: BUFFER_HELL_CONFIG.player.scale,
      };

      frameCountRef.current = 0;
      lastFireFrameRef.current = 0;
      weaponLevelRef.current = 1;
    }
  }, [gameStatus, canvasHeight, canvasWidth]);

  const tick = useCallback(
    (keys: React.RefObject<Record<string, boolean>>) => {
      if (gameStatus !== "playing" || !keys) return;

      frameCountRef.current++;

      handlePlayerMovement({
        keysRef: keys,
        playerRef: playerRef,
        canvasWidth: canvasWidth,
        canvasHeight: canvasHeight,
      });

      weaponLevelRef.current = getWeaponLevel({ score: score });

      if (
        keys.current[" "] &&
        frameCountRef.current - lastFireFrameRef.current >=
          BUFFER_HELL_CONFIG.bullet.fireRate
      ) {
        const newBullets = createBullets({
          playerX: playerRef.current.x,
          playerY: playerRef.current.y,
          playerRadius: playerRef.current.radius,
          weaponLevel: weaponLevelRef,
        });

        bulletsRef.current.push(...newBullets);

        lastFireFrameRef.current = frameCountRef.current;
      }

      const enemySpawnRate = getEnemySpawnRate({ score: score });

      if (frameCountRef.current % enemySpawnRate === 0) {
        spawnEnemy();
        addScore(1);
      }

      enemiesRef.current.forEach((enemy) => {
        enemy.x += enemy.velocityX;
        enemy.y += enemy.velocityY;

        if (
          checkCircleCollision({ circleA: enemy, circleB: playerRef.current })
        ) {
          takeDamage(enemy.damage);
          enemy.x = -2000;
          checkIfPlayerIsDead();
        }
      });

      bulletsRef.current.forEach((bullet) => {
        bullet.y -= BUFFER_HELL_CONFIG.bullet.speed;
      });

      bulletsRef.current.forEach((bullet) => {
        enemiesRef.current.forEach((enemy) => {
          if (checkCircleCollision({ circleA: bullet, circleB: enemy })) {
            bullet.y = -2000;
            enemy.x = -2000;
            gainExperience(10);
            addScore(10);
          }
        });
      });

      cleanUpEntities({
        entities: enemiesRef,
        height: canvasHeight,
        width: canvasWidth,
        margin: 50,
      });

      cleanUpEntities({
        entities: bulletsRef,
        height: canvasHeight,
        width: canvasWidth,
        margin: 50,
      });
    },
    [gameStatus, addScore, setGameStatus, canvasHeight, canvasWidth, score],
  );

  return { playerRef, enemiesRef, tick, bulletsRef };
}

export default useBufferHellEngine;
