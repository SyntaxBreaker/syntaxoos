import { WALLPAPERS } from "../../constants";
import { useSettingsStore } from "../../store/settingsStore";

function AppearanceSettings() {
  const currentBackgroundSize = useSettingsStore(
    (state) => state.currentBackgroundSize
  );
  const setBackgroundSize = useSettingsStore(
    (state) => state.setBackgroundSize
  );
  const setWallpaper = useSettingsStore((state) => state.setWallpaper);

  const handleWallpaperChange = (wallpaperSrc: string) => {
    setWallpaper(wallpaperSrc);
  };

  const handleBackgroundSizeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBackgroundSize(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-white text-xs font-extrabold">Wallpaper</h3>
        <div className="flex flex-row gap-2 flex-wrap">
          {WALLPAPERS.map((wallpaper) => (
            <img
              key={wallpaper.id}
              src={wallpaper.src}
              className="h-32 w-32"
              onClick={() => handleWallpaperChange(wallpaper.src)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-white text-xs font-extrabold">
          Background size
        </label>
        <select
          id="size"
          className="w-full p-2 bg-neutral-secondary-medium border text-xs rounded-sm text-white"
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
