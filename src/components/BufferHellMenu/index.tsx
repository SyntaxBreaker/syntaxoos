import { useBufferHellStore } from "../../store/bufferHellStore";

function BufferHellMenu() {
  const startGame = useBufferHellStore((state) => state.startGame);

  return (
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
  );
}

export default BufferHellMenu;
