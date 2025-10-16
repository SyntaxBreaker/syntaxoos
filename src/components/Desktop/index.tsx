import type { MouseEvent } from "react";
import Panel from "../Panel";
import { useContextMenuStore } from "../../store/contextMenuStore";
import ContextMenu from "../ContextMenu";
import DesktopIconList from "../DesktopIconList";

function Desktop() {
  const setIsOpen = useContextMenuStore((state) => state.setIsOpen);
  const setPosition = useContextMenuStore((state) => state.setPosition);

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
      <ContextMenu />
      <Panel />
    </div>
  );
}

export default Desktop;
