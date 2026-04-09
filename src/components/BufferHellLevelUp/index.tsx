import { useMemo } from "react";
import { useBufferHellStore } from "../../store/bufferHellStore";
import type { BufferHellPromotion } from "../../types";

const PLAYER_UPGRADES = [
  { id: "agility", label: "💨 Agility", description: "+0.5 Movement Speed" },
  {
    id: "fireRate",
    label: "🔥 Rapid Fire",
    description: "-1 Frame Delay",
  },
  { id: "vitality", label: "🛡️ Vitality", description: "+20 HP" },
  {
    id: "pickupRadius",
    label: "🧲 Magnetism",
    description: "+10 Pickup Radius",
  },
] as const;

function BufferHellLevelUp() {
  const promotePlayer = useBufferHellStore((state) => state.promotePlayer);

  const getRandomUpgrades = useMemo(() => {
    return [...PLAYER_UPGRADES].sort(() => Math.random() - 0.5).slice(0, 2);
  }, []);
  const handlePlayerPromotion = (promotionType: BufferHellPromotion) => {
    promotePlayer(promotionType);
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
      <h2 className="text-gray-200 text-3xl font-bold font-mono">LEVEL UP!</h2>
      <div className="flex flex-row gap-4">
        {getRandomUpgrades.map((upgrade) => (
          <button
            key={upgrade.id}
            className="flex flex-col items-center gap-4 p-4 bg-gray-800 border-2 border-transparent hover:border-gray-400 rounded-md w-2xs"
            onClick={() => handlePlayerPromotion(upgrade.id)}
          >
            <h3 className="text-2xl font-bold text-gray-200">
              {upgrade.label}
            </h3>
            <p className="text-sm text-gray-400 ">{upgrade.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default BufferHellLevelUp;
