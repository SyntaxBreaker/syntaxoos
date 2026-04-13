import { useEffect, useRef } from "react";
import { useBufferHellStore } from "../../store/bufferHellStore";
import useBufferHellEngine from "../../hooks/useBufferHellEngine";
import BufferHellHeader from "../BufferHellHeader";
import BufferHellCanvas from "../BufferHellCanvas";
import BufferHellMenu from "../BufferHellMenu";
import BufferHellGameOver from "../BufferHellGameOver";
import { BUFFER_HELL_HEROES } from "../../constants";
import {
  clearCanvas,
  drawExperienceGem,
  renderSprite,
} from "../../utils/bufferHell/draw";
import useImageLoader from "../../hooks/useImageLoader";
import enemyImageSource from "../../assets/bufferHell/enemy.png";
import bulletImageSource from "../../assets/bufferHell/bullet.png";
import BufferHellHeroSelection from "../BufferHellHeroSelection";
import BufferHellPauseMenu from "../BufferHellPauseMenu";
import BufferHellLevelUp from "../BufferHellLevelUp";
import type { BufferHellExperienceGem } from "../../types";

function BufferHell() {
  const gameStatus = useBufferHellStore((state) => state.gameStatus);
  const score = useBufferHellStore((state) => state.score);
  const selectedHeroId = useBufferHellStore((state) => state.selectedHeroId);
  const setGameStatus = useBufferHellStore((state) => state.setGameStatus);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keysRef = useRef<Record<string, boolean>>({});
  const dimensionsRef = useRef({ width: 900, height: 500 });

  const hero = BUFFER_HELL_HEROES.find((hero) => hero.id === selectedHeroId);

  const playerSprite = useImageLoader({
    imageUrl: hero ? hero.sprite : BUFFER_HELL_HEROES[0].sprite,
  });
  const enemySprite = useImageLoader({ imageUrl: enemyImageSource });
  const bulletSprite = useImageLoader({ imageUrl: bulletImageSource });

  const { enemiesRef, playerRef, tick, bulletsRef, gemsRef } =
    useBufferHellEngine({
      dimensionsRef: dimensionsRef,
    });

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const { height, width } = entries[0].contentRect;
      dimensionsRef.current = { height, width };
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = dimensionsRef.current.width;
      canvasRef.current.height = dimensionsRef.current.height;
    }
  }, []);

  useEffect(() => {
    if (gameStatus === "playing") return;

    const context = canvasRef.current?.getContext("2d");
    if (context && canvasRef.current) {
      clearCanvas({
        context,
        width: dimensionsRef.current.width,
        height: dimensionsRef.current.height,
        color: "#0F172A",
      });
    }
  }, [gameStatus]);

  useEffect(() => {
    if (gameStatus !== "playing") return;

    const context = canvasRef.current?.getContext("2d");
    if (!context) return;

    let frameId: number;

    const render = () => {
      tick(keysRef);

      clearCanvas({
        context: context,
        width: dimensionsRef.current.width,
        height: dimensionsRef.current.height,
        color: "#0F172A",
      });

      renderSprite({
        context,
        fallbackColor: "38BDF8",
        radius: playerRef.current.radius,
        sprite: playerSprite,
        x: playerRef.current.x,
        y: playerRef.current.y,
        scale: 8,
      });

      enemiesRef.current.forEach(({ radius, x, y }) => {
        renderSprite({
          context,
          fallbackColor: "#FB7185",
          radius,
          sprite: enemySprite,
          x,
          y,
        });
      });

      bulletsRef.current.forEach(({ radius, x, y }) => {
        renderSprite({
          context,
          fallbackColor: "#38BDF8",
          radius,
          sprite: bulletSprite,
          x,
          y,
        });
      });

      gemsRef.current.forEach((gem: BufferHellExperienceGem) => {
        drawExperienceGem({ context, gem });
      });

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [gameStatus, tick]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const isPressed = event.type === "keydown";

      keysRef.current[key] = isPressed;

      const gameKeys = ["w", "a", "s", "d", "shift", " "];
      if (gameKeys.includes(key)) {
        event.preventDefault();
      }

      if (isPressed && key === "escape") setGameStatus("pause");
    };

    window.addEventListener("keydown", handleKey);
    window.addEventListener("keyup", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("keyup", handleKey);
      keysRef.current = {};
    };
  }, []);

  return (
    <article className="flex flex-col bg-gray-900 border border-gray-700 rounded-lg w-full h-full overflow-hidden p-2">
      <div
        className="relative flex-grow min-h-0 w-full h-full overflow-hidden"
        ref={containerRef}
      >
        {gameStatus === "playing" && <BufferHellHeader score={score} />}
        <BufferHellCanvas
          canvasRef={canvasRef}
          canvasHeight={dimensionsRef.current.height}
          canvasWidth={dimensionsRef.current.width}
        />
        {gameStatus === "menu" && <BufferHellMenu />}
        {gameStatus === "gameOver" && <BufferHellGameOver score={score} />}
        {gameStatus === "heroSelection" && <BufferHellHeroSelection />}
        {gameStatus === "pause" && <BufferHellPauseMenu />}
        {gameStatus === "levelUp" && <BufferHellLevelUp />}
      </div>
    </article>
  );
}

export default BufferHell;
