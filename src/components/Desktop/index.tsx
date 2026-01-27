import { type MouseEvent } from "react";
import Panel from "../Panel";
import { useContextMenuStore } from "../../store/contextMenuStore";
import DesktopIconList from "../DesktopIconList";
import Window from "../Window";
import { useWindowsStore } from "../../store/windowsStore";
import DesktopContextMenu from "../DesktopContextMenu";
import { APPS } from "../../apps";
import { useSettingsStore } from "../../store/settingsStore";

function Desktop() {
  const openContextMenu = useContextMenuStore((state) => state.openContextMenu);
  const activeWindows = useWindowsStore((state) => state.activeWindows);
  const currentWallpaper = useSettingsStore((state) => state.currentWallpaper);
  const backgroundSize = useSettingsStore(
    (state) => state.currentBackgroundSize,
  );

  const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    openContextMenu("desktop", event.pageX, event.pageY);
  };

  const desktopStyle = {
    backgroundImage: `url('${currentWallpaper}')`,
    backgroundSize: `${
      backgroundSize === "Full" ? "100% 100%" : backgroundSize
    }`,
  };

  return (
    <div
      className="h-screen w-full"
      id="desktop"
      onContextMenu={handleContextMenu}
      style={desktopStyle}
    >
      <DesktopIconList />
      {activeWindows.map((activeWindow) => {
        const windowData = APPS.find((app) => app.id === activeWindow.id);
        if (!windowData) return null;
        return (
          <Window
            key={activeWindow.id}
            id={activeWindow.id}
            x={activeWindow.x}
            y={activeWindow.y}
            windowName={windowData.windowName}
            children={windowData.component}
          />
        );
      })}
      <DesktopContextMenu />
      <Panel />
    </div>
  );
}

export default Desktop;
