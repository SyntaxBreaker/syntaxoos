import { type MouseEvent } from "react";
import Panel from "../Panel";
import { useContextMenuStore } from "../../store/contextMenuStore";
import DesktopIconList from "../DesktopIconList";
import Window from "../Window";
import { useWindowsStore } from "../../store/windowsStore";
import Terminal from "../Terminal";
import FileManager from "../FileManager";
import DesktopContextMenu from "../DesktopContextMenu";
import ImageViewer from "../ImageViewer";
import TextReader from "../TextReader";
import { WINDOW_ID } from "../../constants";

const WINDOWS = [
  {
    id: WINDOW_ID.FILE_MANAGER,
    name: "File Manager",
    component: <FileManager />,
  },
  {
    id: WINDOW_ID.TERMINAL,
    name: "Terminal",
    component: <Terminal />,
  },
  {
    id: WINDOW_ID.IMAGE_VIEWER,
    name: "Image Preview",
    component: <ImageViewer />,
  },
  {
    id: WINDOW_ID.TEXT_READER,
    name: "Text Reader",
    component: <TextReader />,
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
