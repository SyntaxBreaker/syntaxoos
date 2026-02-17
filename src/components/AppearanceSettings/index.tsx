import { useSettingsStore } from "../../store/settingsStore";
import SettingsWallpapers from "../SettingsWallpapers";

function AppearanceSettings() {
  const currentBackgroundSize = useSettingsStore(
    (state) => state.currentBackgroundSize,
  );
  const setBackgroundSize = useSettingsStore(
    (state) => state.setBackgroundSize,
  );

  const handleBackgroundSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setBackgroundSize(event.target.value);
  };

  return (
    <div className="flex flex-col gap-4">
      <SettingsWallpapers />
      <div className="flex flex-col gap-2">
        <label className="text-gray-200 text-xs font-extrabold">
          Background size
        </label>
        <select
          id="size"
          className="w-full p-2 bg-transparent border border-gray-600 text-xs rounded-sm text-gray-200"
          defaultValue={currentBackgroundSize}
          onChange={handleBackgroundSizeChange}
        >
          <option value="Auto">Auto</option>
          <option value="Cover">Cover</option>
          <option value="Full">Full</option>
        </select>
      </div>
    </div>
  );
}

export default AppearanceSettings;
