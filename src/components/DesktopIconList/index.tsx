import DesktopIcon from "../DesktopIcon";
import folderIcon from "../../assets/folder.svg";
import terminalIcon from "../../assets/terminal.svg";
import { useWindowsStore } from "../../store/windowsStore";

interface DesktopIconItem {
  id: number;
  name: string;
  iconSrc: string;
}

const DESKTOP_ICONS: DesktopIconItem[] = [
  {
    id: 0,
    name: "File manager",
    iconSrc: folderIcon,
  },
  {
    id: 1,
    name: "Terminal",
    iconSrc: terminalIcon,
  },
];

function DesktopIconList() {
  const openWindow = useWindowsStore((state) => state.openWindow);

  const handleIconClick = (id: number) => {
    openWindow(id);
  };

  return (
    <div className="flex flex-col gap-4 h-[calc(100%-36px)] w-full p-4">
      {DESKTOP_ICONS.map((desktopIcon) => (
        <DesktopIcon
          key={desktopIcon.id}
          name={desktopIcon.name}
          iconSrc={desktopIcon.iconSrc}
          onClick={() => handleIconClick(desktopIcon.id)}
        />
      ))}
    </div>
  );
}

export default DesktopIconList;
