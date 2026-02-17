import { useWindowsStore } from "../../store/windowsStore";
import type { App } from "../../types";

interface PanelTaskItemProps {
  activeWindow: App;
}

function PanelTaskItem({ activeWindow }: PanelTaskItemProps) {
  const toggleMinimize = useWindowsStore((state) => state.toggleMinimize);

  return (
    <button
      key={activeWindow.id}
      className="flex flex-row gap-2 items-center cursor-pointer"
      onClick={() => toggleMinimize(activeWindow.id)}
      aria-label={`Toggle ${activeWindow.windowName}`}
    >
      <img
        src={activeWindow.iconSrc}
        alt={activeWindow.windowName}
        className="h-4 w-4 self-center"
      />
      <p className="text-gray-200 text-sm">{activeWindow.windowName}</p>
    </button>
  );
}

export default PanelTaskItem;
