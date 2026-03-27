import { BUFFER_HELL_HEROES } from "../../constants";
import { useBufferHellStore } from "../../store/bufferHellStore";
import type { BufferHellHero } from "../../types";

function BufferHellHeroSelection() {
  const setGameStatus = useBufferHellStore((state) => state.setGameStatus);
  const setHero = useBufferHellStore((state) => state.setHero);

  const handleSelect = ({ hero }: { hero: BufferHellHero }) => {
    setHero(hero);
    setGameStatus("menu");
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
      <h2 className="text-gray-200 text-3xl font-bold font-mono">
        Select Your Hero
      </h2>
      <div className="flex flex-row gap-4">
        {BUFFER_HELL_HEROES.map((hero) => (
          <button
            key={hero.id}
            className="flex flex-col items-center gap-4 p-4 bg-gray-800 border-2 border-transparent hover:border-gray-400 rounded-md w-2xs"
            onClick={() => handleSelect({ hero: hero })}
          >
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-bold text-gray-200">{hero.name}</h3>
              <p className="text-sm text-gray-400 ">{hero.description}</p>
            </div>
            <img
              src={hero.sprite}
              alt={hero.name}
              className="h-24 w-24 text-gray-200 font-mono"
            />
            <div className="flex flex-col gap-1 text-sm font-mono text-gray-200">
              <span>HP: {hero.baseHealth}</span>
              <span>SPEED: {hero.baseSpeed}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default BufferHellHeroSelection;
