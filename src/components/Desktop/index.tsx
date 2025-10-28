import { type MouseEvent } from "react";
import Panel from "../Panel";
import { useContextMenuStore } from "../../store/contextMenuStore";
import ContextMenu from "../ContextMenu";
import DesktopIconList from "../DesktopIconList";
import Window from "../Window";
import { useWindowsStore } from "../../store/windowsStore";
import Terminal from "../Terminal";

const WINDOWS = [
  {
    id: 1,
    name: "Terminal",
    component: <Terminal />,
  },
];

function Desktop() {
  const setIsOpen = useContextMenuStore((state) => state.setIsOpen);
  const setPosition = useContextMenuStore((state) => state.setPosition);
  const activeWindows = useWindowsStore((state) => state.activeWindows);

  const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setPosition(event.pageX, event.pageY);
    setIsOpen(true);
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
            x={activeWindow.x}
            y={activeWindow.y}
            name={windowData.name}
            children={windowData.component}
          />
        );
      })}
      <ContextMenu />
      <Panel />
    </div>
  );
}

export default Desktop;
