import { useWindowsStore } from "../../store/windowsStore";
import { APPS } from "../../apps";
import PanelTaskItem from "../PanelTaskItem";

function PanelTaskList() {
  const activeWindows = useWindowsStore((state) => state.activeWindows)
    .map((activeWindow) => APPS.find((app) => app.id === activeWindow.id))
    .filter((app) => app !== undefined);

  return (
    <div className="flex flex-row gap-4">
      {activeWindows.map((activeWindow) => (
        <PanelTaskItem activeWindow={activeWindow} key={activeWindow.id} />
      ))}
    </div>
  );
}

export default PanelTaskList;
