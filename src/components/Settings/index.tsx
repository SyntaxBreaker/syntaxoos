import { useSettingsStore } from "../../store/settingsStore";
import AccountsSettings from "../AccountsSettings";
import AppearanceSettings from "../AppearanceSettings";
import GeneralSettings from "../GeneralSettings";

export const SETTINGS_TABS = [
  {
    id: 0,
    name: "General",
    component: <GeneralSettings />,
  },
  {
    id: 1,
    name: "Appearance",
    component: <AppearanceSettings />,
  },
  {
    id: 2,
    name: "Accounts",
    component: <AccountsSettings />,
  },
];

function Settings() {
  const currentTab = useSettingsStore((state) => state.currentTab);
  const setCurrentTab = useSettingsStore((state) => state.setCurrentTab);

  const activeComponent = SETTINGS_TABS.find(
    (tab) => tab.name === currentTab
  )?.component;

  return (
    <div className="flex flex-row gap-2 h-full relative">
      <div className="flex flex-col border-r border-border-primary py-2 pr-16">
        {SETTINGS_TABS.map((settingsTab) => (
          <button
            key={settingsTab.id}
            className="text-white text-sm cursor-pointer p-1 self-start capitalize"
            onClick={() => setCurrentTab(settingsTab.name)}
          >
            {settingsTab.name}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4 py-2">{activeComponent}</div>
    </div>
  );
}

export default Settings;
