import { useEffect, useRef } from "react";
import { useContextMenuStore } from "../../store/contextMenuStore";
import ContextMenuItem from "../ContextMenuItem";

function ContextMenu() {
  const isOpen = useContextMenuStore((state) => state.isOpen);
  const setIsOpen = useContextMenuStore((state) => state.setIsOpen);
  const x = useContextMenuStore((state) => state.x);
  const y = useContextMenuStore((state) => state.y);
  const menuRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <ul
      className="absolute w-xs flex flex-col gap-2 bg-neutral-100 rounded-sm p-2"
      style={{ top: `${y}px`, left: `${x}px` }}
      role="menu"
      aria-hidden={!isOpen}
      ref={menuRef}
    >
      <ContextMenuItem
        label="Refresh"
        onClick={() => window.location.reload()}
      />
    </ul>
  );
}

export default ContextMenu;
