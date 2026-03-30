import { useEffect, useRef, useState } from "react";
import { useBufferHellStore } from "../../store/bufferHellStore";
import useBufferHellEngine from "../../hooks/useBufferHellEngine";
import BufferHellHeader from "../BufferHellHeader";
import BufferHellCanvas from "../BufferHellCanvas";
import BufferHellMenu from "../BufferHellMenu";
import BufferHellGameOver from "../BufferHellGameOver";
import { BUFFER_HELL_HEROES } from "../../constants";
import { clearCanvas, renderSprite } from "../../utils/bufferHell/draw";
import useImageLoader from "../../hooks/useImageLoader";
import enemyImageSource from "../../assets/bufferHell/enemy.png";
import bulletImageSource from "../../assets/bufferHell/bullet.png";
import BufferHellHeroSelection from "../BufferHellHeroSelection";
import BufferHellPauseMenu from "../BufferHellPauseMenu";

function BufferHell() {
  const [dimensions, setDimensions] = useState({ height: 500, width: 990 });
  const gameStatus = useBufferHellStore((state) => state.gameStatus);
  const score = useBufferHellStore((state) => state.score);
  const selectedHero = useBufferHellStore((state) => state.hero);
  const setGameStatus = useBufferHellStore((state) => state.setGameStatus);

  const hero = BUFFER_HELL_HEROES.find(
    (hero) => hero.name === selectedHero.name,
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keys = useRef<Record<string, boolean>>({});
  const playerSprite = useImageLoader({
    imageUrl: hero ? hero.sprite : BUFFER_HELL_HEROES[0].sprite,
  });
  const enemySprite = useImageLoader({ imageUrl: enemyImageSource });
  const bulletSprite = useImageLoader({ imageUrl: bulletImageSource });

  const { enemiesRef, playerRef, tick, bulletsRef } = useBufferHellEngine({
    canvasHeight: dimensions.height,
    canvasWidth: dimensions.width,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const { height, width } = entries[0].contentRect;
      setDimensions({ height, width });
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = dimensions.width;
      canvasRef.current.height = dimensions.height;
    }
  }, [dimensions]);

  useEffect(() => {
    if (gameStatus === "playing") return;

    const context = canvasRef.current?.getContext("2d");
    if (context && canvasRef.current) {
      clearCanvas({
        context,
        width: dimensions.width,
        height: dimensions.height,
        color: "#0F172A",
      });
    }
  }, [gameStatus, dimensions]);

  useEffect(() => {
    if (gameStatus !== "playing") return;

    const context = canvasRef.current?.getContext("2d");
    if (!context) return;

    let frameId: number;

    const render = () => {
      tick(keys);

      clearCanvas({
        context: context,
        width: dimensions.width,
        height: dimensions.height,
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
      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [gameStatus, tick]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const gameKeys = [" ", "w", "W", "a", "A", "s", "S", "d", "D", "Shift"];
      if (gameKeys.includes(event.key)) {
        event.preventDefault();
      }
      keys.current[event.key] = event.type === "keydown";
    };

    window.addEventListener("keydown", handleKey);
    window.addEventListener("keyup", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("keyup", handleKey);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setGameStatus("pause");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <article className="flex flex-col bg-gray-900 border border-gray-700 rounded-lg w-full h-full overflow-hidden p-2">
      <BufferHellHeader score={score} />
      <div
        className="relative flex-grow min-h-0 w-full h-full"
        ref={containerRef}
      >
        <BufferHellCanvas
          canvasRef={canvasRef}
          canvasHeight={dimensions.height}
          canvasWidth={dimensions.width}
        />
        {gameStatus === "menu" && <BufferHellMenu />}
        {gameStatus === "gameOver" && <BufferHellGameOver score={score} />}
        {gameStatus === "heroSelection" && <BufferHellHeroSelection />}
        {gameStatus === "pause" && <BufferHellPauseMenu />}
      </div>
    </article>
  );
}

export default BufferHell;
