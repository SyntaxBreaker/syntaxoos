import type { SettingsTabItem } from "../../types";
import SettingsTab from "../SettingsTab";

interface SettingssTabsProps {
  tabs: SettingsTabItem[];
}

function SettingsTabs({ tabs }: SettingssTabsProps) {
  return (
    <div className="flex flex-col border-r border-border-primary py-2 pr-16">
      {tabs.map((tab) => (
        <SettingsTab tab={tab} key={tab.id} />
      ))}
    </div>
  );
}

export default SettingsTabs;
