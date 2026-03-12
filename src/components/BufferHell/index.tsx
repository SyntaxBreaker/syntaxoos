import { useEffect, useRef } from "react";
import { useBufferHellStore } from "../../store/bufferHellStore";
import useBufferHellEngine from "../../hooks/useBufferHellEngine";
import BufferHellHeader from "../BufferHellHeader";
import BufferHellCanvas from "../BufferHellCanvas";
import BufferHellMenu from "../BufferHellMenu";
import BufferHellGameOver from "../BufferHellGameOver";
import { BUFFER_HELL_CONFIG } from "../../constants";
import { clearCanvas, drawCircle } from "../../utils/bufferHell/draw";

function BufferHell() {
  const status = useBufferHellStore((state) => state.status);
  const score = useBufferHellStore((state) => state.score);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keys = useRef<Record<string, boolean>>({});

  const { enemies, player, tick, bullets } = useBufferHellEngine({
    canvasHeight: BUFFER_HELL_CONFIG.CANVAS.HEIGHT,
    canvasWidth: BUFFER_HELL_CONFIG.CANVAS.WIDTH,
  });

  useEffect(() => {
    if (status !== "PLAYING") return;

    const context = canvasRef.current?.getContext("2d");
    let frameId: number;

    const render = () => {
      tick(keys);

      if (context) {
        clearCanvas({
          context: context,
          width: BUFFER_HELL_CONFIG.CANVAS.WIDTH,
          height: BUFFER_HELL_CONFIG.CANVAS.HEIGHT,
          color: "#0F172A",
        });

        drawCircle({ context: context, ...player.current, color: "#38BDF8" });

        enemies.current.forEach((enemy) => {
          drawCircle({ context: context, ...enemy, color: "#FB7185" });
        });

        bullets.current.forEach((bullet) => {
          drawCircle({ context: context, ...bullet, color: "#38BDF8" });
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
    <article className="flex flex-col bg-slate-900 border border-slate-700 rounded-lg w-fit overflow-hidden p-2">
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
