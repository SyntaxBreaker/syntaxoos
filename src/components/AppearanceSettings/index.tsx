import SettingsBackgroundSize from "../SettingsBackgroundSize";
import SettingsWallpapers from "../SettingsWallpapers";

function AppearanceSettings() {
  return (
    <div className="flex flex-col gap-4">
      <SettingsWallpapers />
      <SettingsBackgroundSize />
    </div>
  );
}

export default AppearanceSettings;
