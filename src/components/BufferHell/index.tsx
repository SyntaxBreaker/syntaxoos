import { useEffect, useRef } from "react";
import { useBufferHellStore } from "../../store/bufferHellStore";
import useBufferHellEngine from "../../hooks/useBufferHellEngine";

const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 500;

function BufferHell() {
  const status = useBufferHellStore((state) => state.status);
  const score = useBufferHellStore((state) => state.score);
  const highScore = useBufferHellStore((state) => state.highScore);
  const startGame = useBufferHellStore((state) => state.startGame);
  const resetGame = useBufferHellStore((state) => state.resetGame);

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
      <header className="p-2 bg-slate-800 flex justify-between text-xs text-gray-200 font-mono">
        <span>
          SCORE: {score} | High Score: {highScore}
        </span>
      </header>
      <div className="relative">
        <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
        {status === "MENU" && (
          <div className="absolute inset-0 bg-slate-400 flex flex-col items-center justify-center gap-2">
            <h2 className="text-slate-800 text-3xl font-bold font-mono">
              BUFFER HELL
            </h2>
            <button
              className="bg-slate-600 text-slate-200 px-8 py-4 rounded hover:cursor-pointer mt-2"
              onClick={startGame}
            >
              START
            </button>
          </div>
        )}
        {status == "GAME_OVER" && (
          <div className="absolute inset-0 bg-red-800 flex flex-col items-center justify-center gap-2">
            <h2 className="text-slate-200 text-3xl font-bold">KERNEL PANIC</h2>
            <p className="text-slate-200">Final Score: {score}</p>
            <button
              className="bg-slate-200 text-red-800 px-4 py-2 rounded hover:cursor-pointer mt-2"
              onClick={resetGame}
            >
              RETRY
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default BufferHell;
