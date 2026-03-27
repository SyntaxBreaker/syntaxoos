import { useBufferHellStore } from "../../store/bufferHellStore";

interface BufferHellHeaderProps {
  score: number;
}

function BufferHellHeader({ score }: BufferHellHeaderProps) {
  const playerHP = useBufferHellStore((state) => state.playerHP);
  const highScore = useBufferHellStore((state) => state.highScore);

  return (
    <header className="p-2 bg-gray-800 flex justify-between rounded-lg text-xs text-gray-200 font-mono">
      <div>PLAYER HP: {playerHP}</div>
      <span>
        SCORE: {score} | High Score: {highScore}
      </span>
    </header>
  );
}

export default BufferHellHeader;
