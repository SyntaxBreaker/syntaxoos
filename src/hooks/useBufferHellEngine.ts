import { useCallback, useEffect, useRef } from "react";
import { useBufferHellStore } from "../store/bufferHellStore";
import { BUFFER_HELL_CONFIG } from "../constants";
import type {
  BufferHellBullet,
  BufferHellEnemy,
  BufferHellExperienceGem,
} from "../types";
import {
  handlePlayerMovement,
  moveEnemiesTowardPlayer,
} from "../utils/bufferHell/movement";
import { createBullets } from "../utils/bufferHell/combat";
import { createEnemy, getEnemySpawnRate } from "../utils/bufferHell/spawner";
import { checkCircleCollision } from "../utils/bufferHell/collision";
import { getWeaponLevel } from "../utils/bufferHell/weapon";
import { cleanUpEntities, separateEntities } from "../utils/bufferHell/physics";

interface UseBufferHellEngineProps {
  dimensionsRef: React.RefObject<{ height: number; width: number }>;
}

const MAX_ENEMIES = 10;
const ENEMY_SPEED = BUFFER_HELL_CONFIG.enemy.speed;

function useBufferHellEngine({ dimensionsRef }: UseBufferHellEngineProps) {
  const score = useBufferHellStore((state) => state.score);
  const gameStatus = useBufferHellStore((state) => state.gameStatus);
  const addScore = useBufferHellStore((state) => state.addScore);
  const gainExperience = useBufferHellStore((state) => state.gainExperience);
  const setGameStatus = useBufferHellStore((state) => state.setGameStatus);
  const takeDamage = useBufferHellStore((state) => state.takeDamage);
  const playerPickupRadius = useBufferHellStore(
    (state) => state.playerPickupRadius,
  );
  const playerMovementSpeed = useBufferHellStore(
    (state) => state.playerMovementSpeed,
  );

  const { width, height } = dimensionsRef.current;

  const playerRef = useRef({
    x: width / 2,
    y: height - BUFFER_HELL_CONFIG.player.startYOffset,
    radius: BUFFER_HELL_CONFIG.player.radius,
    scale: BUFFER_HELL_CONFIG.player.scale,
  });
  const enemiesRef = useRef<BufferHellEnemy[]>([]);
  const frameCountRef = useRef(0);
  const bulletsRef = useRef<BufferHellBullet[]>([]);
  const lastFireFrameRef = useRef(0);
  const weaponLevelRef = useRef(1);
  const gemsRef = useRef<BufferHellExperienceGem[]>([]);

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

    const newEnemy = createEnemy({
      canvasHeight: height,
      canvasWidth: width,
    });

    enemiesRef.current.push(newEnemy);
  };

  const resetEntities = useCallback(() => {
    if (!dimensionsRef.current) return;
    const { height, width } = dimensionsRef.current;

    enemiesRef.current = [];
    bulletsRef.current = [];
    gemsRef.current = [];
    frameCountRef.current = 0;
    lastFireFrameRef.current = 0;
    weaponLevelRef.current = 1;

    playerRef.current.x = width / 2;
    playerRef.current.y = height - BUFFER_HELL_CONFIG.player.startYOffset;
  }, [dimensionsRef]);

  const pickUpExperienceGem = useCallback(
    (playerX: number, playerY: number) => {
      gemsRef.current = gemsRef.current.filter((gem) => {
        const deltaX = playerX - gem.x;
        const deltaY = playerY - gem.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < playerPickupRadius) {
          gem.isMovingToPlayer = true;
        }

        if (gem.isMovingToPlayer) {
          const speed = 10;
          gem.x += (deltaX / distance) * speed;
          gem.y += (deltaY / distance) * speed;
        }

        if (distance < 15) {
          addScore(10);
          gainExperience(gem.value);
          return false;
        }

        return true;
      });
    },
    [gainExperience, addScore, playerPickupRadius],
  );

  useEffect(() => {
    if (gameStatus === "gameOver" || frameCountRef.current === 0) {
      resetEntities();
    }
  }, [gameStatus, resetEntities]);

  const tick = useCallback(
    (keysRef: React.RefObject<Record<string, boolean>>) => {
      if (gameStatus !== "playing" || !keysRef) return;

      frameCountRef.current++;

      handlePlayerMovement({
        keysRef: keysRef,
        playerRef: playerRef,
        canvasWidth: width,
        canvasHeight: height,
        playerMovementSpeed: playerMovementSpeed,
      });

      weaponLevelRef.current = getWeaponLevel({ score: score });

      if (
        keysRef.current[" "] &&
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
        if (enemiesRef.current.length < MAX_ENEMIES) {
          spawnEnemy();
        }
      }

      separateEntities(enemiesRef.current);

      moveEnemiesTowardPlayer({
        enemies: enemiesRef.current,
        player: playerRef.current,
        speed: ENEMY_SPEED,
        onPlayerHit: () => {
          takeDamage(10);
          checkIfPlayerIsDead();
        },
      });

      bulletsRef.current.forEach((bullet) => {
        bullet.y -= BUFFER_HELL_CONFIG.bullet.speed;
      });

      bulletsRef.current.forEach((bullet) => {
        enemiesRef.current.forEach((enemy) => {
          if (checkCircleCollision({ circleA: bullet, circleB: enemy })) {
            const newGem: BufferHellExperienceGem = {
              id: crypto.randomUUID(),
              x: enemy.x,
              y: enemy.y,
              value: Math.floor(Math.random() * (50 - 10 + 1)) + 10,
              isMovingToPlayer: false,
            };

            enemy.x = -2000;
            bullet.y = -2000;

            gemsRef.current.push(newGem);
          }
        });
      });

      pickUpExperienceGem(playerRef.current.x, playerRef.current.y);

      cleanUpEntities({
        entities: enemiesRef,
        height: dimensionsRef.current.height,
        width: dimensionsRef.current.width,
        margin: 100,
      });

      cleanUpEntities({
        entities: bulletsRef,
        height: height,
        width: width,
        margin: 50,
      });
    },
    [gameStatus, takeDamage, dimensionsRef],
  );

  return { playerRef, enemiesRef, tick, bulletsRef, gemsRef };
}

export default useBufferHellEngine;
