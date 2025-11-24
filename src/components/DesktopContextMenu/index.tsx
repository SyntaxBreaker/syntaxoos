import { useContextMenuStore } from "../../store/contextMenuStore";
import ContextMenu from "../ContextMenu";
import ContextMenuItem from "../ContextMenuItem";

function DesktopContextMenu() {
  const activeId = useContextMenuStore((state) => state.activeId);
  const x = useContextMenuStore((state) => state.x);
  const y = useContextMenuStore((state) => state.y);
  const closeContextMenu = useContextMenuStore((state) => state.closeContextMenu);
  const isOpen = activeId === "desktop"

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
    </ContextMenu>
  );
}

export default DesktopContextMenu;
