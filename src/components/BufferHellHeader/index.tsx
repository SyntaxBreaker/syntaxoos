import { useBufferHellStore } from "../../store/bufferHellStore";

interface BufferHellHeaderProps {
  score: number;
}

function BufferHellHeader({ score }: BufferHellHeaderProps) {
  const highScore = useBufferHellStore((state) => state.highScore);
  const playerExperience = useBufferHellStore(
    (state) => state.playerExperience,
  );
  const playerHP = useBufferHellStore((state) => state.playerHP);
  const playerLevel = useBufferHellStore((state) => state.playerLevel);
  const experienceToNextLevel = useBufferHellStore(
    (state) => state.experienceToNextLevel,
  );

  const playerExperiencePercentage = Math.min(
    100,
    (playerExperience / experienceToNextLevel) * 100,
  );

  return (
    <header className="p-2 bg-gray-800 flex justify-between items-center rounded-lg text-xs text-gray-200 font-mono absolute top-0 w-full">
      <span>
        HP: {playerHP} | Experience: {playerExperience} | Level: {playerLevel}
      </span>
      <div className="w-3xs h-2 bg-gray-600 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-600"
          style={{ width: `${playerExperiencePercentage}%` }}
        />
      </div>
      <span>
        Score: {score} | High Score: {highScore}
      </span>
    </header>
  );
}

export default BufferHellHeader;
