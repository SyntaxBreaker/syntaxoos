import { WINDOW_ID } from "../../apps";
import { useContextMenuStore } from "../../store/contextMenuStore";
import { useWindowsStore } from "../../store/windowsStore";
import ContextMenu from "../ContextMenu";
import ContextMenuItem from "../ContextMenuItem";

function DesktopContextMenu() {
  const activeId = useContextMenuStore((state) => state.activeId);
  const x = useContextMenuStore((state) => state.x);
  const y = useContextMenuStore((state) => state.y);
  const closeContextMenu = useContextMenuStore(
    (state) => state.closeContextMenu
  );
  const openWindow = useWindowsStore((state) => state.openWindow);
  const isOpen = activeId === "desktop";

  return (
    <ContextMenu
      isOpen={isOpen}
      position={{ x: x, y: y }}
      onClose={() => closeContextMenu()}
    >
      <ContextMenuItem
        label="Refresh"
        onClick={() => window.location.reload()}
      />
      <ContextMenuItem
        label="Settings"
        onClick={() => openWindow(WINDOW_ID.SETTINGS)}
      />
      <ContextMenuItem
        label="System Monitor"
        onClick={() => openWindow(WINDOW_ID.SYSTEM_MONITOR)}
      />
    </ContextMenu>
  );
}

export default DesktopContextMenu;
