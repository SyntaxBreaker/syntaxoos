import { useEffect, useRef } from "react";
import { useBufferHellStore } from "../../store/bufferHellStore";
import useBufferHellEngine from "../../hooks/useBufferHellEngine";
import BufferHellHeader from "../BufferHellHeader";
import BufferHellCanvas from "../BufferHellCanvas";
import BufferHellMenu from "../BufferHellMenu";
import BufferHellGameOver from "../BufferHellGameOver";

const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 500;

function BufferHell() {
  const status = useBufferHellStore((state) => state.status);
  const score = useBufferHellStore((state) => state.score);
  const highScore = useBufferHellStore((state) => state.highScore);

  const { bullets, player, tick } = useBufferHellEngine({
    canvasHeight: CANVAS_HEIGHT,
    canvasWidth: CANVAS_WIDTH,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keys = useRef<Record<string, boolean>>({});

  useEffect(() => {
    if (status === "GAME_OVER") keys.current = {};
    if (status !== "PLAYING") return;

    const context = canvasRef.current?.getContext("2d");
    let frameId: number;

    const render = () => {
      tick(keys.current);

      if (context) {
        context.fillStyle = "#0F172A";
        context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

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
        bullets.current.forEach((bullet) => {
          context.beginPath();
          context.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
          context.fill();
        });
      }
      frameId = requestAnimationFrame(render);
    };

    const handleKey = (event: KeyboardEvent) =>
      (keys.current[event.key] = event.type === "keydown");
    window.addEventListener("keydown", handleKey);
    window.addEventListener("keyup", handleKey);

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("keyup", handleKey);
    };
  }, [status, tick]);

  return (
    <article className="flex flex-col bg-slate-900 border border-slate-700 rounded-lg w-[500px] overflow-hidden p-2">
      <BufferHellHeader score={score} highScore={highScore} />
      <div className="relative">
        <BufferHellCanvas
          canvasRef={canvasRef}
          canvasHeight={CANVAS_HEIGHT}
          canvasWidth={CANVAS_WIDTH}
        />
        {status === "MENU" && <BufferHellMenu />}
        {status == "GAME_OVER" && <BufferHellGameOver score={score} />}
      </div>
    </article>
  );
}

export default BufferHell;
