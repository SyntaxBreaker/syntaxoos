interface BufferHellHeaderProps {
  score: number;
  highScore: number;
}

function BufferHellHeader({ score, highScore }: BufferHellHeaderProps) {
  return (
    <header className="p-2 bg-slate-800 flex justify-between text-xs text-gray-200 font-mono">
      <span>
        SCORE: {score} | High Score: {highScore}
      </span>
    </header>
  );
}

export default BufferHellHeader;
