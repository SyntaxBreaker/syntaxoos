import { useContextMenuStore } from "../../store/contextMenuStore";
import ContextMenuItem from "../ContextMenuItem";

function ContextMenu() {
  const isOpen = useContextMenuStore((state) => state.isOpen);
  const x = useContextMenuStore((state) => state.x);
  const y = useContextMenuStore((state) => state.y);

  if (!isOpen) {
    return null;
  }

  return (
    <ul
      className="absolute w-xs flex flex-col gap-2 bg-neutral-100 rounded-sm p-2"
      style={{ top: `${y}px`, left: `${x}px` }}
      role="menu"
      aria-hidden={!isOpen}
    >
      <ContextMenuItem
        label="Refresh"
        onClick={() => window.location.reload()}
      />
    </ul>
  );
}

export default ContextMenu;
