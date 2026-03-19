import { useBufferHellStore } from "../../store/bufferHellStore";

interface BufferHellGameOverProps {
  score: number;
}

function BufferHellGameOver({ score }: BufferHellGameOverProps) {
  const setGameStatus = useBufferHellStore((state) => state.setGameStatus);

  return (
    <div className="absolute inset-0 bg-red-800 flex flex-col items-center justify-center gap-2">
      <h2 className="text-gray-200 text-3xl font-bold">KERNEL PANIC</h2>
      <p className="text-gray-200">Final Score: {score}</p>
      <button
        className="bg-gray-200 text-red-800 px-4 py-2 rounded hover:cursor-pointer mt-2"
        onClick={() => setGameStatus("playing")}
      >
        RETRY
      </button>
    </div>
  );
}

export default BufferHellGameOver;
