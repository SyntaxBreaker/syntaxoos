import { useSettingsStore } from "../../store/settingsStore";
import AccountSettings from "../AccountSettings";
import AppearanceSettings from "../AppearanceSettings";
import SettingsContent from "../SettingsContent";
import SettingsTabs from "../SettingsTabs";

const SETTINGS_TABS = [
  {
    id: 0,
    name: "Appearance",
    component: <AppearanceSettings />,
  },
  {
    id: 1,
    name: "Account",
    component: <AccountSettings />,
  },
];

function Settings() {
  const currentTab = useSettingsStore((state) => state.currentTab);

  const activeComponent = SETTINGS_TABS.find(
    (tab) => tab.name === currentTab,
  )?.component;

  return (
    <div className="flex flex-row gap-2 h-full relative">
      <SettingsTabs tabs={SETTINGS_TABS} />
      <SettingsContent activeComponent={activeComponent} />
    </div>
  );
}

export default Settings;
