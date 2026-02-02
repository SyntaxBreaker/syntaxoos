import { useSettingsStore } from "../../store/settingsStore";

interface SettingssTabsProps {
  tabs: {
    id: number;
    name: string;
    component: React.ReactNode;
  }[];
}

function SettingsTabs({ tabs }: SettingssTabsProps) {
  const setCurrentTab = useSettingsStore((state) => state.setCurrentTab);

  return (
    <div className="flex flex-col border-r border-border-primary py-2 pr-16">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className="text-white text-sm cursor-pointer p-1 self-start capitalize"
          onClick={() => setCurrentTab(tab.name)}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
}

export default SettingsTabs;
