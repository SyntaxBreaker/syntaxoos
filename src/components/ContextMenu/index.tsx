import { useEffect, useRef } from "react";

interface ContextMenuProps {
  isOpen: boolean;
  position: {
    x: number;
    y: number;
  };
  onClose: () => void;
  children: React.ReactNode;
}

function ContextMenu({
  isOpen,
  position,
  onClose,
  children,
}: ContextMenuProps) {
  const menuRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <ul
      className="absolute w-xs flex flex-col gap-2 bg-neutral-100 rounded-sm p-2"
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
      role="menu"
      aria-hidden={!isOpen}
      ref={menuRef}
    >
      {children}
    </ul>
  );
}

export default ContextMenu;
