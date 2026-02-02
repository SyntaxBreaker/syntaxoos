import { useWindowsStore } from "../../store/windowsStore";
import { APPS } from "../../apps";

function PanelTaskList() {
  const activeWindows = useWindowsStore((state) => state.activeWindows)
    .map((activeWindow) => APPS.find((app) => app.id === activeWindow.id))
    .filter((app) => app !== undefined);
  const toggleMinimize = useWindowsStore((state) => state.toggleMinimize);

  return (
    <div className="flex flex-row gap-4">
      {activeWindows.map((activeWindow) => (
        <div
          key={activeWindow.id}
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={() => toggleMinimize(activeWindow.id)}
        >
          <img
            src={activeWindow.iconSrc}
            alt={activeWindow.windowName}
            className="h-4 w-4 self-center"
          />
          <p className="text-white text-sm">{activeWindow.windowName}</p>
        </div>
      ))}
    </div>
  );
}

export default PanelTaskList;
