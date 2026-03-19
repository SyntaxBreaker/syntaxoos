import { useEffect, useRef } from "react";
import { useBufferHellStore } from "../../store/bufferHellStore";
import useBufferHellEngine from "../../hooks/useBufferHellEngine";
import BufferHellHeader from "../BufferHellHeader";
import BufferHellCanvas from "../BufferHellCanvas";
import BufferHellMenu from "../BufferHellMenu";
import BufferHellGameOver from "../BufferHellGameOver";
import { BUFFER_HELL_CONFIG, BUFFER_HELL_HEROES } from "../../constants";
import { clearCanvas, renderSprite } from "../../utils/bufferHell/draw";
import useImageLoader from "../../hooks/useImageLoader";
import enemyImageSource from "../../assets/bufferHell/enemy.png";
import bulletImageSource from "../../assets/bufferHell/bullet.png";
import BufferHellHeroSelection from "../BufferHellHeroSelection";

function BufferHell() {
  const gameStatus = useBufferHellStore((state) => state.gameStatus);
  const score = useBufferHellStore((state) => state.score);
  const selectedHero = useBufferHellStore((state) => state.hero);

  const hero = BUFFER_HELL_HEROES.find(
    (hero) => hero.name === selectedHero.name,
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keys = useRef<Record<string, boolean>>({});
  const playerSprite = useImageLoader({
    imageUrl: hero ? hero.sprite : BUFFER_HELL_HEROES[0].sprite,
  });
  const enemySprite = useImageLoader({ imageUrl: enemyImageSource });
  const bulletSprite = useImageLoader({ imageUrl: bulletImageSource });

  const { enemies, player, tick, bullets } = useBufferHellEngine({
    canvasHeight: BUFFER_HELL_CONFIG.canvas.height,
    canvasWidth: BUFFER_HELL_CONFIG.canvas.width,
  });

  useEffect(() => {
    if (gameStatus !== "playing") return;

    const context = canvasRef.current?.getContext("2d");
    let frameId: number;

    const render = () => {
      tick(keys);

      if (context) {
        clearCanvas({
          context: context,
          width: BUFFER_HELL_CONFIG.canvas.width,
          height: BUFFER_HELL_CONFIG.canvas.height,
          color: "#0F172A",
        });

        renderSprite({
          context,
          fallbackColor: "38BDF8",
          radius: player.current.radius,
          scale: hero?.scale || 4,
          sprite: playerSprite,
          x: player.current.x,
          y: player.current.y,
        });

        enemies.current.forEach(({ radius, x, y }) => {
          renderSprite({
            context,
            fallbackColor: "#FB7185",
            radius,
            scale: 4,
            sprite: enemySprite,
            x,
            y,
          });
        });

        bullets.current.forEach(({ radius, x, y }) => {
          renderSprite({
            context,
            fallbackColor: "#38BDF8",
            radius,
            sprite: bulletSprite,
            x,
            y,
            scale: 4,
          });
        });
      }
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

  return (
    <article className="flex flex-col bg-gray-900 border border-gray-700 rounded-lg w-fit overflow-hidden p-2">
      <BufferHellHeader score={score} />
      <div className="relative">
        <BufferHellCanvas
          canvasRef={canvasRef}
          canvasHeight={BUFFER_HELL_CONFIG.canvas.height}
          canvasWidth={BUFFER_HELL_CONFIG.canvas.width}
        />
        {gameStatus === "menu" && <BufferHellMenu />}
        {gameStatus === "gameOver" && <BufferHellGameOver score={score} />}
        {gameStatus === "heroSelection" && <BufferHellHeroSelection />}
      </div>
    </article>
  );
}

export default BufferHell;
