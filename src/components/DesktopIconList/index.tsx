import DesktopIcon from "../DesktopIcon";
import { useWindowsStore } from "../../store/windowsStore";
import { APPS } from "../../apps";

function DesktopIconList() {
  const openWindow = useWindowsStore((state) => state.openWindow);

  const handleIconClick = (id: number) => {
    openWindow(id);
  };

  return (
    <ul className="flex flex-col flex-wrap content-start gap-4 h-[calc(100%-36px)] w-full p-4">
      {APPS.filter((app) => app.showOnDesktop).map((app) => (
        <li key={app.id}>
          <DesktopIcon
            name={app.windowName}
            iconSrc={app.iconSrc}
            onClick={() => handleIconClick(app.id)}
          />
        </li>
      ))}
    </ul>
  );
}

export default DesktopIconList;
