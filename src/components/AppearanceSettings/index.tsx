import { WALLPAPERS } from "../../constants";
import { useSettingsStore } from "../../store/settingsStore";

function AppearanceSettings() {
  const setWallpaper = useSettingsStore((state) => state.setWallpaper);

  const handleWallpaperChange = (wallpaperSrc: string) => {
    setWallpaper(wallpaperSrc);
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-white text-xs font-extrabold">Wallpaper</h3>
      <div className="flex flex-row gap-4 flex-wrap">
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
  );
}

export default AppearanceSettings;
