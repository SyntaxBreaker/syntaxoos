import { useWindowsStore } from "../../store/windowsStore";
import { APPS } from "../../apps";
import PanelTaskItem from "../PanelTaskItem";

function PanelTaskList() {
  const activeWindows = useWindowsStore((state) => state.activeWindows)
    .map((activeWindow) => APPS.find((app) => app.id === activeWindow.id))
    .filter((app) => app !== undefined);

  return (
    <ul className="flex flex-row gap-4">
      {activeWindows.map((activeWindow) => (
        <li key={activeWindow.id}>
          <PanelTaskItem activeWindow={activeWindow} />
        </li>
      ))}
    </ul>
  );
}

export default PanelTaskList;
