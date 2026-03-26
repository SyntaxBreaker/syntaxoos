import { useBufferHellStore } from "../../store/bufferHellStore";

function BufferHellPauseMenu() {
  const setGameStatus = useBufferHellStore((state) => state.setGameStatus);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
      <h2 className="text-gray-200 text-3xl font-bold font-mono">PAUSE MENU</h2>
      <button
        className="bg-gray-800 text-gray-200 w-3xs p-4 py-2 rounded border-2 border-transparent hover:cursor-pointer mt-2 hover:border-gray-400"
        onClick={() => setGameStatus("playing")}
      >
        CONTINUE
      </button>
      <button
        className="bg-gray-800 text-gray-200 w-3xs p-4 py-2 rounded border-2 border-transparent hover:cursor-pointer mt-2 hover:border-gray-400"
        onClick={() => setGameStatus("menu")}
      >
        EXIT TO MENU
      </button>
    </div>
  );
}

export default BufferHellPauseMenu;
