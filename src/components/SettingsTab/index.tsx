import { useSettingsStore } from "../../store/settingsStore";
import type { SettingsTabItem } from "../../types";

interface SettingsTabProps {
  tab: SettingsTabItem;
}

function SettingsTab({ tab }: SettingsTabProps) {
  const setCurrentTab = useSettingsStore((state) => state.setCurrentTab);

  return (
    <button
      className="text-white text-sm cursor-pointer p-1 self-start capitalize"
      onClick={() => setCurrentTab(tab.name)}
    >
      {tab.name}
    </button>
  );
}

export default SettingsTab;
