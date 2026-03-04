import type { SettingsTabItem } from "../../types";
import SettingsTab from "../SettingsTab";

interface SettingssTabsProps {
  tabs: SettingsTabItem[];
}

function SettingsTabs({ tabs }: SettingssTabsProps) {
  return (
    <nav className="flex flex-col border-r border-border-primary py-2 pr-16">
      <ul>
        {tabs.map((tab) => (
          <li key={tab.id}>
            <SettingsTab tab={tab} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SettingsTabs;
