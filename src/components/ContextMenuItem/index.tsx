import { useContextMenuStore } from "../../store/contextMenuStore";

interface ContextMenuItemProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

function ContextMenuItem({ label, onClick, disabled }: ContextMenuItemProps) {
  const setIsOpen = useContextMenuStore((state) => state.setIsOpen);

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    if (disabled) return;
    onClick();
    setIsOpen(false);
  };

  return (
    <li
      role="menuitem"
      onClick={handleClick}
      aria-disabled={disabled || undefined}
      className={`cursor-pointer p-2 hover:bg-neutral-200 rounded-sm ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {label}
    </li>
  );
}

export default ContextMenuItem;
