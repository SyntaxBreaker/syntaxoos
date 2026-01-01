import menuIcon from "../../assets/icons/menu.svg";
import { useWindowsStore } from "../../store/windowsStore";
import Clock from "../Clock";
import { APPS } from "../../apps";

function Panel() {
  const activeWindows = useWindowsStore((state) => state.activeWindows)
    .map((activeWindow) => APPS.find((app) => app.id === activeWindow.id))
    .filter((app) => app !== undefined);
  const toggleMinimize = useWindowsStore((state) => state.toggleMinimize);

  return (
    <div className="fixed bottom-0 p-2 bg-panel w-full flex flex-row justify-between">
      <div className="flex flex-row gap-4">
        <button className="p-0 hover:cursor-pointer" aria-label="Open menu">
          <img src={menuIcon} alt="menu icon" />
        </button>
        <div className="flex flex-row gap-4">
          {activeWindows.map((activeWindow) => (
            <div
              key={activeWindow.id}
              className="flex flex-row gap-2 items-center cursor-pointer"
              onClick={() => toggleMinimize(activeWindow.id)}
            >
              <img
                src={activeWindow.iconSrc}
                alt={activeWindow.name}
                className="h-4 w-4 self-center"
              />
              <p className="text-white text-sm">{activeWindow.name}</p>
            </div>
          ))}
        </div>
      </div>
      <Clock />
    </div>
  );
}

export default Panel;
