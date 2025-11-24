import { type MouseEvent } from "react";
import Panel from "../Panel";
import { useContextMenuStore } from "../../store/contextMenuStore";
import DesktopIconList from "../DesktopIconList";
import Window from "../Window";
import { useWindowsStore } from "../../store/windowsStore";
import Terminal from "../Terminal";
import FileManager from "../FileManager";
import DesktopContextMenu from "../DesktopContextMenu";

const WINDOWS = [
  {
    id: 0,
    name: "File Manager",
    component: <FileManager />,
  },
  {
    id: 1,
    name: "Terminal",
    component: <Terminal />,
  },
];

function Desktop() {
  const openContextMenu = useContextMenuStore((state) => state.openContextMenu);
  const activeWindows = useWindowsStore((state) => state.activeWindows);

  const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    openContextMenu("desktop", event.pageX, event.pageY);
  };

  return (
    <div
      className="h-screen w-full"
      id="desktop"
      onContextMenu={handleContextMenu}
    >
      <DesktopIconList />
      {activeWindows.map((activeWindow) => {
        const windowData = WINDOWS.find(
          (window) => window.id === activeWindow.id
        );
        if (!windowData) return null;
        return (
          <Window
            key={activeWindow.id}
            id={activeWindow.id}
            x={activeWindow.x}
            y={activeWindow.y}
            name={windowData.name}
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
