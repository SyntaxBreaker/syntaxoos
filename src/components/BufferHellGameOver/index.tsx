import { useBufferHellStore } from "../../store/bufferHellStore";

interface BufferHellGameOverProps {
  score: number;
}

function BufferHellGameOver({ score }: BufferHellGameOverProps) {
  const resetGame = useBufferHellStore((state) => state.resetGame);

  return (
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
  );
}

export default BufferHellGameOver;
