import { WALLPAPERS } from "../../constants";
import { useSettingsStore } from "../../store/settingsStore";

function SettingsWallpapers() {
  const currentWallpaper = useSettingsStore((state) => state.currentWallpaper);
  const setWallpaper = useSettingsStore((state) => state.setWallpaper);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-gray-200 text-xs font-extrabold">Wallpaper</h3>
      <div className="flex flex-row gap-2 flex-wrap">
        {WALLPAPERS.map((wallpaper) => (
          <img
            key={wallpaper.id}
            src={wallpaper.src}
            className={`h-32 w-32 cursor-pointer border-2 ${currentWallpaper === wallpaper.src ? "border-gray-500" : "border-transparent"}`}
            onClick={() => setWallpaper(wallpaper.src)}
          />
        ))}
      </div>
    </div>
  );
}

export default SettingsWallpapers;
