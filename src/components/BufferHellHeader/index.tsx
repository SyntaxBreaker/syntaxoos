import { useBufferHellStore } from "../../store/bufferHellStore";

interface BufferHellHeaderProps {
  score: number;
}

function BufferHellHeader({ score }: BufferHellHeaderProps) {
  const highScore = useBufferHellStore((state) => state.highScore);
  const playerHP = useBufferHellStore((state) => state.playerHP);
  const playerLevel = useBufferHellStore((state) => state.playerLevel);

  return (
    <header className="p-2 bg-gray-800 flex justify-between rounded-lg text-xs text-gray-200 font-mono">
      <span>
        PLAYER HP: {playerHP} | Level: {playerLevel}
      </span>
      <span>
        SCORE: {score} | High Score: {highScore}
      </span>
    </header>
  );
}

export default BufferHellHeader;
