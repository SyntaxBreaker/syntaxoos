import { useEffect, useRef } from "react";
import { useBufferHellStore } from "../../store/bufferHellStore";
import useBufferHellEngine from "../../hooks/useBufferHellEngine";
import BufferHellHeader from "../BufferHellHeader";
import BufferHellCanvas from "../BufferHellCanvas";
import BufferHellMenu from "../BufferHellMenu";
import BufferHellGameOver from "../BufferHellGameOver";
import { BUFFER_HELL_CONFIG } from "../../constants";

function BufferHell() {
  const status = useBufferHellStore((state) => state.status);
  const score = useBufferHellStore((state) => state.score);

  const { enemies, player, tick, bullets } = useBufferHellEngine({
    canvasHeight: BUFFER_HELL_CONFIG.CANVAS.HEIGHT,
    canvasWidth: BUFFER_HELL_CONFIG.CANVAS.WIDTH,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keys = useRef<Record<string, boolean>>({});

  useEffect(() => {
    if (status !== "PLAYING") return;

    const context = canvasRef.current?.getContext("2d");
    let frameId: number;

    const render = () => {
      tick(keys.current);

      if (context) {
        context.fillStyle = "#0F172A";
        context.fillRect(
          0,
          0,
          BUFFER_HELL_CONFIG.CANVAS.WIDTH,
          BUFFER_HELL_CONFIG.CANVAS.HEIGHT,
        );

        context.fillStyle = "#38BDF8";
        context.beginPath();
        context.arc(
          player.current.x,
          player.current.y,
          player.current.radius,
          0,
          Math.PI * 2,
        );
        context.fill();

        context.fillStyle = "#FB7185";
        enemies.current.forEach((enemy) => {
          context.beginPath();
          context.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
          context.fill();
        });

        context.fillStyle = "#38BDF8";
        bullets.current.forEach((bullet) => {
          context.beginPath();
          context.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
          context.fill();
        });
      }
      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [status, tick]);

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
    <article className="flex flex-col bg-slate-900 border border-slate-700 rounded-lg w-[500px] overflow-hidden p-2">
      <BufferHellHeader score={score} />
      <div className="relative">
        <BufferHellCanvas
          canvasRef={canvasRef}
          canvasHeight={BUFFER_HELL_CONFIG.CANVAS.HEIGHT}
          canvasWidth={BUFFER_HELL_CONFIG.CANVAS.WIDTH}
        />
        {status === "MENU" && <BufferHellMenu />}
        {status == "GAME_OVER" && <BufferHellGameOver score={score} />}
      </div>
    </article>
  );
}

export default BufferHell;
